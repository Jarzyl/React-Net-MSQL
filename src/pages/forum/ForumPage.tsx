import React, { useEffect, useState } from "react";
import ForumHabits from "./ForumHabits";
import { getMainHabits } from "../../services/mainHabitsService";

function ForumPage() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getMainHabits(); // Wywołanie funkcji
        setHabits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  return (
    <>
      <ForumHabits habits={habits} />
    </>
  );
}

export default ForumPage;

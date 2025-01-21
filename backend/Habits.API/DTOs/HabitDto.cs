using System;

namespace Habits.API.DTOs
{
    public class HabitDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

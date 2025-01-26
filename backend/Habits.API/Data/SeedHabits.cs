using Habits.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Habits.Api.Data
{
    public static class SeedHabits
    {
        public static async Task SeedHabitsAsync(DbContext context)
        {
            // Nie sprawdzamy, czy już istnieją nawyki
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "HabitsSeedData.json");
            if (!File.Exists(filePath))
                throw new FileNotFoundException($"Plik {filePath} nie został znaleziony.");

            var jsonData = await File.ReadAllTextAsync(filePath);
            var baseHabits = JsonConvert.DeserializeObject<List<Habit>>(jsonData);

            if (baseHabits != null)
            {
                var habits = Enumerable.Range(1, 100).Select(i =>
                {
                    var habitTemplate = baseHabits[i % baseHabits.Count];
                    return new Habit
                    {
                        Name = $"{habitTemplate.Name} #{i}",
                        Completed = habitTemplate.Completed,
                        CreatedAt = habitTemplate.CreatedAt.AddDays(-i),
                        UserId = (i % 3) + 2 // Przypisanie do użytkownika 2, 3 lub 4
                    };
                }).ToList();

                // Dodajemy wszystkie rekordy bez sprawdzania duplikatów
                context.AddRange(habits);
                await context.SaveChangesAsync();
            }
        }
    }
}

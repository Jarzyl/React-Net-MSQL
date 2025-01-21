using Habits.API.Entities;
using System;

namespace Habits.Api.Entities
{
    public class Habit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }  // Klucz obcy do AppUser
        public AppUser User { get; set; }
    }
}

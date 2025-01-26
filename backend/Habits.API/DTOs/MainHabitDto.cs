using System;

namespace Habits.Api.DTOs
{
    public class MainHabitDto
    {
        public string Name { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserName { get; set; }
    }
}

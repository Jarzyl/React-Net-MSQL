using AutoMapper;
using Habits.Api.Entities;
using Habits.Api.Interfaces;
using Habits.API.Data;
using Habits.API.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Habits.Api.Data
{
    public class UserHabitsRepository : IUserHabitsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserHabitsRepository(DataContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }

        // Pobranie listy nawyków dla użytkownika
        public async Task<IEnumerable<HabitDto>> GetHabitsAsync(int userId)
        {
            var habits = await _context.Habits
                .Where(h => h.UserId == userId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<HabitDto>>(habits);
        }

        // Pobranie stworzonego nawyku dla użytkownika
        public async Task<HabitDto> GetHabitByUserIdAsync(int userId, string habitName)
        {
            var habit = await _context.Habits
             .Where(h => h.UserId == userId && h.Name == habitName)
             .FirstOrDefaultAsync();

            // Mapowanie na HabitDto
            return _mapper.Map<HabitDto>(habit);
        }

        // Tworzenie nowego nawyku dla użytkownika
        public async Task<bool> CreateHabitAsync(int userId, CreateHabitDto createHabitDto)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists) return false;

            var habit = new Habit
            {
                Name = createHabitDto.Name,
                UserId = userId
            };

            _context.Habits.Add(habit);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }

        // Usunięcie nawyku
        public async Task<bool> DeleteHabitAsync(int id)
        {
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null) return false;

            _context.Habits.Remove(habit);
            var changes = await _context.SaveChangesAsync();

            return changes > 0;
        }
    }
}

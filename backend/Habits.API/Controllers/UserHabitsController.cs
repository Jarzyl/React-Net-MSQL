using Microsoft.AspNetCore.Mvc;
using Habits.API.Data;
using Habits.API.DTOs;
using Microsoft.EntityFrameworkCore;
using Habits.Api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Habits.Api.Interfaces;
using AutoMapper;

namespace Habits.API.Controllers
{
    public class UserHabitsController : BaseApiController
    {
        private readonly IUserHabitsRepository _habitRepository;
        private readonly IMapper _mapper;

        public UserHabitsController(IUserHabitsRepository habitRepository, IMapper mapper)
        {
            _habitRepository = habitRepository;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<HabitDto>>> GetHabits(int userId)
        {
            var habits = await _habitRepository.GetHabitsAsync(userId);

            // Mapowanie encji Habit na HabitDto
            var habitDtos = _mapper.Map<IEnumerable<HabitDto>>(habits);

            return Ok(habitDtos);
        }

        [HttpPost("{userId}")]
        public async Task<ActionResult> CreateHabit(int userId, CreateHabitDto createHabitDto)
        {
            var result = await _habitRepository.CreateHabitAsync(userId, createHabitDto);
            if (!result) return NotFound("User not found");

            // Po stworzeniu nowego nawyku, pobieramy całą listę nawyków
            var habit = await _habitRepository.GetHabitByUserIdAsync(userId, createHabitDto.Name);

            // Mapowanie obiektu Habit na HabitDto
            var habitDto = _mapper.Map<HabitDto>(habit);

            // Zwracamy tylko stworzony habit
            return Ok(habitDto);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHabit(int id)
        {
            var result = await _habitRepository.DeleteHabitAsync(id);
            if (!result) return NotFound("Habit not found.");

            return NoContent();
        }
    }
}

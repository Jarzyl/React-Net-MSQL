using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Habits.Api.Interfaces;
using AutoMapper;
using Habits.Api.DTOs;

namespace Habits.API.Controllers
{
    public class MainHabitsController : BaseApiController
    {
        private readonly IMainHabitsRepository _habitRepository;
        private readonly IMapper _mapper;

        public MainHabitsController(IMainHabitsRepository habitRepository, IMapper mapper)
        {
            _habitRepository = habitRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainHabitDto>>> GetAllHabits()
        {
            var habits = await _habitRepository.GetAllHabitsAsync();

            return Ok(habits);
        }
    }
}

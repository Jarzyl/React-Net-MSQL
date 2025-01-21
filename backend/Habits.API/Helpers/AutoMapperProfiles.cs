﻿using AutoMapper;
using Habits.Api.Entities;
using Habits.API.DTOs;
using Habits.API.Entities;
using Habits.API.Extensions;

namespace Habits.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            // Mapowanie Habit na HabitDto
            CreateMap<Habit, HabitDto>();
            // Mapowanie CreateHabitDto na Habit
            CreateMap<CreateHabitDto, Habit>();
        }
    }
}

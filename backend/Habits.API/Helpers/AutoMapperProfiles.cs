using AutoMapper;
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
        }
    }
}

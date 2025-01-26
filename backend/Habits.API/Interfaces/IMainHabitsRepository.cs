using Habits.Api.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Habits.Api.Interfaces
{
    public interface IMainHabitsRepository
    {
        Task<IEnumerable<MainHabitDto>> GetAllHabitsAsync();
    }
}

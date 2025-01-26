using Habits.API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Habits.Api.Interfaces
{
    /// <summary>
    /// Interface for managing habit-related data operations.
    /// </summary>
    public interface IUserHabitsRepository
    {
        /// <summary>
        /// Retrieves a list of habits for a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user whose habits to retrieve.</param>
        /// <returns>A collection of HabitDto objects.</returns>
        Task<IEnumerable<HabitDto>> GetHabitsAsync(int userId);

        Task<HabitDto> GetHabitByUserIdAsync(int userId, string habitName);

        /// <summary>
        /// Creates a new habit for a user.
        /// </summary>
        /// <param name="userId">The ID of the user for whom the habit is created.</param>
        /// <param name="createHabitDto">The details of the habit to create.</param>
        /// <returns>True if the habit was created successfully; otherwise, false.</returns>
        Task<bool> CreateHabitAsync(int userId, CreateHabitDto createHabitDto);

        /// <summary>
        /// Deletes a habit by its ID.
        /// </summary>
        /// <param name="id">The ID of the habit to delete.</param>
        /// <returns>True if the habit was deleted successfully; otherwise, false.</returns>
        Task<bool> DeleteHabitAsync(int id);
    }
}

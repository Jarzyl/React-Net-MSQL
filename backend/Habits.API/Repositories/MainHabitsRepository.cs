using AutoMapper;
using Habits.Api.DTOs;
using Habits.Api.Interfaces;
using Habits.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace Habits.Api.Data
{
    public class MainHabitsRepository : IMainHabitsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly ILogger<MainHabitsRepository> _logger;

        public MainHabitsRepository(DataContext context, IMapper mapper, IDistributedCache cache, ILogger<MainHabitsRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _cache = cache;
            _logger = logger;
        }

        // Pobranie listy nawyków dla użytkownika z obsługą Redis
        public async Task<IEnumerable<MainHabitDto>> GetAllHabitsAsync()
        {
            const string cacheKey = "GetAllHabits";

            // Sprawdzamy, czy dane są w Redis
            var cachedData = await _cache.GetStringAsync(cacheKey);

            if (!string.IsNullOrEmpty(cachedData))
            {
                // Dane znalezione w Redis, deserializacja i zwrócenie
                _logger.LogInformation("Dane pobrane z Redisa.");
                return JsonSerializer.Deserialize<IEnumerable<MainHabitDto>>(cachedData);
            }

            // Dane nie znalezione w Redis, pobranie z bazy danych
            _logger.LogInformation("Dane nie znalezione w Redis, pobieranie z bazy danych.");
            var habits = await _context.Habits
                .Include(h => h.User) // Załadowanie encji User
                .ToListAsync();

            var habitDtos = _mapper.Map<IEnumerable<MainHabitDto>>(habits);

            // Serializacja i zapisanie danych do Redis
            _logger.LogInformation("Zapis danych do Redisa.");
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5) // Czas życia w cache
            };
            var serializedData = JsonSerializer.Serialize(habitDtos);
            await _cache.SetStringAsync(cacheKey, serializedData, options);

            return habitDtos;
        }
    }
}

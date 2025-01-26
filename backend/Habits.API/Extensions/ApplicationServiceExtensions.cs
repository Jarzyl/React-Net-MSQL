using Habits.Api.Data;
using Habits.Api.Interfaces;
using Habits.API.Data;
using Habits.API.Interfaces;
using Habits.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Habits.API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) 
    {
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserHabitsRepository, UserHabitsRepository>();
        services.AddScoped<IMainHabitsRepository, MainHabitsRepository>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Redis
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = config.GetValue<string>("Redis:ConnectionString"); // np. localhost:6379
            options.InstanceName = "HabitsCache"; // Prefiks dla kluczy w Redis
        });

        return services;
    }
}

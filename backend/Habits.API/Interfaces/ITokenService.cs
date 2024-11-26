using Habits.API.Entities;

namespace Habits.API.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}

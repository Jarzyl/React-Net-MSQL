using System;

namespace Habits.API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string LastName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string City { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        public byte[] ProfileImage { get; set; }
        public string PhoneNumber { get; set; }
        public string PostalCode { get; set; }
    }
}

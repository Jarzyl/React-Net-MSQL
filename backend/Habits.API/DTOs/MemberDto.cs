using System.Collections.Generic;
using System;

namespace Habits.API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public byte[] ProfileImage { get; set; }
        public string PhoneNumber { get; set; }
        public string PostalCode { get; set; }
        public string Email { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthorizationApi.Models
{
    public class LoginRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
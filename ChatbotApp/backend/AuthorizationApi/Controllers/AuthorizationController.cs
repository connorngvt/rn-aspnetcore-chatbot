using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AuthorizationApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AuthorizationApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly ILogger<AuthorizationController> _logger;
        private const string _username = "connorng";
        private const string _password = "123456";

        public AuthorizationController(ILogger<AuthorizationController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == _username && request.Password == _password)
            {
                return Ok(new { message = "Login successful, please complete 2FA"});
            }
            return Unauthorized(new {message = "Invalid username or password" });
        }
    }
}
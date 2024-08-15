using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthorizationApi.Models
{
    public class TwoFactorRequest
    {
        public required string Code { get; set; }
    }
}
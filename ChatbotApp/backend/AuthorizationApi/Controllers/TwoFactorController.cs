using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QRCoder;
using OtpNet;
using AuthorizationApi.Models;

namespace AuthorizationApi.Controllers
{
    [Route("api/2fa")]
    [ApiController]
    public class TwoFactorController : ControllerBase
    {
        private readonly ILogger<TwoFactorController> _logger;
        // private const string _token = "Kmz3B86P5v2Wx8q7Y3jLs5TgX9mD4wQh";
        private const string _issuer = "AIChatBot";
        private const string _user = "connorng";
        private const string _base32String = "JBSWY3DPEHPK3PXP";

        public TwoFactorController(ILogger<TwoFactorController> logger)
        {
            _logger = logger;
        }

        [HttpGet("generate-qr")]
        public IActionResult GenerateQrCode()
        {
            var totpUri = $"otpauth://totp/{_issuer}:{_user}?secret={_base32String}&issuer={_issuer}";

            using (var qrGenerator = new QRCodeGenerator())
            {
                var qrCodeData = qrGenerator.CreateQrCode(totpUri, QRCodeGenerator.ECCLevel.Q);
                var qrCode = new BitmapByteQRCode(qrCodeData);
                var qrCodeImage = qrCode.GetGraphic(20);

                var base64QrCode = Convert.ToBase64String(qrCodeImage);
                return Ok(new { _base32String, base64QrCode });
            }
        }

        [HttpPost("validate")]
        public IActionResult ValidateToken([FromBody] TwoFactorRequest request)
        {
            var totp = new Totp(Base32Encoding.ToBytes(_base32String));
            bool isValid = totp.VerifyTotp(request.Code, out long timeStepMatched, VerificationWindow.RfcSpecifiedNetworkDelay);

            if (isValid)
            {
                return Ok("Token is valid");
            }
            else
            {
                return Unauthorized("Invalid token");
            }
        }

    }
}
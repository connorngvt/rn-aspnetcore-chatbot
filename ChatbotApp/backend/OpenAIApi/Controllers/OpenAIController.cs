using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using OpenAIApi.Models;

namespace OpenAIApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OpenAIController : ControllerBase
    {
        private readonly ILogger<OpenAIController> _logger;
        private readonly IConfiguration _configuration;
        private readonly OpenAIAPI _openAI;

        public OpenAIController(IConfiguration configuration, ILogger<OpenAIController> logger)
        {
            _logger = logger;
            _configuration = configuration;
            var apiKey = _configuration.GetValue<string>("OpenAI:ApiKey");
            _openAI = new OpenAIAPI(apiKey);
        }

        [HttpGet("test")]
        public async Task<IActionResult> GetSampleAIResponse()
        {
            // Tests if the OpenAI API is functioning and returning a valid response using Chat Conversations
            try
            {
                var chat = _openAI.Chat.CreateConversation();
                chat.Model = Model.GPT4_Turbo;
                chat.RequestParameters.Temperature = 0;

                chat.AppendSystemMessage("You are a helpful assistant.");
                chat.AppendUserInput("Hello, World");
                string response = await chat.GetResponseFromChatbotAsync();

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occured while getting the test response from OpenAI.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = "An error occured while processing your request."});
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetAIResponse([FromBody] AIRequest request)
        {
            // Check if input is null or empty
            if (request == null || string.IsNullOrEmpty(request.Input))
            {
                return BadRequest("Input cannot be empty.");
            }
            
            // Sends request to OpenAI and gets results back using Chat Endpoint Requests
            var results = await _openAI.Chat.CreateChatCompletionAsync(new ChatRequest()
            {
                Model = Model.GPT4_Turbo,
                Temperature = 0.1,
                MaxTokens = 150,
                Messages = new ChatMessage[] {
                    new ChatMessage(ChatMessageRole.System, "You are a helpful assistant."),
                    new ChatMessage(ChatMessageRole.User, request.Input)
                }
            });
            
            // Retrieves the first choice out of the response options if it exists
            if (results.Choices.Any())
            {
                return Ok(results.Choices[0].Message);
            }
            else
            {
                return NotFound("No choices were returned from the AI.");
            }
        }
    }
}
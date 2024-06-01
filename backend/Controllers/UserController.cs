using backend.Models.Dto;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Models.Token;

namespace backend.Controllers
{
    /// <summary>
    /// User management controller.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="user">User registration model.</param>
        /// <returns>Action result indicating success or failure.</returns>
        /// <response code="200">Returns a message indicating the user was registered successfully.</response>
        /// <response code="400">Returns a message indicating the registration failed.</response>
        [HttpPost("register")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto user)
        {
            var result = await _userService.RegisterUserAsync(user);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        /// <summary>
        /// Authenticates a user and returns a JWT token.
        /// </summary>
        /// <param name="user">User login model.</param>
        /// <returns>Action result with JWT token if successful, or unauthorized status if failed.</returns>
        /// <response code="200">Returns the JWT token.</response>
        /// <response code="401">Returns if the login credentials are invalid.</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(TokenDto), 200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Login([FromBody] LoginUserDto user)
        {
            var token = await _userService.AuthenticateUserAsync(user.Username, user.Password);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { Token = token });
        }

        /// <summary>
        /// Gets the current user's details.
        /// </summary>
        /// <returns>Action result with user details if successful, or unauthorized status if failed.</returns>
        /// <response code="200">Returns the current user's details.</response>
        /// <response code="401">Returns if the user is not authenticated.</response>
        /// <response code="404">Returns if the user is not found.</response>
        [Authorize]
        [HttpGet("current")]
        [ProducesResponseType(typeof(GetUserDto), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}

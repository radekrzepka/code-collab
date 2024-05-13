using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("users")]
  public class UserController(UserService userService) : ControllerBase
  {
    [HttpPost("register")]
    [Authorize]
    public ActionResult<User> Post(User user)
    {
      var newUser = userService.AddUser(user);
      return newUser;
    }
  }
}

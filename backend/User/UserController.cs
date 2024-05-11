using Microsoft.AspNetCore.Mvc;
using CodeCollab.Services.UserService;
using CodeCollab.Models.UserModel;
using Microsoft.AspNetCore.Authorization;

namespace CodeCollab.Controllers.UserController
{
  [ApiController]
  [Route("users")]
  public class UserController(UserService userService) : ControllerBase
  {
    private readonly UserService _userService = userService;

    [HttpPost("register")]
    [Authorize]
    public ActionResult<User> Post(User user)
    {
      var newUser = _userService.AddUser(user);
      return newUser;
    }
  }
}

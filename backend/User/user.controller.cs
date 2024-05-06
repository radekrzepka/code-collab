using Microsoft.AspNetCore.Mvc;
using CodeCollab.Services.UserService;
using CodeCollab.Models.UserModel;

namespace CodeCollab.Controllers.UserController
{
  [ApiController]
  [Route("users")]
  public class UserController(UserService userService) : ControllerBase
  {
    private readonly UserService _userService = userService;

    [HttpGet]
    public ActionResult<IEnumerable<User>> Get()
    {
      return Ok(_userService.GetAllUsers());
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
      var user = _userService.GetUserById(id);
      if (user == null)
        return NotFound();
      return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> Post(User user)
    {
      var newUser = _userService.AddUser(user);
      return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }
  }
}

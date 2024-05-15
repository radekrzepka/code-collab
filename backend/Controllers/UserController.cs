using backend.Models;
using backend.Models.User;
using backend.Models.User.Dto;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("user")]
  public class UserController(UserService userService) : ControllerBase
  {
    [HttpPost("register")]
    public string Post(UserRegisterDto user)
    {
      userService.AddUser(user);
      return "ale wkretka";
      // return newUser;
    }
  }
}
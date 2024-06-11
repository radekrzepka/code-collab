using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Dto;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ProjectController : ControllerBase
  {
    private readonly UserService _userService;
    private readonly ProjectService _projectService;

    public ProjectController(UserService userService, ProjectService projectService)
    {
      _userService = userService;
      _projectService = projectService;
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(int id)
    {
      var project = await _projectService.GetProjectByIdAsync(id);
      if (project == null)
      {
        return NotFound("Project not found.");
      }
      return Ok(project);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
      var projects = await _projectService.GetAllProjectsAsync();
      return Ok(projects);
    }

    [Authorize]
    [HttpPost()]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto projectDto)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null)
      {
        return Unauthorized();
      }

      var user = await _userService.GetUserByIdAsync(userId);
      if (user == null)
      {
        return NotFound("User not found.");
      }

      var validationResults = await _projectService.ValidateAndCreateProjectAsync(projectDto, user.Id);
      if (!validationResults.Success)
      {
        return BadRequest(validationResults.Message);
      }

      return Ok(new { Message = "Project created successfully.", ProjectId = validationResults.ProjectId });
    }
  }
}
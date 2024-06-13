using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Dto;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectTaskController : ControllerBase
    {
        private readonly ProjectTaskService _projectTaskService;

        public ProjectTaskController(ProjectTaskService projectTaskService)
        {
            _projectTaskService = projectTaskService;
        }


        [HttpGet("{projectId}")]
        public async Task<ActionResult<List<ProjectTaskDto>>> GetProjectTasksByProjectId(int projectId)
        {
          var projectTasks = await _projectTaskService.GetProjectTasksByProjectIdAsync(projectId);
          return Ok(projectTasks);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateProjectTask([FromBody] CreateProjectTaskDto createProjectTaskDto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _projectTaskService.CreateProjectTaskAsync(createProjectTaskDto, userId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectTask(int id, [FromBody] UpdateProjectTaskDto updateProjectTaskDto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _projectTaskService.UpdateProjectTaskAsync(id, updateProjectTaskDto, userId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _projectTaskService.DeleteProjectTaskAsync(id, userId);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }
    }
}

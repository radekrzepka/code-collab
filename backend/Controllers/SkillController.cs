using backend.Models.Dto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class SkillController(SkillService skillService) : ControllerBase
  {
    /// <summary>
    /// Gets all available tech stacks.
    /// </summary>
    /// <returns>List of tech stacks.</returns>
    [HttpGet("")]
    [ProducesResponseType(typeof(List<SkillDto>), 200)]
    public async Task<IActionResult> GetAllSkills()
    {
      var techStacks = await skillService.GetAllSkillsAsync();
      return Ok(techStacks);
    }
  }
}
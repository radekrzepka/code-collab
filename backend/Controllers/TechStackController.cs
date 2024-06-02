using backend.Models.Dto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TechStackController(TechStackService techStackService) : ControllerBase
  {
    /// <summary>
    /// Gets all available tech stacks.
    /// </summary>
    /// <returns>List of tech stacks.</returns>
    [HttpGet("")]
    [ProducesResponseType(typeof(List<TechStackDto>), 200)]
    public async Task<IActionResult> GetAllTechStacks()
    {
      var techStacks = await techStackService.GetAllTechStacksAsync();
      return Ok(techStacks);
    }
  }
}
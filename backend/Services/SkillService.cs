using backend.Database;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;
namespace backend.Services
{
  public class SkillService(ApplicationDbContext context)
  {
    public async Task<List<SkillDto>> GetAllSkillsAsync()
    {
      return await context.Skills
        .Select(ts => new SkillDto
        {
          Id = ts.Id,
          Name = ts.Name
        })
        .ToListAsync();
    }

  }
}
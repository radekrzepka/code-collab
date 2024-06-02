using backend.Database;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;
namespace backend.Services
{
  public class TechStackService(ApplicationDbContext context)
  {
    public async Task<List<TechStackDto>> GetAllTechStacksAsync()
    {
      return await context.TechStacks
        .Select(ts => new TechStackDto
        {
          Id = ts.Id,
          Name = ts.Name
        })
        .ToListAsync();
    }

  }
}
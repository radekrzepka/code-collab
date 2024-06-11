using backend.Database;
using backend.Models;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProjectService(ApplicationDbContext context)
{
  public async Task<(bool Success, string Message, int ProjectId)> ValidateAndCreateProjectAsync(CreateProjectDto projectDto, string ownerId)
  {
    var skills = await context.Skills.Where(s => projectDto.Skills.Contains(s.Name)).ToListAsync();
    if (skills.Count != projectDto.Skills.Length)
    {
      return (false, "One or more skills are invalid", 0);
    }

    var techStacks = await context.TechStacks.Where(t => projectDto.TechStacks.Contains(t.Name)).ToListAsync();
    if (techStacks.Count != projectDto.TechStacks.Length)
    {
      return (false, "One or more tech stacks are invalid", 0);
    }
    
    var owner = await context.Users.FindAsync(int.Parse(ownerId));
    if (owner == null)
    {
      return (false, "Owner not found", 0);
    }

    var project = new Project
    {
      Name = projectDto.Name,
      Description = projectDto.Description,
      GithubLink = projectDto.GithubLink,
      LookingForSkills = skills,
      TechnologyStack = techStacks,
      OwnerId = int.Parse(ownerId),
      Developers = new List<User> { owner }
    };

    context.Projects.Add(project);
    await context.SaveChangesAsync();

    return (true, "Project created successfully", project.Id);
  }
  
  public async Task<GetProjectDto> GetProjectByIdAsync(int projectId)
  {
    var project = await context.Projects
      .Include(p => p.LookingForSkills)
      .Include(p => p.TechnologyStack)
      .Include(p => p.Developers).ThenInclude(user => user.Skills)
      .Include(p => p.Owner).Include(project => project.Developers).ThenInclude(user => user.TechStacks)
      .FirstOrDefaultAsync(p => p.Id == projectId);

    if (project == null)
    {
      return null;
    }

    return new GetProjectDto
    {
      Id = project.Id.ToString(),
      Name = project.Name,
      Description = project.Description,
      Skills = project.LookingForSkills.Select(s => s.Name).ToList(),
      TechnologyStack = project.TechnologyStack.Select(t => t.Name).ToList(),
      Developers = project.Developers.Select(d => new GetUserDto
      {
        Id = d.Id.ToString(),
        Name = d.Name,
        Bio = d.Bio,
        Email = d.Email,
        Skills = d.Skills.Select(s => s.Name).ToList(),
        TechStack = d.TechStacks.Select(t => t.Name).ToList(),
      }).ToList(),
      Owner = new GetUserDto
      {
        Id = project.Owner.Id.ToString(),
        Name = project.Owner.Name,
        Bio = project.Owner.Bio,
        Email = project.Owner.Email,
        Skills = project.Owner.Skills.Select(s => s.Name).ToList(),
        TechStack = project.Owner.TechStacks.Select(t => t.Name).ToList(),
      },
      GithubLink = project.GithubLink
    };
  }

  public async Task<List<GetProjectDto>> GetAllProjectsAsync()
  {
    var projects = await context.Projects
      .Include(p => p.LookingForSkills)
      .Include(p => p.TechnologyStack)
      .Include(p => p.Developers).ThenInclude(user => user.Skills)
      .Include(p => p.Owner).ThenInclude(user => user.Skills).Include(project => project.Developers)
      .ThenInclude(user => user.TechStacks).Include(project => project.Owner).ThenInclude(user => user.TechStacks)
      .ToListAsync();

    return projects.Select(project => new GetProjectDto
    {
      Id = project.Id.ToString(),
      Name = project.Name,
      Description = project.Description,
      Skills = project.LookingForSkills.Select(s => s.Name).ToList(),
      TechnologyStack = project.TechnologyStack.Select(t => t.Name).ToList(),
      Developers = project.Developers.Select(d => new GetUserDto
      {
        Id = d.Id.ToString(),
        Name = d.Name,
        Bio = d.Bio,
        Email = d.Email,
        Skills = d.Skills.Select(s => s.Name).ToList(),
        TechStack = d.TechStacks.Select(t => t.Name).ToList(),
      }).ToList(),
      Owner = new GetUserDto
      {
        Id = project.Owner.Id.ToString(),
        Name = project.Owner.Name,
        Bio = project.Owner.Bio,
        Email = project.Owner.Email,
        Skills = project.Owner.Skills.Select(s => s.Name).ToList(),
        TechStack = project.Owner.TechStacks.Select(t => t.Name).ToList(),
      },
      GithubLink = project.GithubLink
    }).ToList();
  }
}
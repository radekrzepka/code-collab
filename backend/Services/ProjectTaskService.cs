using backend.Database;
using backend.Models;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;


namespace backend.Services
{
    public class ProjectTaskService
    {
        private readonly ApplicationDbContext _context;

        public ProjectTaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectTaskDto>> GetProjectTasksByProjectIdAsync(int projectId)
        {
          return await _context.ProjectTasks
            .Include(t => t.Assignee)
            .Where(t => t.ProjectId == projectId)
            .Select(t => new ProjectTaskDto
            {
              Id = t.Id,
              Name = t.Name,
              Assignee = t.Assignee.Name,
              CreatedAt = t.CreatedAt,
              DueDate = t.DueDate,
              Status = t.Status
            })
            .ToListAsync();
        }

        public async Task<(bool Success, string Message)> CreateProjectTaskAsync(CreateProjectTaskDto createProjectTaskDto, int userId)
        {
            var project = await _context.Projects
                .Include(p => p.Developers)
                .FirstOrDefaultAsync(p => p.Id == createProjectTaskDto.ProjectId);

            if (project == null)
            {
                return (false, "Invalid project.");
            }

            if (!project.Developers.Any(d => d.Id == userId))
            {
                return (false, "You are not a member of this project.");
            }

            var assignee = await _context.Users.FindAsync(createProjectTaskDto.AssigneeId);
            if (assignee == null)
            {
                return (false, "Invalid assignee.");
            }

            var projectTask = new ProjectTask
            {
                Name = createProjectTaskDto.Name,
                AssigneeId = createProjectTaskDto.AssigneeId,
                DueDate = createProjectTaskDto.DueDate,
                Status = createProjectTaskDto.Status,
                ProjectId = createProjectTaskDto.ProjectId,
                CreatedAt = DateTime.UtcNow
            };

            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();

            return (true, "Project task created successfully.");
        }

        public async Task<(bool Success, string Message)> UpdateProjectTaskAsync(int taskId, UpdateProjectTaskDto updateProjectTaskDto, int userId)
        {
            var projectTask = await _context.ProjectTasks
                .Include(t => t.Project)
                .ThenInclude(p => p.Developers)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (projectTask == null)
            {
                return (false, "Project task not found.");
            }

            if (!projectTask.Project.Developers.Any(d => d.Id == userId))
            {
                return (false, "You are not a member of this project.");
            }

            var assignee = await _context.Users.FindAsync(updateProjectTaskDto.AssigneeId);
            if (assignee == null)
            {
                return (false, "Invalid assignee.");
            }

            projectTask.Name = updateProjectTaskDto.Name;
            projectTask.AssigneeId = updateProjectTaskDto.AssigneeId;
            projectTask.DueDate = updateProjectTaskDto.DueDate;
            projectTask.Status = updateProjectTaskDto.Status;

            await _context.SaveChangesAsync();

            return (true, "Project task updated successfully.");
        }

        public async Task<(bool Success, string Message)> DeleteProjectTaskAsync(int taskId, int userId)
        {
            var projectTask = await _context.ProjectTasks
                .Include(t => t.Project)
                .ThenInclude(p => p.Developers)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (projectTask == null)
            {
                return (false, "Project task not found.");
            }

            if (!projectTask.Project.Developers.Any(d => d.Id == userId))
            {
                return (false, "You are not a member of this project.");
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();

            return (true, "Project task deleted successfully.");
        }
    }
}

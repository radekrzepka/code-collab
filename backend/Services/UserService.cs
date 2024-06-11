using backend.Database;
using backend.Models;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class UserService(ApplicationDbContext context, TokenService tokenService)
    {
      public async Task<List<UserListDto>> GetAllUsersAsync()
        {
          return await context.Users
            .Include(u => u.Skills)
            .Include(u => u.TechStacks)
            .Select(u => new UserListDto
            {
              Id = u.Id.ToString(),
              Name = u.Name,
              Bio = u.Bio,
              Skills = u.Skills.Select(s => s.Name).ToList(),
              TechStack = u.TechStacks.Select(t => t.Name).ToList()
            })
            .ToListAsync();
        }

        public async Task<(bool Success, string Message)> RegisterUserAsync(RegisterUserDto model)
        {
            // Check if username or email already exists
            if (await context.Users.AnyAsync(u => u.Name == model.Username || u.Email == model.Email))
            {
                return (false, "Username or Email already exists");
            }

            // Validate Skills
            var skills = await context.Skills.Where(s => model.Skills.Contains(s.Name)).ToListAsync();
            if (skills.Count != model.Skills.Length)
            {
                return (false, "One or more skills are invalid");
            }

            // Validate TechStack
            var techStack = await context.TechStacks.Where(t => model.TechStack.Contains(t.Name)).ToListAsync();
            if (techStack.Count != model.TechStack.Length)
            {
                return (false, "One or more tech stack items are invalid");
            }

            // Create user
            var user = new User
            {
                Name = model.Username,
                Email = model.Email,
                Bio = model.Bio,
                Skills = skills,
                TechStacks = techStack
            };

            // Hash password (you should use a proper hashing method)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return (true, "User registered successfully");
        }

        public async Task<string> AuthenticateUserAsync(string username, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Name == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            return tokenService.GenerateToken(user.Id.ToString());
        }

        public async Task<GetUserDto> GetUserByIdAsync(string userId)
        {
          var user = await context.Users
            .Where(u => u.Id.ToString() == userId)
            .Include(u => u.Skills)
            .Include(u => u.TechStacks)
            .Include(u => u.Projects)
            .ThenInclude(p => p.LookingForSkills)
            .Include(u => u.Projects)
            .ThenInclude(p => p.TechnologyStack)
            .Include(u => u.Projects)
            .ThenInclude(p => p.Developers)
            .Include(u => u.OwnedProjects)
            .FirstOrDefaultAsync();
          
          if (user == null)
          {
            return null;
          }
          
          Console.WriteLine($"User ID: {user.Id}");
          Console.WriteLine($"Name: {user.Name}");
          Console.WriteLine($"Bio: {user.Bio}");
          Console.WriteLine($"Email: {user.Email}");
          Console.WriteLine("Skills:");
          foreach (var skill in user.Skills)
          {
            Console.WriteLine($"  - {skill.Name}");
          }
          Console.WriteLine("TechStacks:");
          foreach (var techStack in user.TechStacks)
          {
            Console.WriteLine($"  - {techStack.Name}");
          }
          Console.WriteLine("Projects:");
          foreach (var project in user.Projects)
          {
            Console.WriteLine($"  - Project ID: {project.Id}, Name: {project.Name}");
            Console.WriteLine("    LookingForSkills:");
            foreach (var skill in project.LookingForSkills)
            {
              Console.WriteLine($"      - {skill.Name}");
            }
            Console.WriteLine("    TechnologyStack:");
            foreach (var tech in project.TechnologyStack)
            {
              Console.WriteLine($"      - {tech.Name}");
            }
            Console.WriteLine("    Developers:");
            foreach (var dev in project.Developers)
            {
              Console.WriteLine($"      - {dev.Name} ({dev.Email})");
            }
            Console.WriteLine($"    Owner: {project.Owner.Name} ({project.Owner.Email})");
            Console.WriteLine($"    GithubLink: {project.GithubLink}");
          }

          return new GetUserDto
          {
            Id = user.Id.ToString(),
            Name = user.Name,
            Bio = user.Bio,
            Email = user.Email,
            Skills = user.Skills.Select(s => s.Name).ToList(),
            TechStack = user.TechStacks.Select(t => t.Name).ToList(),
            Projects = user.Projects.Select(p => new GetProjectDto
            {
              Id = p.Id.ToString(),
              Name = p.Name,
              Description = p.Description,
              Skills = p.LookingForSkills.Select(s => s.Name).ToList(),
              TechnologyStack = p.TechnologyStack.Select(t => t.Name).ToList(),
              Developers = p.Developers.Select(d => new GetUserDto
              {
                Id = d.Id.ToString(),
                Name = d.Name,
                Email = d.Email
              }).ToList(),
              Owner = new GetUserDto
              {
                Id = p.Owner.Id.ToString(),
                Name = p.Owner.Name,
                Bio = p.Owner.Bio,
                Email = p.Owner.Email
              },
              GithubLink = p.GithubLink
            }).ToList()
          };
        }
    }
}

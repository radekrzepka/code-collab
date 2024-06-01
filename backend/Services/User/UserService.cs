using backend.Database;
using backend.Models;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;

        public UserService(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<(bool Success, string Message)> RegisterUserAsync(RegisterUserDto model)
        {
            // Check if username or email already exists
            if (await _context.Users.AnyAsync(u => u.Name == model.Username || u.Email == model.Email))
            {
                return (false, "Username or Email already exists");
            }

            // Validate Skills
            var skills = await _context.Skills.Where(s => model.Skills.Contains(s.Name)).ToListAsync();
            if (skills.Count != model.Skills.Length)
            {
                return (false, "One or more skills are invalid");
            }

            // Validate TechStack
            var techStack = await _context.TechStacks.Where(t => model.TechStack.Contains(t.Name)).ToListAsync();
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

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return (true, "User registered successfully");
        }

        public async Task<string> AuthenticateUserAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            return _tokenService.GenerateToken(user.Id.ToString());
        }

        public async Task<GetUserDto> GetUserByIdAsync(string userId)
        {
            var user = await _context.Users
                .Include(u => u.Skills)
                .Include(u => u.TechStacks)
                .Include(u => u.Projects)
                .ThenInclude(project => project.LookingForSkills)
                .Include(u => u.Projects)
                .ThenInclude(project => project.TechnologyStack)
                .Include(u => u.Projects)
                .ThenInclude(project => project.Owner)
                .Include(u => u.Projects)
                .ThenInclude(project => project.Developers)
                .FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            if (user == null)
            {
                return null;
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
                    LookingForSkills = p.LookingForSkills.Select(s => s.Name).ToList(),
                    TechnologyStack = p.TechnologyStack.Select(t => t.Name).ToList(),
                    Owner = new GetUserDto
                    {
                        Id = p.Owner.Id.ToString(),
                        Name = p.Owner.Name,
                        Bio = p.Owner.Bio,
                        Email = p.Owner.Email,
                        Skills = p.Owner.Skills.Select(s => s.Name).ToList(),
                        TechStack = p.Owner.TechStacks.Select(t => t.Name).ToList()
                    },
                    Developers = p.Developers.Select(d => new GetUserDto
                    {
                        Id = d.Id.ToString(),
                        Name = d.Name,
                        Bio = d.Bio,
                        Email = d.Email,
                        Skills = d.Skills.Select(s => s.Name).ToList(),
                        TechStack = d.TechStacks.Select(t => t.Name).ToList()
                    }).ToList(),
                    GithubLink = p.GithubLink
                }).ToList()
            };
        }
    }
}

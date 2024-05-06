using CodeCollab.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace CodeCollab.Database
{
  public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
  {
    public DbSet<User> Users { get; set; }
  }
}

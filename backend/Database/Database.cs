using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
  public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
  {
    public DbSet<User> Users { get; init; }
    public DbSet<Skill> Skills { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder
        .Entity<User>()
        .HasMany(e => e.Skills)
        .WithMany(e => e.Users)
        .UsingEntity(
          "UsersSkills",
          l => l.HasOne(typeof(Skill)).WithMany().HasForeignKey("SkillsId").HasPrincipalKey(nameof(Skill.Id)),
          r => r.HasOne(typeof(User)).WithMany().HasForeignKey("UsersId").HasPrincipalKey(nameof(User.Id)),
          j => j.HasKey("SkillsId", "UsersId"));
      modelBuilder.Entity<Skill>().HasData(
        new Skill{ Id = 1, Name = "JavaScript" },
        new Skill{ Id = 2, Name = "CSS" },
        new Skill{ Id = 3, Name = "HTML" }
      );
    }
  }
}

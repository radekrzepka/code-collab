using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
      public DbSet<User> Users { get; set; }
      public DbSet<Skill> Skills { get; set; }
      public DbSet<TechStack> TechStacks { get; set; }
      public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User-Skill many-to-many relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.Skills)
                .WithMany(s => s.Users)
                .UsingEntity(j => j.ToTable("UserSkills"));

            // User-TechStack many-to-many relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.TechStacks)
                .WithMany(t => t.Users)
                .UsingEntity(j => j.ToTable("UserTechStacks"));

            // Project-Skill many-to-many relationship
            modelBuilder.Entity<Project>()
                .HasMany(p => p.LookingForSkills)
                .WithMany(s => s.Projects)
                .UsingEntity(j => j.ToTable("ProjectSkills"));

            // Project-TechStack many-to-many relationship
            modelBuilder.Entity<Project>()
              .HasMany(p => p.TechnologyStack)
              .WithMany(t => t.Projects)
              .UsingEntity(j => j.ToTable("ProjectTechStacks"));

            // Project-User many-to-many relationship
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Developers)
                .WithMany(u => u.Projects)
                .UsingEntity(j => j.ToTable("ProjectDevelopers"));

            // User-Project one-to-many relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.OwnedProjects)
                .WithOne(p => p.Owner)
                .HasForeignKey(p => p.OwnerId);

                      // Seed data for Skills
            modelBuilder.Entity<Skill>().HasData(
                new Skill { Id = 1, Name = "Front-end" },
                new Skill { Id = 2, Name = "Back-end" },
                new Skill { Id = 3, Name = "UX/UI" },
                new Skill { Id = 4, Name = "DevOps" },
                new Skill { Id = 5, Name = "AI/ML" },
                new Skill { Id = 6, Name = "Data Science" },
                new Skill { Id = 7, Name = "Mobile Development" },
                new Skill { Id = 8, Name = "Game Development" },
                new Skill { Id = 9, Name = "Desktop Development" },
                new Skill { Id = 10, Name = "Cloud Computing" },
                new Skill { Id = 11, Name = "Cybersecurity" },
                new Skill { Id = 12, Name = "Database Administration" },
                new Skill { Id = 13, Name = "Networking" },
                new Skill { Id = 14, Name = "Embedded Systems" }
            );

            // Seed data for TechStacks
            modelBuilder.Entity<TechStack>().HasData(
                new TechStack { Id = 1, Name = "JavaScript" },
                new TechStack { Id = 2, Name = "HTML" },
                new TechStack { Id = 3, Name = "CSS" },
                new TechStack { Id = 4, Name = "React" },
                new TechStack { Id = 5, Name = "Angular" },
                new TechStack { Id = 6, Name = "Vue.js" },
                new TechStack { Id = 7, Name = "Node.js" },
                new TechStack { Id = 8, Name = "Python" },
                new TechStack { Id = 9, Name = "Django" },
                new TechStack { Id = 10, Name = "Flask" },
                new TechStack { Id = 11, Name = "Java" },
                new TechStack { Id = 12, Name = "Spring Boot" },
                new TechStack { Id = 13, Name = "C#" },
                new TechStack { Id = 14, Name = ".NET" },
                new TechStack { Id = 15, Name = "C++" },
                new TechStack { Id = 16, Name = "Rust" },
                new TechStack { Id = 17, Name = "Go" },
                new TechStack { Id = 18, Name = "Swift" },
                new TechStack { Id = 19, Name = "Kotlin" },
                new TechStack { Id = 20, Name = "Ruby" },
                new TechStack { Id = 21, Name = "Rails" },
                new TechStack { Id = 22, Name = "PHP" },
                new TechStack { Id = 23, Name = "Laravel" },
                new TechStack { Id = 24, Name = "AWS" },
                new TechStack { Id = 25, Name = "Azure" },
                new TechStack { Id = 26, Name = "Google Cloud" },
                new TechStack { Id = 27, Name = "Docker" },
                new TechStack { Id = 28, Name = "Kubernetes" },
                new TechStack { Id = 29, Name = "TensorFlow" },
                new TechStack { Id = 30, Name = "PyTorch" },
                new TechStack { Id = 31, Name = "Pandas" },
                new TechStack { Id = 32, Name = "NumPy" },
                new TechStack { Id = 33, Name = "Scikit-learn" },
                new TechStack { Id = 34, Name = "Unity" },
                new TechStack { Id = 35, Name = "Unreal Engine" },
                new TechStack { Id = 36, Name = "Qt" },
                new TechStack { Id = 37, Name = "Electron" },
                new TechStack { Id = 38, Name = "Blazor" },
                new TechStack { Id = 39, Name = "Xamarin" },
                new TechStack { Id = 40, Name = "Flutter" }
            );
        }
    }
}

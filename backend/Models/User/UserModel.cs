namespace backend.Models
{
  public class User
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public ICollection<Skill> Skills { get; set; }
    public ICollection<TechStack> TechStacks { get; set; }
    public ICollection<Project> Projects { get; set; }
    public ICollection<Project> OwnedProjects { get; set; }
    
    public ICollection<Invitation> SentInvitations { get; set; } = new List<Invitation>();
    public ICollection<Invitation> ReceivedInvitations { get; set; } = new List<Invitation>();
    public ICollection<ProjectTask> ProjectTasks { get; set; } = new List<ProjectTask>();
  }
  
}

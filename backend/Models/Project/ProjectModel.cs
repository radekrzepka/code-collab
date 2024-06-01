namespace backend.Models
{
  public class Project
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<Skill> LookingForSkills { get; set; }
    public ICollection<TechStack> TechnologyStack { get; set; }
    public User Owner { get; set; }
    public int OwnerId { get; set; }
    public ICollection<User> Developers { get; set; }
    public string GithubLink { get; set; }
  }
}
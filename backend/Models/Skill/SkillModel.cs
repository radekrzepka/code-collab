namespace backend.Models
{
  public class Skill
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Project> Projects { get; set; }
  }
}

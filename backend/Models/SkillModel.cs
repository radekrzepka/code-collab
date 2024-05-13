using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
  public class Skill
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Name { get; set; }
    public List<User> Users { get; } = [];
  }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Password { get; set; }

    public List<Skill> Skills { get; } = [];
  }
}

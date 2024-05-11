using System.ComponentModel.DataAnnotations;

namespace CodeCollab.Models.SkillModel
{
  public class Skill
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
  }
}

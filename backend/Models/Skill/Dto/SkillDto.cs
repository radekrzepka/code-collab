using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class SkillDto
{
  [Required]
  public int Id { get; set; }
  [Required]
  public string Name { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace backend.Models.User.Dto;

public class UserRegisterDto
{
  [Required]
  public required string Name { get; set; }
  [Required]
  public required string Email { get; set; }
  [Required]
  public required string Password { get; set; }
  [Required]
  public required string RepeatPassword { get; set; }
  public List<int>? SkillsIds { get; set; }
}
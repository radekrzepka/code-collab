using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class UserListDto
{
  [Required]
  public string Id { get; set; }
  [Required]
  public string Name { get; set; }
  [Required]
  public string Bio { get; set; }
  [Required]
  public List<string> Skills { get; set; }
  [Required]
  public List<string> TechStack { get; set; }
}
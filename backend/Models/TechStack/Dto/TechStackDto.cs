using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class TechStackDto
{
  [Required]
  public int Id { get; set; }
  [Required]
  public string Name { get; set; }
}
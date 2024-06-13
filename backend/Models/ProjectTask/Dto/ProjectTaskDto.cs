using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class ProjectTaskDto
{
  [Required]
  public int Id { get; set; }
  [Required]
  public string Name { get; set; }
  [Required]
  public string Assignee { get; set; }
  [Required]
  public DateTime CreatedAt { get; set; }
  [Required]
  public DateTime DueDate { get; set; }
  [Required]
  public TaskStatus Status { get; set; }
}
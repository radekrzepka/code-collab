using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class CreateProjectTaskDto
{
  [Required]
  public string Name { get; set; }
  [Required]
  public int AssigneeId { get; set; }
  [Required]
  public DateTime DueDate { get; set; }
  [Required]
  public TaskStatus Status { get; set; }
  [Required]
  public int ProjectId { get; set; }
}
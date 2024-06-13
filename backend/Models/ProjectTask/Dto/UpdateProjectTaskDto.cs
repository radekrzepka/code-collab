using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class UpdateProjectTaskDto
{
  [Required]
  public string Name { get; set; }
  [Required]
  public int AssigneeId { get; set; }
  [Required]
  public DateTime DueDate { get; set; }
  [Required]
  public TaskStatus Status { get; set; }
}
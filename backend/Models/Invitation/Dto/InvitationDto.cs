using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

public class InvitationDto
{
  [Required]
  public int Id { get; set; }
  [Required]
  public int ProjectId { get; set; }
  [Required]
  public string ProjectName { get; set; }
  [Required]
  public int SenderId { get; set; }
  [Required]
  public string SenderName { get; set; }
  [Required]
  public int ReceiverId { get; set; }
  [Required]
  public string ReceiverName { get; set; }
  public string? Message { get; set; }
  [Required]
  public bool IsAccepted { get; set; }
  public DateTime? AcceptedAt { get; set; }
  [Required]
  public InvitationType Type { get; set; }
}
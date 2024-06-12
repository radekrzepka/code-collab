namespace backend.Models.Dto;

public class CreateInvitationDto
{
  public int ProjectId { get; set; }
  public int ReceiverId { get; set; } 
  public string? Message { get; set; }
  public InvitationType Type { get; set; }
}
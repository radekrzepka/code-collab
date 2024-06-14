namespace backend.Models
{
  public enum InvitationType
  {
    UserToProject,
    OwnerToUser,
  }
  public class Invitation
  {
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; }
    public int SenderId { get; set; }
    public User Sender { get; set; }
    public int ReceiverId { get; set; }
    public User Receiver { get; set; }
    public string? Message { get; set; }
    public bool IsAccepted { get; set; }
    public DateTime? AcceptedAt { get; set; }
    public bool IsDeclined { get; set; } 
    public DateTime? DeclinedAt { get; set; }
    public InvitationType Type { get; set; }
  }
}
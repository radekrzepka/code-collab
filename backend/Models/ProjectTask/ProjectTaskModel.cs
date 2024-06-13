namespace backend.Models
{
  public enum TaskStatus
  {
    TODO,
    IN_PROGRESS,
    DONE
  }
  
  public class ProjectTask
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int AssigneeId { get; set; }
    public User Assignee { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime DueDate { get; set; }
    public TaskStatus Status { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; }
  }
}
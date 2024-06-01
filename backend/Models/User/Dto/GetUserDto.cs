using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

/// <summary>
/// DTO for user details.
/// </summary>
public class GetUserDto
{
  /// <summary>
  /// Gets or sets the user ID.
  /// </summary>
  [Required]
  public string Id { get; set; }

  /// <summary>
  /// Gets or sets the username.
  /// </summary>
  [Required]
  public string Name { get; set; }

  /// <summary>
  /// Gets or sets the bio.
  /// </summary>
  [Required]
  public string Bio { get; set; }

  /// <summary>
  /// Gets or sets the email.
  /// </summary>
  [Required]
  public string Email { get; set; }

  /// <summary>
  /// Gets or sets the skills.
  /// </summary>
  [Required]
  public List<string> Skills { get; set; }

  /// <summary>
  /// Gets or sets the tech stack.
  /// </summary>
  [Required]
  public List<string> TechStack { get; set; }

  /// <summary>
  /// Gets or sets the projects.
  /// </summary>
  [Required]
  public List<GetProjectDto> Projects { get; set; }
}
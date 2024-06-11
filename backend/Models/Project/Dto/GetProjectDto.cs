using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

/// <summary>
/// DTO for project details.
/// </summary>
public class GetProjectDto
{
  /// <summary>
  /// Gets or sets the project ID.
  /// </summary>
  [Required]
  public string Id { get; set; }

  /// <summary>
  /// Gets or sets the project name.
  /// </summary>
  [Required]
  public string Name { get; set; }

  /// <summary>
  /// Gets or sets the project description.
  /// </summary>
  [Required]
  public string Description { get; set; }

  /// <summary>
  /// Gets or sets the skills required for the project.
  /// </summary>
  [Required]
  public List<string> Skills { get; set; }

  /// <summary>
  /// Gets or sets the technology stack used in the project.
  /// </summary>
  [Required]
  public List<string> TechnologyStack { get; set; }

  /// <summary>
  /// Gets or sets the owner.
  /// </summary>
  [Required]
  public GetUserDto Owner { get; set; }

  /// <summary>
  /// Gets or sets the developers working on the project.
  /// </summary>
  [Required]
  public List<GetUserDto> Developers { get; set; }

  /// <summary>
  /// Gets or sets the GitHub link for the project.
  /// </summary>
  [Required]
  public string GithubLink { get; set; }
}
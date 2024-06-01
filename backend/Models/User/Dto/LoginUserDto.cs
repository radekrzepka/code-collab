using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto;

/// <summary>
/// DTO for user login.
/// </summary>
public class LoginUserDto
{
  /// <summary>
  /// Gets or sets the username.
  /// </summary>
  [Required]
  public string Username { get; set; }

  /// <summary>
  /// Gets or sets the password.
  /// </summary>
  [Required]
  public string Password { get; set; }
}
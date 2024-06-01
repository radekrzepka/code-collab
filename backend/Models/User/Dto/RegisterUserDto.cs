using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto
{
  public class RegisterUserDto
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

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the bio.
    /// </summary>
    public string Bio { get; set; }

    /// <summary>
    /// Gets or sets the skills.
    /// </summary>
    [Required]
    public string[] Skills { get; set; }

    /// <summary>
    /// Gets or sets the tech stack.
    /// </summary>
    [Required]
    public string[] TechStack { get; set; }
  }
}
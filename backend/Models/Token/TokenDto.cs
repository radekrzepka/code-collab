using System.ComponentModel.DataAnnotations;

namespace backend.Models.Token
{
  /// <summary>
  /// DTO for token response.
  /// </summary>
  public class TokenDto
  {
    /// <summary>
    /// Gets or sets the JWT token.
    /// </summary>
    [Required]
    public string Token { get; set; }
  }
}
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Utils;

public class DefaultApiResponseDto(string message)
{
  [Required]
  public string Message { get; set; } = message;
}
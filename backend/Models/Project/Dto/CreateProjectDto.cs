using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto
{
  public class CreateProjectDto
  {
    [Required] public string Name { get; set; }

    [Required] public string Description { get; set; }

    public string GithubLink { get; set; }

    [Required] public string[] Skills { get; set; }

    [Required] public string[] TechStacks { get; set; }
  }
}
using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Dto;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class InvitationController : ControllerBase
  {
    private readonly InvitationService _invitationService;

    public InvitationController(InvitationService invitationService)
    {
      _invitationService = invitationService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> SendInvitation([FromBody] CreateInvitationDto createInvitationDto)
    {
      var senderId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
      Console.WriteLine(User.FindFirstValue(ClaimTypes.NameIdentifier));
      var result = await _invitationService.SendInvitationAsync(createInvitationDto, senderId);

      if (!result.Success)
      {
        return BadRequest(result.Message);
      }

      return Ok(result.Message);
    }

    [Authorize]
    [HttpGet("pending")]
    [ProducesResponseType(typeof(List<InvitationDto>), 200)]
    public async Task<IActionResult> GetPendingInvitations()
    {
      var ownerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
      var invitations = await _invitationService.GetPendingInvitationsAsync(ownerId);
      return Ok(invitations);
    }

    [Authorize]
    [HttpPost("accept/{invitationId}")]
    public async Task<IActionResult> AcceptInvitation(int invitationId)
    {
      var ownerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
      var result = await _invitationService.AcceptInvitationAsync(invitationId, ownerId);

      if (!result.Success)
      {
        return BadRequest(result.Message);
      }

      return Ok(result.Message);
    }
  }
}
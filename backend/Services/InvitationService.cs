using backend.Database;
using backend.Models;
using backend.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class InvitationService
    {
        private readonly ApplicationDbContext _context;

        public InvitationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string Message)> SendInvitationAsync(CreateInvitationDto createInvitationDto, int senderId)
        {
            var sender = await _context.Users.FindAsync(senderId);
            var receiver = await _context.Users.FindAsync(createInvitationDto.ReceiverId);
            var project = await _context.Projects.Include(p => p.Owner).FirstOrDefaultAsync(p => p.Id == createInvitationDto.ProjectId);
            
            if (project == null || sender == null || receiver == null)
            {
                return (false, "Invalid project or sender.");
            }
            
            if (createInvitationDto.Type == InvitationType.UserToProject && project.OwnerId != createInvitationDto.ReceiverId)
            {
              return (false, "Receiver must be the project owner for user-to-project invitations.");
            }

            if (createInvitationDto.Type == InvitationType.OwnerToUser && project.OwnerId != senderId)
            {
              return (false, "Sender must be the project owner for owner-to-user invitations.");
            }
            
            var existingInvitation = await _context.Invitations
              .FirstOrDefaultAsync(i => i.ProjectId == createInvitationDto.ProjectId &&
                                        i.SenderId == senderId &&
                                        i.ReceiverId == createInvitationDto.ReceiverId &&
                                        i.Type == createInvitationDto.Type);

            if (existingInvitation != null)
            {
              return (false, "An identical invitation already exists.");
            }

            var invitation = new Invitation
            {
                ProjectId = createInvitationDto.ProjectId,
                SenderId = senderId,
                ReceiverId = createInvitationDto.ReceiverId,
                Message = createInvitationDto.Message,
                IsAccepted = false,
                Type = createInvitationDto.Type
            };

            _context.Invitations.Add(invitation);
            await _context.SaveChangesAsync();

            return (true, "Invitation sent successfully.");
        }

        public async Task<List<InvitationDto>> GetPendingInvitationsAsync(int ownerId)
        {
            return await _context.Invitations
                .Where(i => i.ReceiverId == ownerId && !i.IsAccepted)
                .Select(i => new InvitationDto
                {
                    Id = i.Id,
                    ProjectId = i.ProjectId,
                    ProjectName = i.Project.Name,
                    SenderId = i.SenderId,
                    SenderName = i.Sender.Name,
                    ReceiverId = i.ReceiverId,
                    ReceiverName = i.Receiver.Name,
                    Message = i.Message,
                    IsAccepted = i.IsAccepted,
                    AcceptedAt = i.AcceptedAt,
                    Type = i.Type
                })
                .ToListAsync();
        }

        public async Task<(bool Success, string Message)> AcceptInvitationAsync(int invitationId, int ownerId)
        {
            var invitation = await _context.Invitations.FindAsync(invitationId);
            if (invitation == null || invitation.ReceiverId != ownerId)
            {
                return (false, "Invalid invitation or unauthorized access.");
            }

            invitation.IsAccepted = true;
            invitation.AcceptedAt = DateTime.UtcNow;

            var project = await _context.Projects.Include(p => p.Developers).FirstOrDefaultAsync(p => p.Id == invitation.ProjectId);
            var developer = await _context.Users.FindAsync(invitation.Type == InvitationType.UserToProject ? invitation.SenderId : invitation.ReceiverId);

            if (project != null && developer != null)
            {
                project.Developers.Add(developer);
            }

            await _context.SaveChangesAsync();

            return (true, "Invitation accepted successfully.");
        }
    }
}

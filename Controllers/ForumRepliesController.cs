using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;
using System.Security.Claims;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/forum-threads/{threadId}/replies")]
    public class ForumRepliesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ForumRepliesController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> AddReply(int threadId, [FromBody] AddReplyDto dto)
        {
            // 🔧 extrage userID din ClaimTypes.NameIdentifier
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var thread = await _context.ForumThreads.FindAsync(threadId);
            if (thread == null)
                return NotFound();

            var reply = new ForumReplies
            {
                ThreadID = threadId,
                UserID = userId,
                Content = dto.Content,
                DatePosted = DateTime.UtcNow
            };

            _context.ForumReplies.Add(reply);
            await _context.SaveChangesAsync();

            var username = await _context.Users
                .Where(u => u.UserID == userId)
                .Select(u => u.Username)
                .FirstOrDefaultAsync();

            return Ok(new
            {
                reply.ReplyID,
                reply.Content,
                reply.DatePosted,
                reply.UserID,
                User = new { Username = username }
            });
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{replyId}")]
        public async Task<IActionResult> DeleteReply(int threadId, int replyId)
        {
            // 🔧 extrage userID din ClaimTypes.NameIdentifier
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var reply = await _context.ForumReplies.FindAsync(replyId);
            if (reply == null || reply.ThreadID != threadId)
                return NotFound();

            if (reply.UserID != userId)
                return Forbid();

            _context.ForumReplies.Remove(reply);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

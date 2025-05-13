using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;


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

        // ✅ Adaugă un răspuns la o postare
        [HttpPost]
        public async Task<IActionResult> AddReply(int threadId, [FromBody] AddReplyDto dto)
        {
            var reply = new ForumReplies
            {
                ThreadID = threadId,
                UserID = dto.UserID, // ideal: obținut din JWT
                Content = dto.Content,
                DatePosted = DateTime.UtcNow
            };

            _context.ForumReplies.Add(reply);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                reply.ReplyID,
                reply.Content,
                reply.DatePosted,
                reply.UserID
            });

        }

        // ✅ Șterge un comentariu
        [HttpDelete("{replyId}")]
        public async Task<IActionResult> DeleteReply(int threadId, int replyId)
        {
            var reply = await _context.ForumReplies.FindAsync(replyId);
            if (reply == null || reply.ThreadID != threadId)
                return NotFound();

            // ideal: verifică dacă reply.UserID == utilizatorul logat

            _context.ForumReplies.Remove(reply);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}

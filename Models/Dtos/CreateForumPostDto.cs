namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateForumPostDto
    {
        public string Title { get; set; }
        public int CategoryID { get; set; }  // legat de ForumCategories
        public int AuthorID { get; set; }    // ideal: luat din JWT
        public string Content { get; set; }

        public string? Type { get; set; }
        public string? About { get; set; }
        public string? Device { get; set; }

        public IFormFile? Image { get; set; }
    }

}

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateForumPostDto
    {
        public string Title { get; set; }
        public int? CategoryID { get; set; }  
           
        public string Content { get; set; }

        public string? Type { get; set; }
        public string? About { get; set; }
        public string? Device { get; set; }

        public IFormFile? Image { get; set; }
    }

}

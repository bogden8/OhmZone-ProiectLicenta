// Dtos/CreateRepairGuideDto.cs
namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateRepairGuideDto
    {
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public int AuthorID { get; set; }
        public int DeviceID { get; set; }    // ← new
        public string Part { get; set; }    // ← new
        public string Content { get; set; }
    }
}

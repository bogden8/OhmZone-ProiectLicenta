namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class UpdateRepairGuideDto
    {
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public string Content { get; set; }
        public int DeviceID { get; set; } // ✅ corect pentru modelul curent
        public string Part { get; set; }
    }
}

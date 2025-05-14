namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateRepairGuideDto
    {
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public int AuthorID { get; set; }
        public int DeviceID { get; set; }    
        public string Part { get; set; }  
        public string Content { get; set; }
    }
}

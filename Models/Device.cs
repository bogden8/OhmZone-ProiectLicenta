using System.ComponentModel.DataAnnotations;


namespace OhmZone_ProiectLicenta.Models
{
    public class Device
    {
        [Key]
        public int DeviceID { get; set; }
        public string Model { get; set; }
        public int BrandID { get; set; }
        public string Slug { get; set; }
        public string? ImageUrl { get; set; }

        public Brand Brand { get; set; }
        public List<RepairGuide> RepairGuides { get; set; }
    }


}

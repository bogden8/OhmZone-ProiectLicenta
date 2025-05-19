using System.ComponentModel.DataAnnotations;


namespace OhmZone_ProiectLicenta.Models
{
    public class Device
    {
        [Key]
        public int DeviceID { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Category { get; set; }
        public ICollection<RepairGuide> RepairGuides { get; set; }
    }

}

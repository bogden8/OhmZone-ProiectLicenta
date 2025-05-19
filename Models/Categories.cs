using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class Categories
    {
        [Key]
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

        public List<RepairGuide> RepairGuides { get; set; }
    }
}

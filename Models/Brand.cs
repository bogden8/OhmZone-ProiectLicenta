using System.ComponentModel.DataAnnotations;
namespace OhmZone_ProiectLicenta.Models
{
    public class Brand
    {
        [Key]
        public int BrandID { get; set; }
        public string Name {  get; set; }
        public int SubcategoryID { get; set; }
        public string Slug { get; set; }
        public Subcategory Subcategory { get; set; }
        public List<Device> Devices { get; set; }
    }
}

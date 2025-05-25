using System.ComponentModel.DataAnnotations;
namespace OhmZone_ProiectLicenta.Models
{
    public class Subcategory
    {
        [Key]
        public int SubcategoryID { get; set; }
        public string Name { get; set; }
        public int CategoryID { get; set; }
        public string Slug { get; set; }
        public Category Category { get; set; }
        public List<Brand> Brands { get; set; }

    }
}

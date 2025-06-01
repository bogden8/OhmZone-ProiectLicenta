using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class FavoriteGuide
    {
        [Key]
        public int FavoriteID { get; set; }

        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public Users User { get; set; }

        public int GuideID { get; set; }
        [ForeignKey("GuideID")]
        public RepairGuide Guide { get; set; }

        public DateTime DateSaved { get; set; }  // 🔥 ADĂUGĂ ASTA
    }


}

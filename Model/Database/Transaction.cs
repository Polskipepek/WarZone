using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Database {
    public class Transaction : ModelBase {
        // pojedyncza transakcja - laczy customera z servicem i z rachunkiem
        public int CustomerId { get; set; }
        public int ServiceId { get; set; }
        public int ReceiptId { get; set; }


        [ForeignKey (nameof (CustomerId))]
        public virtual Customer Customer { get; set; }

        [ForeignKey (nameof (ServiceId))]
        public virtual Service Service { get; set; }

        [ForeignKey (nameof (ReceiptId))]
        public virtual Receipt Receipt { get; set; }

    }
}

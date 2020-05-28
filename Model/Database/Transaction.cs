using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Database {
    public class Transaction : ModelBase {
        public int ServiceId { get; set; }
        public int ReceiptId { get; set; }

        [ForeignKey (nameof (ServiceId))]
        public virtual Service Service { get; set; }

        [ForeignKey (nameof (ReceiptId))]
        public virtual Receipt Receipt { get; set; }
    }
}

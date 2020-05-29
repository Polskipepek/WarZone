using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Database {
    public class ReceiptAndCustomerBinder : ModelBase {
        public int CustomerId;
        public int ReceiptId;

        [ForeignKey (nameof (CustomerId))]
        public virtual Customer Customer { get; set; }

        [ForeignKey (nameof (ReceiptId))]
        public virtual Receipt Receipt { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.Database {
    public class Transaction : ModelBase {
        // pojedyncza transakcja - laczy customera z servicem i z rachunkiem
        public int CustomerId { get; set; }
        public int ServiceId { get; set; }
        public int ReceiptId { get; set; }


        [ForeignKey(nameof(CustomerId))]
        public Customer Customer { get; set; }

        [ForeignKey(nameof(ServiceId))]
        public Service Service { get; set; }

        [ForeignKey(nameof(ReceiptId))]
        public Receipt Receipt { get; set; }

    }
}

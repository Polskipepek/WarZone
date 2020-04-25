using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;


namespace Model.Database {
    public class Receipt : ModelBase {
        public DateTime CreationDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime? CloseDate { get; set; }

        [NotMapped]
        public decimal TotalPrice { get; set; }
        public void GetTotalPrice (Context context) {
            TotalPrice = context.Transactions.Where (e => e.Receipt == this).Sum (e => e.Service.ServicePrice);
        }

        public int CustomerId { get; set; }

        [ForeignKey (nameof (CustomerId))]
        virtual public Customer Customer { get; set; }
    }
}

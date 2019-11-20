using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.Database {
    public class Receipt : ModelBase {
        public DateTime CreationDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime? CloseDate { get; set; }

        public int CustomerId { get; set; }

        [ForeignKey(nameof(CustomerId))]
        virtual public Customer Customer { get; set; }
    }
}

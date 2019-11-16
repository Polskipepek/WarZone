using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Database {
    public class Receipt : ModelBase {
        DateTime CreationDate { get; set; }
        DateTime ModifyDate { get; set; }
    }
}

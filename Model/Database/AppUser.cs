using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Database {
    public class AppUser : ModelBase {
        public string Login { set; get; }
        public string Hash { set; get; }
        public string Salt { set; get; }
    }
}
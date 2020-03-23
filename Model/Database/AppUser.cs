using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.Database {
    public class AppUser : ModelBase {
        public string Login { set; get; }
        public string Hash { set; get; }
        public string Salt { set; get; }
        public string Token { get; set; }
        [NotMapped]
        public string Password { get; set; }
    }
}
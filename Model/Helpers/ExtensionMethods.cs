using Model.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model.Helpers {
    public static class ExtensionMethods {
        public static IEnumerable<AppUser> WithoutPasswords(this IEnumerable<AppUser> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static AppUser WithoutPassword(this AppUser user) {
            user.Hash = null;
            return user;
        }
    }
}

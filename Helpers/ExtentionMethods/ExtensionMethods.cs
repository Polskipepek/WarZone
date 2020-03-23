using Model.Database;
using System.Collections.Generic;
using System.Linq;

namespace Helpers {
    public static class AppUserExtentionMethods {
        public static IEnumerable<AppUser> WithoutPasswords (this IEnumerable<AppUser> users) {
            return users.Select (x => x.WithoutPassword ());
        }

        public static AppUser WithoutPassword (this AppUser user) {
            user.Hash = null;
            return user;
        }
    }
}

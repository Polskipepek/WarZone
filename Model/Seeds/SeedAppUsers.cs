using System;
using System.Collections.Generic;
using Model;
using Model.Database;

using Model.Helpers;

namespace WarZoneWebApp.Database.Seeds {
    public class SeedAppUsers : SeedBase {
        public override void Seed(Context context) {
            List<AppUser> tmpUsers = new List<AppUser>();
            string tmpSalt1 = Faker.Generators.Strings.GenerateAlphaNumericString();
            tmpUsers.Add(new AppUser { Login = "Admin", Hash = StringHelper.CreateSha256("adminPass", tmpSalt1), Salt = tmpSalt1 });
            string tmpSalt2 = Faker.Generators.Strings.GenerateAlphaNumericString();
            tmpUsers.Add(new AppUser { Login = "User", Hash = StringHelper.CreateSha256("userPass", tmpSalt2), Salt = tmpSalt2 });
            context.AppUsers.AddRange(tmpUsers);
        }
    }
}

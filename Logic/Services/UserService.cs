using Helpers.Misc;
using Microsoft.Extensions.Options;
using Model;
using Model.Database;
using System.Linq;

namespace Logic.Services {

    public class UserService : IUserService {
        private readonly AppSettings _appSettings;

        public UserService (IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public bool Authenticate (string username, string password) {
            AppUser user = null;
            using (var context = new Context ()) {
                user = context.AppUsers.FirstOrDefault (user => user.Login == username);

                if (user == null || StringHelper.CompareSha256 (password + user.Salt, user.Hash) == false)
                    return false;

                user.Token = Faker.Generators.Strings.GenerateAlphaNumericString (16, 16);

                context.AppUsers.Update (user);

                return true;

            }
        }

        public AppUser Authorize (string username, string token) {
            using (var context = new Context ()) {
                return context.AppUsers.FirstOrDefault (user => user.Login == username && user.Token == token);
            }
        }

    }
}
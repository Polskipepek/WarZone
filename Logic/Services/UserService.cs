using Helpers;
using Helpers.Misc;
using Microsoft.Extensions.Options;
using Model;
using Model.Database;
using System.Linq;

namespace Logic.Services {
    public interface IUserService {
        AppUser Authenticate (string username, string password);
    }

    public class UserService : IUserService {
        private readonly AppSettings _appSettings;

        public UserService (IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public AppUser Authenticate (string username, string password) {
            AppUser user = null;
            using (var context = new Context ()) {
                user = context.AppUsers.Where (user => user.Login == username).FirstOrDefault ();
            }

            if (user == null || StringHelper.CompareSha256 (password + user.Salt, user.Hash) == false)
                return null;


            return user.WithoutPassword ();
        }

    }
}
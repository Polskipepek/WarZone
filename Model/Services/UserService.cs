using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Model.Database;
using Model.Helpers;

namespace Model.Services {
    public interface IUserService {
        AppUser Authenticate(string username, string password);
    }

    public class UserService : IUserService {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public AppUser Authenticate(string username, string password) {
            AppUser user = null;
            using (var context = new Context()) {
               user = context.AppUsers.Where(user => user.Login == username).FirstOrDefault();
            }

            if (user == null || StringHelper.CompareSha256(password + user.Salt, user.Hash) == false)
                return null;


            return user.WithoutPassword();
        }

    }
}
using Model.Database;

namespace Helpers {
    public static class AppUserExtensionMethods {
        public static AppUser WithoutSensitiveData (this AppUser user) {
            if (user == null)
                return null;
            return new AppUser () { Id = user.Id, Login = user.Login, Token = user.Token };
        }
    }
}

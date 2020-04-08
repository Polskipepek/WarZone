using Model.Database;

namespace Logic.Services {
    public interface IUserService {
        bool Authenticate (string login, string password, out AppUser appUser);
    }
}

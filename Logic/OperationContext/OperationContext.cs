using Model.Database;

namespace Logic.OperationContext {
    public class OperationContext : IOperationContext {

        public AppUser CurrentUser { get; private set; }

        public bool IsAdmin { get; private set; }

        public void ClearContextData () {
            CurrentUser = null;
            IsAdmin = false;
        }

        public void SetContext (AppUser appUser) { // 17.04.2020 ohacel - tu rozbudowywac kontext jakby co - nie dawac public setow
            if (appUser == null) {
                ClearContextData ();
                return;
            }

            this.CurrentUser = appUser;
            IsAdmin = appUser.Id == 1;
        }
    }
}

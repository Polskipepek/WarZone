using Model.Database;

namespace Logic.OperationContext {
    public class OperationContext : IOperationContext {

        public static AppUser CurrentUser { get; set; }

        public static bool IsAdmin { get; set; }
    }
}

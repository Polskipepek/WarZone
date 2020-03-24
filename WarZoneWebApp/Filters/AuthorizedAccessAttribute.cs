using Logic.OperationContext;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace WarZoneWebApp.Filters {

    public class AuthorizedAccessAttribute : Attribute, IActionFilter {

        public UserService UserService { get; set; }
        public OperationContext OperationContext { get; set; }
        public void OnActionExecuting (ActionExecutingContext context) {
            var currentUser = UserService.Authorize (context.HttpContext.Request.Headers["login"], context.HttpContext.Request.Headers["token"]);

            if (currentUser == null) {
                context.Result = new UnauthorizedResult ();
                return;
            }

            OperationContext.CurrentUser = currentUser;
            OperationContext.IsAdmin = currentUser.Id == 0;
        }

        public void OnActionExecuted (ActionExecutedContext context) {
            OperationContext.CurrentUser = null;
            OperationContext.IsAdmin = false;
        }
    }
}

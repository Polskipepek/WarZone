using Logic.OperationContext;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Model.Database;
using System;

namespace WarZoneWebApp.Filters {

    public class AuthorizedAccessAttribute : Attribute, IActionFilter {

        public UserService UserService { get; set; }
        public OperationContext OperationContext { get; set; }
        public void OnActionExecuting (ActionExecutingContext context) {
            if (context.HttpContext.Request.Cookies.TryGetValue ("login", out string login) && context.HttpContext.Request.Cookies.TryGetValue ("token", out string token)) {
                if (UserService.Authorize (login, token, out AppUser currentUser)) {
                    OperationContext.CurrentUser = currentUser;
                    OperationContext.IsAdmin = currentUser.Id == 0;

                    return;
                }
            }
            OperationContext.ClearContextData ();
            context.Result = new UnauthorizedResult ();
        }

        public void OnActionExecuted (ActionExecutedContext context) {
            OperationContext.ClearContextData ();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace WarZoneWebApp.Filters {

    public class AuthorizedAccessAttribute : Attribute, IActionFilter {
        public void OnActionExecuted (ActionExecutedContext context) {
            if (!PublicAuthorizeService.VerifyIdANDSecret (context.HttpContext.Request.Headers["appid"], context.HttpContext.Request.Headers["appsecret"])) {
                context.Result = new UnauthorizedResult ();
                return;
            }

            if (!PublicAuthorizeService.VerifyScopes (context.HttpContext.Request.Headers["appid"], context.RouteData.Values["Controller"].ToString ())) {
                context.Result = new UnauthorizedResult ();
                return;
            }
        }

        public void OnActionExecuting (ActionExecutingContext context) {
        }
    }
}

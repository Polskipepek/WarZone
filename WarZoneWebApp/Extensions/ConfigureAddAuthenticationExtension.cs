using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using WarZoneWebApp.Constants;

namespace WarZoneWebApp {
    public static class ConfigureAddAuthenticationExtension {
        public const string AuthCookieName = "auth_WarZoneWebApp";
        public static void ConfigureAddAuthentication (this IServiceCollection services) {
            // Bind options using a sub-section of the appsettings.json file.
            services.AddAuthentication (CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie (options => {
                    options.Cookie.Name = AuthCookieName;
                    options.Events.OnRedirectToLogin = async context => {
                        context.Response.Headers.Remove ("Location");
                        context.Response.StatusCode = CookieAuthenticationConst.UnauthorizedStatusCode;

                        byte[] data = Encoding.UTF8.GetBytes (CookieAuthenticationConst.UnauthorizedResponseBody);
                        context.Response.ContentType = CookieAuthenticationConst.UnauthorizedResponseContentType;
                        await context.Response.Body.WriteAsync (data, 0, data.Length);
                    };
                });
        }
    }
}

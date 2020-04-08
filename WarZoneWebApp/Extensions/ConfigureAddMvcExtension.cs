using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;


namespace WarZoneWebApp {
    public static class ConfigureAddMvcExtension {
        public static void ConfigureAddMvc (this IServiceCollection services) {
            // Bind options using a sub-section of the appsettings.json file.
            services.AddMvc (options => {
                var policy = new AuthorizationPolicyBuilder (CookieAuthenticationDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser ()
                .Build ();
                options.Filters.Add (new AuthorizeFilter (policy));
                //options.Filters.Add<OperationContextInitializer> ();
            })
             .AddSessionStateTempDataProvider ()
             .AddControllersAsServices ();
        }
    }
}

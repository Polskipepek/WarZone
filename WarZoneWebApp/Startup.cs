using Logic.OperationContext;
using Logic.Seeders;
using Logic.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Model;
using System.Text;

namespace WarZoneWebApp {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {

            services.AddControllersWithViews ();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<Context> ();

            services.AddSwaggerDocument ();

            var appSettingsSection = Configuration.GetSection ("AppSettings");
            services.Configure<AppSettings> (appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings> ();
            var key = Encoding.ASCII.GetBytes (appSettings.Secret);

            // configure DI for application services
            services.AddSingleton<IUserService, UserService> ();
            services.AddSingleton<IOperationContext, OperationContext> ();
            services.AddSingleton<Context> ();

            services.ConfigureAddMvc ();
            services.ConfigureAddAuthentication ();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }


            app.UseHttpsRedirection ();
            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();

            app.UseRouting ();

            app.UseCors (x => x
         .AllowAnyOrigin ()
         .AllowAnyMethod ()
         .AllowAnyHeader ());

            app.UseAuthentication ();
            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllerRoute (
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory> ().CreateScope ()) {
                var context = serviceScope.ServiceProvider.GetRequiredService<Context> ();
                if (context.Database.GetService<IRelationalDatabaseCreator> ().Exists () == false) {
                    context.Database.Migrate ();
                    Seeder.SeedAll ();
                }
            }

            app.UseSpa (spa => {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ()) {
                    spa.UseReactDevelopmentServer (npmScript: "start");
                }
            });
        }
    }
}

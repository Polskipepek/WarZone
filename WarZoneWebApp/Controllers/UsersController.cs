using Helpers;
using Logic.OperationContext;
using Logic.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using System;
using System.Linq;
using System.Security.Claims;
using WarZoneWebApp.Constants;

[ApiController]
[Route ("api/[controller]")]
public class UsersController : ControllerBase {
    private IUserService UserService { get; set; }
    private Context context;
    private IOperationContext operationContext;

    public UsersController (Context context, IUserService userService, IOperationContext operationContext) {
        this.context = context;
        UserService = userService;
        this.operationContext = operationContext;
    }

    [HttpPost]
    [Route ("[action]")]
    [AllowAnonymous]
    public ActionResult<AppUser> Authenticate ([FromHeader] string login, [FromHeader] string password) {
        var success = UserService.Authenticate (login, password, out AppUser appUser);

        if (!success)
            return BadRequest ();

        SignIn (ref appUser);

        return appUser;
    }

    private void SignIn (ref AppUser appUser) {
        var token = CreateToken ();
        var claimsIdentity = CreateClaimsIdentity (token, appUser);

        var taskSignResult = HttpContext.SignInAsync (CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal (claimsIdentity));
        taskSignResult.GetAwaiter ().GetResult ();

        appUser.Token = token;

        context.AppUsers.Update (appUser);
        context.SaveChanges ();

        if (operationContext is OperationContext oc) {
            oc.SetContext (appUser);
        }

        //HttpContext.Session.Clear ();
        // UserContextInitializer.Init (appUser, token);
    }

    [HttpPost]
    [Route ("[action]")]
    public ActionResult<AppUser> Authorize (string token) {
        if (!string.IsNullOrEmpty (token) && operationContext is OperationContext oc) {
            var appUser = context.AppUsers.FirstOrDefault (e => e.Token == token);

            oc.SetContext (appUser);
            return appUser.WithoutSensitiveData ();
        }
        return null;

    }

    private static string CreateToken () {
        return Guid.NewGuid ().ToString ();
    }

    private ClaimsIdentity CreateClaimsIdentity (string token, AppUser appUser) {
        var claimsIdentity = new ClaimsIdentity (CookieAuthenticationDefaults.AuthenticationScheme);
        claimsIdentity.AddClaim (new Claim (ClaimTypes.Name, appUser.Login));
        claimsIdentity.AddClaim (new Claim (CookieAuthenticationConst.TokenClaimType, token));

        return claimsIdentity;
    }
}


//private readonly Context context;
//private readonly SignInManager<IdentityUser> signInManager;

//public LoginController(SignInManager<IdentityUser> signInManager) {
//    this.signInManager = signInManager;
//}

//[HttpPost]
//public async Task<IActionResult> Login([FromBody]AppUser appUser) {
//    if (ModelState.IsValid) {
//        using (Context context = new Context()) {
//            var salt = context.AppUsers.Where(user => user.Login == appUser.Login).Select(e => e.Hash).FirstOrDefault();
//            if (string.IsNullOrEmpty(salt)) {
//                ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
//                return BadRequest();
//            }
//            var saltedHashBytes = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(appUser.Hash + salt));
//            var saltedHash = Encoding.UTF8.GetString(saltedHashBytes);
//            var result = await signInManager.PasswordSignInAsync(
//                appUser.Login, saltedHash, true, false);

//            if (result.Succeeded) {
//                return RedirectToAction("index", "home");
//            }

//            ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
//        }
//    }
//    return BadRequest();
//}
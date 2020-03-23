using Logic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;

[ApiController]
[Route ("api/[controller]")]
public class UsersController : ControllerBase {
    private IUserService _userService;
    private Context context;

    public UsersController (Context context, IUserService userService) {
        this.context = context;
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost]
    public ActionResult<AppUser> Authenticate ([FromBody]AppUser appUser) {
        var user = _userService.Authenticate (appUser.Login, appUser.Password);

        if (user == null)
            return BadRequest (new { message = "Username or password is incorrect" });




        return user;
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
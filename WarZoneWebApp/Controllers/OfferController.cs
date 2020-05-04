using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using System.Linq;

namespace WarZoneWebApp.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase {

        private readonly Context context;

        public OfferController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Weapon[]> GetWeapons () {
            return context.Weapons.Where (e => e.Id != -1).OrderBy (e => e.WeaponName).ToArray ();
        }
    }
}
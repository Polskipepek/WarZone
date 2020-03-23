using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;

namespace WarZoneWebApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase {

        private readonly Context context;

        public OfferController (Context context) {
            this.context = context;
        }

        [HttpPost]
        public ActionResult<Weapon[]> GetWeapons() {
            //3. Handle request
            //4. return value

            return context.Weapons.Where(e=>e.Id != -1).OrderBy(e=>e.WeaponName).ToArray();
        }




    }
}
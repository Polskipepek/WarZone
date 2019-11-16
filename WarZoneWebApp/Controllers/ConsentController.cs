using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WarZoneWebApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ConsentController : ControllerBase {

        [HttpPost]
        public string Get () {
            return "wypierdalaj";
        }
    }
}
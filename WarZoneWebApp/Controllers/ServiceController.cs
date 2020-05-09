using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using System.Linq;

namespace WarZoneWebApp.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase {

        private readonly Context context;

        public ServiceController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Service[]> SearchServicesByName (string searchPhrase) {
            if (string.IsNullOrWhiteSpace (searchPhrase)) {
                return null;
            }
            searchPhrase = searchPhrase.ToLower ();
            return context.Services.Where (e => e.ServiceName.ToLower ().Contains (searchPhrase)).OrderBy (e => e.ServiceName).ToArray ();
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Service[]> SearchServicesById (int searchId) {
            return context.Services.Where (e => e.Id == searchId).OrderBy (e => e.ServiceName).ToArray ();
        }
    }
}
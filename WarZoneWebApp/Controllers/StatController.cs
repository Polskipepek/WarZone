using Logic.DtoMappers;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using Model.Dto.Statistics;
using System;
using System.Globalization;
using System.Linq;

namespace WarZoneWebApp.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class StatController : ControllerBase {

        private readonly Context context;
        private readonly NumberInfoDtoMapper numberInfoDtoMapper;
        public StatController (Context context, NumberInfoDtoMapper numberInfoDtoMapper) {
            this.context = context;
            this.numberInfoDtoMapper = numberInfoDtoMapper;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult<NumberInfo> GetDailyIncome (DateTime? date = null) {
            if(!date.HasValue) {
                date = DateTime.Today;
            }
            return numberInfoDtoMapper.GetDailyRevenues (date.Value);
        }
    }
}

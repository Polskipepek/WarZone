using Model.Database;
using Model.Dto;
using System.Collections.Generic;
using System.Linq;

namespace Logic.DtoMappers {
    public class TransactionListDtoMapper {
        public TransactionListDto[] Map (Transaction[] transactions) {

            List<TransactionListDto> list = new List<TransactionListDto> ();

            var servicesCategories = transactions.Select (t => t.ServiceId).Distinct ();
            foreach (var serviceId in servicesCategories) {
                var services = transactions.Where (t => t.ServiceId == serviceId);
                TransactionListDto tld = new TransactionListDto () {
                    ServiceId = services.Select (t => t.Service.Id).First (),
                    Count = services.Count (),
                    Price = services.Select (t => t.Service.ServicePrice).First (),
                    ServiceName = services.Select (t => t.Service.ServiceName).First (),
                    TotalPrice = services.Sum (t => t.Service.ServicePrice)
                };
                list.Add (tld);
            }
            return list.ToArray ();
        }
    }
}

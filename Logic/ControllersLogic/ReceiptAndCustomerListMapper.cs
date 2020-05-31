using Model.Database;
using Model.Dto;
using System.Collections.Generic;
using System.Linq;

namespace Logic.ControllersLogic {
    public class ReceiptAndCustomerListMapper {
        public Customer[] Map (ReceiptAndCustomerBinder[] data) {
            List<Customer> list = new List<Customer> ();

            foreach (Customer customer in data.Select(s=>s.Customer)) {
                Customer c = new Customer () {
                    Id = customer.Id,
                    CustomerName = customer.CustomerName,
                    CustomerSurname = customer.CustomerSurname
                };
                list.Add (c);
            }
            return list.ToArray ();
        }
    }
}

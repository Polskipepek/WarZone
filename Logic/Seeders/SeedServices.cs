using Model;
using Model.Database;
using System.Collections.Generic;

namespace Logic.Seeders {
    public class SeedServices : SeedBase {
        public override void Seed (Context context) {
            List<Service> services = new List<Service> ();
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Wejście", ServicePrice = 20 });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "B&T MP9: 10 strzałów", ServicePrice = 35.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "BERETTA 92S: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "COLT 1911: 5 strzałów", ServicePrice = 20.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Colt SAA 1873: 6 strzałów", ServicePrice = 40.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "CZ 75 Compact: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "CZ SHADOW 2: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "FN P90: 10 strzałów", ServicePrice = 90.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Galil: 10 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "GLOCK 17: 10 strzałów", ServicePrice = 23.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "GLOCK 19X: 10 strzałów", ServicePrice = 23.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K G3: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K G36: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K HK33: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K Mark 23: 10 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K MP5A3: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "H&K SFP9: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "IMI DESERT EAGLE: 7 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "KAŁASZNIKOW: 10 strzałów", ServicePrice = 40.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Lee Enfield No.1 Mk.III: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "M249 MK1: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "M4A1: 10 strzałów", ServicePrice = 45.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Mauser K98: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Micro UZI: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Mini-Beryl: 10 strzałów", ServicePrice = 45.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Mosin 1891/30: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "MP40: 10 strzałów", ServicePrice = 35.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "MP446 VIKING: 10 strzałów", ServicePrice = 23.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "MSBS GROT: 10 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "P83 Wanad: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Pistolet sportowy: 10 strzałów", ServicePrice = 12.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "PM98 Glauberyt: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "PPS: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "PPSz41: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "S&W 357 MAGNUM: 6 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "S&W 44 MAGNUM: 6 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "SA vz.61 Skorpion: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "SCORPION EVO3: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "SIG SAUER P320C: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "SIG SG550: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "STEN mkII: 10 strzałów", ServicePrice = 35.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Sterling: 10 strzałów", ServicePrice = 35.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "STEYR AUG: 10 strzałów", ServicePrice = 60.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Strzelba KEL-TEC KSG: 5 strzałów", ServicePrice = 40.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Strzelba Obrzyn: 2 strzały", ServicePrice = 16.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Strzelba pump-action Mossberg: 5 strzałów", ServicePrice = 40.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Strzelba pump-action STF12: 5 strzałów", ServicePrice = 40.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "SWDS Dragunow: 5 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "TAURUS RAGING BULL: 1 strzał", ServicePrice = 18.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Thompson M1928A1: 10 strzałów", ServicePrice = 50.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "TT wz33: 10 strzałów", ServicePrice = 30.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "UZI: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Walther P38: 5 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "WALTHER P99: 10 strzałów", ServicePrice = 25.00f });
            services.Add (new Service { Id = services.Count + 1, ServiceName = "Winchester Lever Action: 10 strzałów", ServicePrice = 60.00f });
            context.Services.AddRange (services);
        }
    }
}

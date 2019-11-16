using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarZoneWebApp.Database.Seeds {
    public abstract class SeedBase {
        public abstract void Seed(Context context);
    }
}

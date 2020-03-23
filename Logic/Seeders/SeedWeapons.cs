using Model;
using Model.Database;
using System.Collections.Generic;

namespace Logic.Seeders {
    public class SeedWeapons : SeedBase {
        public override void Seed (Context context) {
            List<Weapon> tmpWeapons = new List<Weapon> ();
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "B&T MP9" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "BERETTA 92S" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "COLT 1911" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "COLT SAA 1873" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "CZ 75" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "CZ SHADOW 2" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "FN P90" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "GALIL" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "GLOCK 17" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "GLOCK 19X" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K G3" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K G36" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K HK33" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K MARK23" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K MP5A3" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "H&K SFP9" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "IMI DESERT EAGLE" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "KAŁASZNIKOW" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "LEE ENFIELD NO. 1 MK. 3" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "M4A1" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "M249 MK1" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MAUSER K98" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MICRO UZI" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MINI-BERYL" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MOSIN 1891_30" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MP446 VIKING" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "MSBS GROT" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "P83 WANAD" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "PISTOLET SPORTOWY" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "PM98 GLAUBERYT" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "PPS" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "PPSZ41" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "S&W 44 MAGNUM" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "S&W 357 MAGNUM" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "SA VZ.61 SKORPION" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "SCORPION EVO3" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "SIG SAUER P320C" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STEN MK. 2" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STERLING" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STEYR AUG" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STRZELBA KEL-TEG KSG" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STRZELBA OBRZYN" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STRZELBA PUMP-ACTION MOSSBERG" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "STRZELBA PUMP-ACTION STF12" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "SWDS DRAGUNOW" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "TAURUS RAGING BULL" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "THOMPSON M1928A1" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "TT WZ33" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "UZI" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "WALTHER P38" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "WALTHER P99" });
            tmpWeapons.Add (new Weapon { Id = tmpWeapons.Count + 1, WeaponName = "WINCHESTER LEVER ACTION" });

            tmpWeapons.ForEach (e => context.Weapons.Add (e));
        }
    }
}

using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Logic.Seeders {
    public static class Seeder {
        public static void SeedAll () {
            using (Context context = new Context ()) {
                GetEnumerableOfType<SeedBase> ().ToList ().ForEach (e => e.Seed (context));
                context.SaveChanges ();
            }
        }
        public static IEnumerable<T> GetEnumerableOfType<T> () where T : class {
            List<T> objects = new List<T> ();
            foreach (Type type in
                Assembly.GetAssembly (typeof (T)).GetTypes ()
                .Where (myType => myType.IsClass && !myType.IsAbstract && myType.IsSubclassOf (typeof (T)))) {
                objects.Add ((T) Activator.CreateInstance (type));
            }
            return objects;
        }
    }
}

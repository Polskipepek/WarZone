${
    Template(Settings settings)
    {
		settings.IncludeAllProjects();
		settings.IncludeReferencedProjects();
        settings.OutputExtension = ".ts";
		settings.OutputFilenameFactory = file => {
			return $"../ClientApp/src/components/model/{file.Name.Replace(".cs", ".ts")}";
		};
    }

    string ClassNameWithExtends(Class c) => c.Name + (c.BaseClass != null ? " extends " + c.BaseClass.Name : "");

    // append a ? next to any type that is nullable
    string TypeNullableFormatted(Property property) => property.Type.IsNullable ? $"?" : $"";

    string ImportsList(Class objClass)
    {
        List<string> neededImports = new List<string>();

		foreach(var prop in objClass.Properties){
			if (prop.Type.IsPrimitive == false){
				neededImports.Add("import { " + prop.Type.Name.Replace("[]", "") + " } from './" + prop.Type.Name.Replace("[]", "") + "';");
			}
		}

        if (objClass.BaseClass != null)
        {
            neededImports.Add("import { " + objClass.BaseClass.Name + " } from './" + objClass.BaseClass.Name + "';");
        }

        return String.Join("\n", neededImports.Distinct()); 
    }

	bool ClassFilter(Class c){
		string[] classes = {
			"Customer",
            "Weapon",
            "Service",
            "Receipt",
            "Transaction",
            "ModelBase",		
		};
		return classes.Contains(c.Name);
	}
}
$Classes(c=>ClassFilter(c))[
$ImportsList
export interface $ClassNameWithExtends {
	$Properties[
		$name$TypeNullableFormatted: $Type;]
}
]
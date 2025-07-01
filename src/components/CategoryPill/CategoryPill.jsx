import "./categoryPill.css";
import { useTranslations } from "../../locales/utils";

export default function CategoryPill({ licenseID, lang }) {
  const t = useTranslations(lang);

  let license = "";
  let licenseColorHSLA = "";

  switch (licenseID) {
    case 1:
      license = "Rookie";
      licenseColorHSLA = "4, 100%, 50%";
      break;
    case 2:
      license = t("classD");
      licenseColorHSLA = "24, 100%, 50%";
      break;
    case 3:
      license =  t("classC");
      licenseColorHSLA = "48, 96%, 48%";
      break;
    case 4:
      license = t("classB");
      licenseColorHSLA = "110, 100%, 29%";
      break;
    case 5:
      license =  t("classA");
      licenseColorHSLA = "214, 98%, 50%";
      break;
    case 6:
      license = "Class PRO";
      licenseColorHSLA = "";
      break;
    default:
      license = "";
      licenseColorHSLA = "";
  }

  if (!license) return null;

  return (
      <div
          className="o-categoryPill -bentoContainer"
          style={{ "--licenseColorHSLA": licenseColorHSLA }}
      >
          <div className="pill">
              <h2 className="text">{license}</h2>
          </div>
      </div>
  );
}

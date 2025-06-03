import "./categoryPill.css";

export default function CategoryPill({ licenseID }) {
  let license = "";
  let licenseColorHSLA = "";

  switch (licenseID) {
    case 1:
      license = "Class D";
      licenseColorHSLA = "38, 93%, 42%";
      break;
    case 2:
      license = "Class C";
      licenseColorHSLA = "48, 96%, 48%";
      break;
    case 3:
      license = "Class B";
      licenseColorHSLA = "110, 100%, 29%";
      break;
    case 4:
      license = "Class A";
      licenseColorHSLA = "214, 98%, 50%";
      break;
    case 5:
      license = "Class PRO";
      licenseColorHSLA = "";
      break;
    default:
      license = "";
      licenseColorHSLA = "";
  }

  return (
    <div className="o-categoryPill -bentoContainer" style={{ "--licenseColorHSLA": licenseColorHSLA  }}>
      <span className="pill">
        <span className="text">
          {license}
        </span>
      </span>
    </div>
  );
}

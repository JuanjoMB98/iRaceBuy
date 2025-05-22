import { leerJSON, guardarJSON } from "./prepareDataSeason";

export function getSeason(newParams = {}): any {
    const season = leerJSON("src/data/seasonData.json");

    const defaultParams = {
        id: [],             // { id: ["4865", "4805"] }
        licencia: false,    // { licencia: "2" }
        track_id: false,    // { track_id: "243" }
        track: false,       // { track: 'Volusia Speedway Park' }
    };

    const params = { ...defaultParams, ...newParams };

    var filter = "1 == 1";
    var filteredSeasons = {};

    // Devolverá cualquier season que sea de las IDs filtradas
    if (params.id.length > 0) {
        console.log("Filtrando temporadas por IDs:", params.id);
        const idFilter = params.id.map(id => "element.id == " + id).join(" || ");
        filter = filter + " && (" + idFilter + ")";
    }

    //Devolverá cualquier season que sea de la licencia filtrada
    if (params.licencia !== false) {
        console.log("Filtrando temporadas por licencia:", params.licencia);
        filter = filter + " && element.licencia == " + params.licencia;
    }

    //Devolverá cualquier season que tenga este cicuito_id en su calendario
    if (params.track_id !== false) {
        console.log("Filtrando temporadas por circuito_id:", params.track_id);
        filter =
            filter +
            " && element.calendario.some(cal => cal.track_id == " +
            params.track_id +
            ")";
    }

    //Devolverá cualquier season que tenga este cicuito en su calendario
    if (params.track !== false) {
        console.log("Filtrando temporadas por circuito:", params.track);
        filter =
            filter +
            ` && element.calendario.some(cal => cal.track == "${params.track}")`;
    }

    // poder ordenar por lo que quieras

    filteredSeasons = season.filter((element) => eval(filter));

    return filteredSeasons;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    // console.log(getSeason({ track: 'Volusia Speedway Park' }));
    // guardarJSON("src/data/seasonResultado.json", getSeason({licencia:1}))
}

// Crear función para agrupar por licencias
// Crear función para contar circuitos ( Trackid )

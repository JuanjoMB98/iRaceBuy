import { leerJSON } from "./prepareDataSeason";

function getSeason( newParams = {} ):any{

    const season = leerJSON("src/data/seasonData.json")

    const defaultParams = {
        id: false,
        licencia: false,
        track_id: false,
        track: false
    };

    const params = { ...defaultParams, ...newParams };


    var filter = "1 == 1";
    var filteredSeasons = {};


    //Devolverá cualquier season que sea de la id filtrada
    if (params.id !== false) {
        console.log("Filtrando temporadas por id:", params.id);
        filter = filter + " && element.id == " + params.id
    }

    //Devolverá cualquier season que sea de la licencia filtrada
    if (params.licencia !== false) {
        console.log("Filtrando temporadas por licencia:", params.licencia);
        filter = filter + " && element.licencia == " + params.licencia
    }

    //Devolverá cualquier season que tenga este cicuito_id en su calendario
    if (params.track_id !== false) {
        console.log("Filtrando temporadas por circuito_id:", params.track_id);
        filter = filter + " && element.calendario.some(cal => cal.track_id == " + params.track_id + ")"
    }

    //Devolverá cualquier season que tenga este cicuito en su calendario
    if (params.track !== false) {
        console.log("Filtrando temporadas por circuito:", params.track);
        filter = filter + ` && element.calendario.some(cal => cal.track == "${params.track}")`;
    }

    
    filteredSeasons = season.filter(element => eval(filter))

    return filteredSeasons;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    // prepararDB(data);
    console.log(
        JSON.parse(getSeason({id:"4799"}))
    );
}
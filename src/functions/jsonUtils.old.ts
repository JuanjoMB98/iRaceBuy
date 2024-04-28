import * as fs from "fs";

const data = leerJSON("src/data/season_24.json")

interface SeasonData {
    season_id: number;
    // Aquí puedes agregar otras propiedades si las conoces de antemano
}


// Función para leer el archivo JSON
export function leerJSON(path: string): any[] {
    return JSON.parse(fs.readFileSync(path, "utf8"));
}

// Función para extraer solo los nombres
export function extraerNombres(data: any[]): string[] {
    return data.map((item) => item.season_name);
}

// Función para extraer solo el season_id
export function extraerSeasonIDs(data: any[]): string[] {
    return data.map((item) => item.season_id);
}

// Función para extraer las carreras con su fecha y circuito
export function extraerCalendarios(data: any[]): string[] {
    const series = data.map((item) => item.schedules);

    const weaklySerie: any[] = [];

    series.forEach((item) => {
        item.forEach((serie) => {
            weaklySerie.push({
                raceWeek: serie.race_week_num,
                startDate: serie.start_date,
                series_name: serie.series_name,
            });
        });
    });

    return weaklySerie;
}

// export function extraerCalendarios(data: any[]): any[] {
//     return data.map((item) => ({
//         race_week_num: item.schedules.race_week_num,
//         start_date: item.schedules.start_date,
//         series_name: item.schedules.series_name,
//         track_category: item.schedules.track.category,
//         track_name: item.schedules.track.track_name,
//     }));
// }

function getSeasonID(season: []): number {
    return season["season_id"];
}

// Función para guardar datos en un archivo JSON
export function guardarJSON(path: string, data: any[]): void {
    fs.writeFileSync(path, JSON.stringify(data), "utf8");
}

// Función para preparar la base de datos con nombres e IDs relacionados
export function prepararDB(datos: any[]): void {
    // Inicializamos la base de datos
    const db = [];

    datos.forEach((season) => {
        let aux = {};

        aux["id"] = getSeasonID(season);

        db.push(aux);
    });


    console.log(db);
    console.log(JSON.stringify(db));

    // guardarJSON("src/data/seasonIDs.json", db);
}

    // const ids = extraerSeasonIDs(datos);
    // const nombres = extraerNombres(datos);
    // const calendarios= extraerCalendarios(datos)

    // Combina los nombres y los IDs en un arreglo de objetos
    // const db = ids.map((id, index) => ({
    //     id: id,
    //     nombre: nombres[index],
    //     calendario: calendarios[index],
    // }));

// Función para contar objetos de primer nivel
export function contarObjetos(datos: any[]): number {
    return datos.length;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    prepararDB(data);
}

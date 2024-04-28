import * as fs from "fs";


//CONTROLADOR DE ARCHIVOS

// Función para leer el archivo JSON
export function leerJSON(path: string): any[] {
    return JSON.parse(fs.readFileSync(path, "utf8"));
}

// Función para guardar datos en un archivo JSON
export function guardarJSON(path: string, data: any[]): void {
    fs.writeFileSync(path, JSON.stringify(data), "utf8");
}

const data = leerJSON("src/data/season_24.json")

function getSeasonID(season): number {
    return season.season_id;
}

function getSeasonName(season): string {
    return season.season_name;
}

function getLicenseGroup(season): string {
    return season.license_group;

    // CATEGORIA DE LICENCIAS
    // 1 => clase Rookie
    // 2 => clase D
    // 3 => clase C
    // 4 => clase B
    // 5 => clase A
}

function getSeasonSchedule(season): any {
    const seasonSchedule = season.schedules;

    const weaklySerie = [];

    seasonSchedule.forEach(week => {
        weaklySerie.push({
            raceWeek: week.race_week_num,
            startDate: week.start_date,
            series_name: week.series_name,
            track: week.track.track_name + (week.track.config_name ? (" - " + week.track.config_name) : "") ,
        });
        
    });

    return weaklySerie;
}

// Función para preparar la base de datos con nombres e IDs relacionados
export function prepararDB(datos: any[]): void {
    // Inicializamos la base de datos
    const db = [];

    datos.forEach((season) => {
        let aux = {};

        aux["id"] = getSeasonID(season);
        aux["nombre"] = getSeasonName(season);
        aux["licencia"] = getLicenseGroup(season);
        aux["calendario"] = getSeasonSchedule(season);

        db.push(aux);
    });


    console.log(db);

    guardarJSON("src/data/seasonIDs.json", db);
}


// Función para contar objetos de primer nivel
export function contarObjetos(datos: any[]): number {
    return datos.length;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    prepararDB(data);
}

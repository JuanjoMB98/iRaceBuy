import * as fs from "fs";
import path from "path";

//CONTROLADOR DE ARCHIVOS

// Función para leer el archivo JSON
export function leerJSON(path: string): any[] {
    return JSON.parse(fs.readFileSync(path, "utf8"));
}

// Función para guardar datos en un archivo JSON
export function guardarJSON(path: string, data: any[]): void {
    fs.writeFileSync(path, JSON.stringify(data), "utf8");
}

const week = leerJSON("src/data/season_2024_1race.json");

// https://members-ng.iracing.com/data/series/seasons
const data = leerJSON("src/data/season_24.json");

// https://members-ng.iracing.com/data/track/assets
const tracksData = leerJSON("src/data/tracksData.json");

//https://members-ng.iracing.com/data/series/assets/
const seriesLogos = leerJSON("src/data/seriesLogos.json");

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

    seasonSchedule.forEach((week) => {
        weaklySerie.push({
            raceWeek: week.race_week_num,
            startDate: week.start_date,
            series_name: week.series_name,
            track_id: week.track.track_id,
            track:
                week.track.track_name +
                (week.track.config_name ? " - " + week.track.config_name : ""),
            mapUrl: getTrackMapActiveUrl(week.track.track_id),
        });
    });

    return weaklySerie;
}

export function getTrackMapActiveUrl(trackId: number): string | null {

    let actualTrack = tracksData[trackId];
    let trackMapUrl = actualTrack.track_map + actualTrack.track_map_layers.active;

    return trackMapUrl;
}

function getSeasonLogo(season): any {

    let serieId = season.series_id;
    let iracingLink = "https://images-static.iracing.com/img/logos/series/";
    let actualSerie = seriesLogos[serieId];
    
    let logoFilename = iracingLink + actualSerie.logo;

    return logoFilename;
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
        aux["logo"] = getSeasonLogo(season);
        aux["calendario"] = getSeasonSchedule(season);
        db.push(aux);
    });

    console.log(db);

    guardarJSON("src/data/seasonData.json", db);
}

// Función para contar objetos de primer nivel
export function contarObjetos(datos: any[]): number {
    return datos.length;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    prepararDB(data);
    // getSeasonLogo(week);
}

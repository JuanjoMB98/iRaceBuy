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


function getSourceData() {
    return {
        // https://members-ng.iracing.com/data/series/seasons
        data: leerJSON("src/data/API_currentSeason.json"),
        // https://members-ng.iracing.com/data/track/assets
        tracksData: leerJSON("src/data/API_tracksAssets.json"),
        // https://members-ng.iracing.com/data/track/get
        tracksAllInfo: leerJSON("src/data/API_tracks.json"),
        // https://members-ng.iracing.com/data/series/assets/
        seriesLogos: leerJSON("src/data/API_seriesLogos.json"),
    };
}


function getSeasonID(season): number {
    return season.season_id;
}

function getSeasonName(season): string {
    return season.season_name;
}

function getSeasonType(season): string {
    return season.track_types[0].track_type;
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

function getSeasonSchedule(season, tracksData, tracksAllInfo): any {
    const seasonSchedule = season.schedules;

    const weaklySerie = [];

    seasonSchedule.forEach((week) => {
        weaklySerie.push({
            raceWeek: week.race_week_num,
            startDate: week.start_date,
            series_name: week.series_name,
            series_id: "w"+week.race_week_num+"s"+week.series_id,
            track_id: week.track.track_id,
            track:
            week.track.track_name +
            (week.track.config_name ? " - " + week.track.config_name : ""),
            isFreeTrack: isFreeContent(week.track.track_id, tracksAllInfo),
            mapUrl: getTrackMapActiveUrl(week.track.track_id, tracksData),
            rainChance: week.weather?.weather_summary?.precip_chance ?? null,
        });
    });

    return weaklySerie;
}

export function getTrackMapActiveUrl(trackId: number, tracksData = getSourceData().tracksData): string | null {

    let actualTrack = tracksData[trackId];
    let trackMapUrl = "";

    if (actualTrack) {
        trackMapUrl = actualTrack.track_map + actualTrack.track_map_layers.active;
    }

    return trackMapUrl;
}

export function isFreeContent(trackId: number, tracksAllInfo = getSourceData().tracksAllInfo): boolean {

    const track = tracksAllInfo.find(t => t.track_id === trackId);
    return track?.free_with_subscription;
}   

function getSeasonLogo(season, seriesLogos): any {

    let serieId = season.series_id;
    let iracingLink = "https://images-static.iracing.com/img/logos/series/";
    let actualSerie = seriesLogos[serieId];
    
    let logoFilename = "";

    if (actualSerie) {
        logoFilename = iracingLink + actualSerie.logo;
    }
    return logoFilename;
}

function getSeasonFrecuency(season): any {
    return season.schedules?.[0]?.race_time_descriptors?.[0]?.repeat_minutes ?? 0;
}

// Función para preparar la base de datos con nombres e IDs relacionados
export function prepararDB(datos: any[], tracksData, tracksAllInfo, seriesLogos): void {
    // Inicializamos la base de datos
    const db = [];

    datos.forEach((season) => {
        let aux = {};

        aux["id"] = getSeasonID(season);
        aux["seriesId"] = season.series_id;
        aux["nombre"] = getSeasonName(season);
        aux["tipo"] = getSeasonType(season);
        aux["licencia"] = getLicenseGroup(season);
        aux["logo"] = getSeasonLogo(season, seriesLogos);
        aux["frecuency"] = getSeasonFrecuency(season);
        aux["calendario"] = getSeasonSchedule(season, tracksData, tracksAllInfo);
        db.push(aux);
    });

    // console.log(db);

    guardarJSON("src/data/JM_seasonData.json", db);
}

export function prepararTrackDB(datos: any[], tracksData, tracksAllInfo): void {
    // Inicializamos la base de datos
    const db = [];
    const folderMap = {};

    datos.forEach((track) => {
        const folder = track.folder.trim();

        if (!folderMap[folder]) {
            folderMap[folder] = {
                id: track.track_id, // Primer id como principal
                name: track.track_name.replace(/^\[(Legacy|Retired)\]\s*/, ""),
                variantIds: [],
                isFreeTrack: isFreeContent(track.track_id, tracksAllInfo),
                price: track.price || 0,
                track: getTrackMapActiveUrl(track.track_id, tracksData),
                sourceRetired: track.retired || false,
            };
        } else if (folderMap[folder].sourceRetired && !track.retired) {
            // Las variantes heredadas suelen aparecer antes en la API, pero sus
            // mapas pueden dejar de estar disponibles. Preferimos una variante activa.
            folderMap[folder].id = track.track_id;
            folderMap[folder].name = track.track_name.replace(/^(\[Legacy\]|\[Retired\])\s*/, "");
            folderMap[folder].isFreeTrack = isFreeContent(track.track_id, tracksAllInfo);
            folderMap[folder].price = track.price || 0;
            folderMap[folder].track = getTrackMapActiveUrl(track.track_id, tracksData);
            folderMap[folder].sourceRetired = false;
        }
        folderMap[folder].variantIds.push(track.track_id);
    });

    // Convertimos el objeto a array
    for (let key in folderMap) {
        const { sourceRetired, ...trackData } = folderMap[key];
        db.push(trackData);
    }

    guardarJSON("src/data/JM_tracks.json", db);
}

// Función para contar objetos de primer nivel
export function contarObjetos(datos: any[]): number {
    return datos.length;
}

// Función para guardar datos en un archivo JSON
export function test(): void {
    console.log("Preparando base de datos...");
    const { data, tracksData, tracksAllInfo, seriesLogos } = getSourceData();
    prepararDB(data, tracksData, tracksAllInfo, seriesLogos);
    prepararTrackDB(tracksAllInfo, tracksData, tracksAllInfo);
}

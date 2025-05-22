import "dotenv/config";
import pkg from "@iracing-data/sync-track-assets";

const syncTrackAssets = pkg.default || pkg.syncTrackAssets;

(async () => {
    try {
        await syncTrackAssets({
            outputDir: "../assets/tracks", // Directorio donde se guardarán los archivos
            writeFullAssets: true, // Escribe los archivos asset.json
            writeFullInfo: true, // Escribe los archivos info.json
            skipTrackAssets: false, // No omite los assets de las pistas
            skipTrackInfo: false, // No omite la información de las pistas
            username: "juanjomb98@gmail.com",
            force: false, // No fuerza la descarga si los archivos ya existen
        });
    } catch (err) {
        console.error("ERROR DETECTADO:");
        console.error(err);
    }
})();

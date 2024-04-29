const fs = require('fs'); 
const path = require('path');

// Ruta del archivo JSON original y del archivo resumido
const rutaJsonOriginal = path.join(__dirname, './src/data/season_24.json');
const rutaJsonResumen = path.join(__dirname, './src/data/season_24_resumen.json');

// Leer el archivo JSON original
fs.readFile(rutaJsonOriginal, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON original:', err);
    return;
  }

  try {
    // Parsear el JSON
    const datos = JSON.parse(data);

    // Filtrar los campos seleccionados
    const datosFiltrados = datos.map(({ season_id, season_name, license_group, car_class_ids, schedules }) => ({
        season_id,
        season_name,
        license_group,
        car_class_ids,
        schedules: schedules.map(({ race_week_num, race_time_descriptors, series_name, track }) => ({
             race_week_num, 
             race_time_descriptors: race_time_descriptors.map(({ start_date }) => ({start_date})),
             series_name,
             track_id: track.track_id,
             track_name:track.track_name

            }))
      }));

    // Convertir los datos filtrados a JSON
    const jsonFiltrado = JSON.stringify(datosFiltrados, null, 2);

    // Escribir el JSON filtrado en el archivo resumen
    fs.writeFile(rutaJsonResumen, jsonFiltrado, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir el archivo JSON resumen:', err);
        return;
      }
      console.log('El archivo JSON resumen ha sido guardado con éxito.');
    });
  } catch (error) {
    console.error('Error al procesar el JSON:', error);
  }
});

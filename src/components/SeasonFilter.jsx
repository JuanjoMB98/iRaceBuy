import { useState } from "react";

export default function SeasonFilter({ seasonList = [], onChange, licenciaId}) {
    const [activeSeasons, setActiveSeasons] = useState([]);

    const toggleSeason = (id) => {
        const updated = activeSeasons.includes(id)
            ? activeSeasons.filter((s) => s !== id)
            : [...activeSeasons, id];

        setActiveSeasons(updated);

        // Llama a la función que el padre pasó
        if (onChange) {
            onChange(updated);
        }
    };
    return (
        <div>
            <h3>Filtrar por temporada</h3>
            <ul>
                {seasonList
                    .filter(season => season.licencia === licenciaId)
                    .map((season) => (
                    <li key={season.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={activeSeasons.includes(season.id)}
                                onChange={() => toggleSeason(season.id)}
                            />
                            {season.nombre}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import "./RecomendedTracks.css";

import React, { useState } from "react";
import { toggleCollapse } from "./RecomendedTracks.js";


export default function RaceTable({ filteredSeasons }) {

    const [collapsed, setCollapsed] = useState(false);

    const trackMap = new Map();
    // Recorremos todos los campeonatos
    for (const trofeo of filteredSeasons) {
        for (const week of trofeo.calendario) {
            const nombreCircuito = week.track;
            const idTrack = week.track_id;
            const mapUrl = week.mapUrl;

            if (trackMap.has(nombreCircuito)) {
                trackMap.get(nombreCircuito).timesThisSeason += 1;
            } else {
                trackMap.set(nombreCircuito, {
                    track: nombreCircuito,
                    track_id: idTrack,
                    timesThisSeason: 1,
                    mapUrl: mapUrl,
                });
            }
        }
    }
    const topTracks = Array.from(trackMap.values())
        .sort((a, b) => b.timesThisSeason - a.timesThisSeason)
        .slice(0, 8); // Top 5

    const handleToggle = () => {
        setCollapsed(toggleCollapse);
    };

    return (
        <section
            className={`o-recomendedTracks -bentoContainer js-recomendedTracks ${
                collapsed ? " -collapsed" : ""
            }`}
        >
            <div className="m-bentoContainer__header">
                <button onClick={handleToggle}>Ocultar</button>
                <h2 className="m-bentoContainerHeader__title">
                    💵 Recomended buy
                </h2>
                <span className="m-bentoContainerHeader__subtitle">
                    These are the circuits with the most competition this season
                    in the categories with the most current participation.
                </span>
            </div>

            <hr className="a-separator" />

            <ul className="m-featuredTracks">
                {/* <!-- hacer un bucle por el mayor numero de semanas 
                    que tengan la seasons seleccionadas y imprimir "week 1" , Week 2 --> */}
                {topTracks.map((item) => (
                    <li
                        key={item.track_id}
                        className="m-featuredTrack__item"
                        data-trackid={item.track_id}
                    >
                        <div className="a-featuredTrack__map">
                            <object
                                type="image/svg+xml"
                                data={item.mapUrl}
                                alt={item.track}
                            />
                        </div>
                        <span className="m-featuredTrack__times">
                            {item.timesThisSeason}
                        </span>
                        <span className="m-featuredTrack__title">
                            {item.track}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

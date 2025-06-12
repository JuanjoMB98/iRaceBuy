import "./RecomendedTracks.css";

import Icon from "../Icon.astro";
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
                    isFreeTrack: week.isFreeTrack || false,
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
                <h2 className="m-bentoContainerHeader__title">
                    <button onClick={handleToggle} className="a-button">
                        <svg
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.22355 4.66667V9.33333L10.5569 7L8.22355 4.66667ZM3.84855 12.25C3.52772 12.25 3.25316 12.1359 3.02488 11.9076C2.79661 11.6793 2.68227 11.4046 2.68188 11.0833V2.91667C2.68188 2.59583 2.79622 2.32128 3.02488 2.093C3.25355 1.86472 3.52811 1.75039 3.84855 1.75H12.0152C12.3361 1.75 12.6108 1.86433 12.8395 2.093C13.0681 2.32167 13.1823 2.59622 13.1819 2.91667V11.0833C13.1819 11.4042 13.0677 11.6789 12.8395 11.9076C12.6112 12.1362 12.3364 12.2504 12.0152 12.25H3.84855ZM5.59855 11.0833V2.91667H3.84855V11.0833H5.59855ZM6.76522 11.0833H12.0152V2.91667H6.76522V11.0833Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    Recomended buy
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
                        data-isfreetrack={item.isFreeTrack}
                    >
                        <div className="a-featuredTrack__map">
                            <img
                                type="image/svg+xml"
                                src={item.mapUrl}
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

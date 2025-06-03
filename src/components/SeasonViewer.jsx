import { useState, useEffect } from "react";
import SeasonFilter from "./SeasonFilter";
import CategoryPill from '/src/components/CategoryPill/CategoryPill.jsx';


export default function SeasonViewerWrapper({
    seasonList,
    allSeasonData,
    licenciaId,
    defaultSelectedIds = [], // Ahora es una prop
}) {
    const [activeSeasonIds, setActiveSeasonIds] = useState(defaultSelectedIds);

    useEffect(() => {
        setActiveSeasonIds(defaultSelectedIds);
    }, [JSON.stringify(defaultSelectedIds)]);

    // Renderizar SeasonFilter solo en cliente para evitar errores de hidratación
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const filteredSeasons =
        activeSeasonIds.length === 0
            ? []
            : allSeasonData.filter((s) => activeSeasonIds.includes(s.id));

    const maxRaceWeek = filteredSeasons.reduce(
        (max, s) => Math.max(max, s.calendario.length),
        0
    );

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

    return (
        <>

        

        <CategoryPill licenseID={licenciaId} />


            {isClient && (
                <SeasonFilter
                    seasonList={seasonList}
                    onChange={setActiveSeasonIds}
                    licenciaId={licenciaId}
                    selectedIds={activeSeasonIds} // CONTROLADO
                />
            )}

            <div>


            <section className="box skills o-licenseBox">
                <div className="m-boxHeader">
                    <div className="a-classPill">
                        <span>week</span>
                    </div>

                    <div className="m-weeksContainer">
                        {Array.from({ length: maxRaceWeek }).map((_, i) => (
                            <div className="m-weekItem" key={i}>
                                <span>Semana {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="m-boxContainer">
                    {filteredSeasons.map((trofeo) => (
                        <div className="m-seasonContainer" key={trofeo.id}>
                            <div className="m-season__info">
                                <img
                                    className="m-season__logo"
                                    src={trofeo.logo}
                                    alt=""
                                />
                                <span className="m-season__name">
                                    {trofeo.nombre}
                                </span>
                            </div>

                            {trofeo.calendario.map((week, i) => (
                                <div className="m-season__track" key={i}>
                                    <div
                                        className="m-seasonTrack__item"
                                        data-trackid={week.track_id}
                                    >
                                        <span className="m-seasonTrackItem__title">
                                            {week.track}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="m-mostUsedTracks">
                <h2>Recomended buy</h2>
                <p>
                    Estos son los circuitos que más se juegan esta temporada en
                    las categorías con más participación actual
                </p>
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
            </div>

        </>
    );
}

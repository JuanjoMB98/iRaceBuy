import "./CalendarViewer.css";

import { useState, useEffect } from "react";
import CalendarFilter from "@planner/CalendarFilter/CalendarFilter.jsx";
import CalendarTable from "@planner/CalendarTable/CalendarTable.jsx";

export default function CalendarViewer({
    allSeasonData,
    licenciaId,
    defaultSelectedSeriesIds = [],
    lang,
}) {
    const seasonList = allSeasonData.map(
        ({ id, nombre, licencia, tipo, logo, frecuency }) => ({
            id,
            nombre,
            licencia,
            tipo,
            logo,
            frecuency
        })
    );

    const defaultSelectedIds = allSeasonData
        .filter((season) => defaultSelectedSeriesIds.includes(season.seriesId))
        .map((season) => season.id);
    const currentSeasonLabel =
        allSeasonData
            .find((season) => defaultSelectedSeriesIds.includes(season.seriesId))
            ?.nombre.match(/\d{4} Season \d/)?.[0] ?? "current";
    const defaultsVersionKey = "calendarDefaultsVersion";

    // Estado controlado y persistente en localStorage
    const [calendarSeasonIds, setActiveSeasonIds] = useState(() => {
        if (typeof window !== "undefined") {
            const defaultsVersion = localStorage.getItem(defaultsVersionKey);

            // Al llegar una temporada nueva, sustituimos los IDs anteriores
            // (incluida una selección vacía guardada antes de tener defaults).
            if (defaultsVersion !== currentSeasonLabel) {
                localStorage.setItem(defaultsVersionKey, currentSeasonLabel);
                return defaultSelectedIds;
            }

            const stored = localStorage.getItem("calendarSeasonIds");
            if (stored) {
                const storedIds = JSON.parse(stored);
                const hasCurrentSeason = storedIds.some((id) =>
                    allSeasonData.some((season) => season.id === id)
                );

                if (storedIds.length === 0 || hasCurrentSeason) return storedIds;
            }
        }
        return defaultSelectedIds;
    });

    // Sincroniza con localStorage cuando cambia
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                "calendarSeasonIds",
                JSON.stringify(calendarSeasonIds)
            );
        }
    }, [calendarSeasonIds]);

    // Renderizar SeasonFilter solo en cliente para evitar errores de hidratación
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const filteredSeasons =
        calendarSeasonIds.length === 0
            ? []
            : allSeasonData.filter((s) => calendarSeasonIds.includes(s.id));

    return (
        <>
            <section className="m-seasonContainer">
                <div className="m-seasonContainer__header">
                    {isClient && (
                        <CalendarFilter
                            lang={lang}
                            seasonList={seasonList}
                            onChange={setActiveSeasonIds}
                            licenciaId={licenciaId}
                            selectedIds={calendarSeasonIds} // CONTROLADO
                        />
                    )}
                </div>

                <div className="m-seasonContainer__content">
                    {isClient ? (
                        <CalendarTable
                            lang={lang}
                            filteredSeasons={filteredSeasons}
                        />
                    ) : (
                        <div className="o-calendarTable -bentoContainer" /> // placeholder con misma estructura
                    )}
                </div>
            </section>
        </>
    );
}

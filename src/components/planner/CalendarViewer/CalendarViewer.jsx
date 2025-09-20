import "./CalendarViewer.css";

import { useState, useEffect } from "react";
import CalendarFilter from "@planner/CalendarFilter/CalendarFilter.jsx";
import CalendarTable from "@planner/CalendarTable/CalendarTable.jsx";

export default function CalendarViewer({
    allSeasonData,
    licenciaId,
    defaultSelectedIds = [], // Ahora es una prop,
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

    // Estado controlado y persistente en localStorage
    const [calendarSeasonIds, setActiveSeasonIds] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("calendarSeasonIds");
            if (stored) return JSON.parse(stored);
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

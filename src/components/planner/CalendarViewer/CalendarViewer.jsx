import "./CalendarViewer.css";

import { useState, useEffect } from "react";
import CalendarFilter from "@planner/CalendarFilter/CalendarFilter.jsx";
import CalendarTable from "@planner/CalendarTable/CalendarTable.jsx";

export default function CalendarViewerWrapper({
    allSeasonData,
    licenciaId,
    defaultSelectedIds = [], // Ahora es una prop,
    lang,
}) {
    const seasonList = allSeasonData.map(
        ({ id, nombre, licencia, tipo, logo }) => ({
            id,
            nombre,
            licencia,
            tipo,
            logo,
        })
    );

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
                            selectedIds={activeSeasonIds} // CONTROLADO
                        />
                    )}
                </div>

                <div className="m-seasonContainer__content">
                    <CalendarTable lang={lang} filteredSeasons={filteredSeasons} />
                </div>
            </section>
        </>
    );
}

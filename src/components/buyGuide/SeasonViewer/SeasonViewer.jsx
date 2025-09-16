import "./SeasonViewer.css";

import { useState, useEffect } from "react";
import CategoryPill from "@components/CategoryPill/CategoryPill.jsx";
import SeasonFilter from "@buyGuide/SeasonFilter/SeasonFilter.jsx";
import RaceTable from "@buyGuide/RaceTable/RaceTable.jsx";
import RecomendedTracks from "@buyGuide/RecomendedTracks/RecomendedTracks.jsx";

export default function SeasonViewerWrapper({
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
                    <CategoryPill lang={lang} licenseID={licenciaId} />

                    {isClient && (
                        <SeasonFilter
                            lang={lang}
                            seasonList={seasonList}
                            onChange={setActiveSeasonIds}
                            licenciaId={licenciaId}
                            selectedIds={activeSeasonIds} // CONTROLADO
                        />
                        
                    )}
                </div>

                <div className="m-seasonContainer__content">
                    <RaceTable lang={lang} filteredSeasons={filteredSeasons} />

                    <RecomendedTracks
                        lang={lang}
                        filteredSeasons={filteredSeasons}
                    />
                </div>
            </section>
        </>
    );
}

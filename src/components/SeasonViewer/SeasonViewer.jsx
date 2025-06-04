import "./SeasonViewer.css";

import { useState, useEffect } from "react";
import CategoryPill from "../CategoryPill/CategoryPill.jsx";
import SeasonFilter from "../SeasonFilter/SeasonFilter.jsx";
import RaceTable from "../RaceTable/RaceTable.jsx";
import RecomendedTracks from "../RecomendedTracks/RecomendedTracks.jsx";

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

    return (
        <>
            <div className="m-seasonContainer">
                <div className="m-seasonContainer__header">
                    <CategoryPill licenseID={licenciaId} />

                    {isClient && (
                        <SeasonFilter
                            seasonList={seasonList}
                            onChange={setActiveSeasonIds}
                            licenciaId={licenciaId}
                            selectedIds={activeSeasonIds} // CONTROLADO
                        />
                    )}
                </div>

                <div className="m-seasonContainer__content">
                    <RaceTable filteredSeasons={filteredSeasons} />

                    <RecomendedTracks filteredSeasons={filteredSeasons} />
                </div>
            </div>
        </>
    );
}

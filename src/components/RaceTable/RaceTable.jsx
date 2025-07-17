import "./RaceTable.css";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "../../locales/utils";

export default function RaceTable({ filteredSeasons, lang }) {
    const t = useTranslations(lang);

    // Estado para los IDs de variantes del usuario
    const [ownedTrackIds, setOwnedTrackIds] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOwnedTrackIds(
                JSON.parse(localStorage.getItem("ownedTracks") || "[]")
            );
        }
    }, []);

    const maxRaceWeek = filteredSeasons.reduce(
        (max, s) => Math.max(max, s.calendario.length),
        0
    );

    // Ref y lógica para scroll arrastrando
    const scrollRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        scrollRef.current.classList.add("is-dragging");
    };
    const handleMouseLeave = () => {
        setIsDown(false);
        scrollRef.current.classList.remove("is-dragging");
    };
    const handleMouseUp = () => {
        setIsDown(false);
        scrollRef.current.classList.remove("is-dragging");
    };
    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // velocidad
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="o-raceTable -bentoContainer">
            <div className="m-bentoContainer__header">
                <h3 className="m-bentoContainerHeader__title">
                    {t("raceTable.title")}
                </h3>
                <p className="m-bentoContainerHeader__subtitle">
                    {t("raceTable.description")}
                </p>
            </div>

            <hr className="a-separator" />

            <div className="m-raceTable__container">
                <div className="m-boxHeader">
                    <div className="a-classPill">
                        <span>Week</span>
                    </div>

                    <div className="m-weeksContainer">
                        {Array.from({ length: maxRaceWeek }).map((_, i) => (
                            <div className="m-weekItem" key={i}>
                                <span>{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="m-boxContainer"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: isDown ? "grabbing" : "grab",
                        overflowX: "auto",
                    }}
                >
                    {filteredSeasons.map((trofeo) => (
                        <div className="m-raceTable__item" key={trofeo.id}>
                            <div className="m-season__info">
                                <img
                                    className="m-season__logo"
                                    src={trofeo.logo}
                                    alt=""
                                    draggable="false"
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
                                        data-isfreetrack={week.isFreeTrack}
                                        data-owned={ownedTrackIds.includes(
                                            week.track_id
                                        )}
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
            </div>
        </section>
    );
}

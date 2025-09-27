import "./RecomendedTracks.css";

import Icon from "@components/Icon.astro";
import React, { useState } from "react";
import { toggleCollapse } from "./RecomendedTracks.js";
import { useTranslations } from "@locales/utils.js";

export default function RaceTable({ filteredSeasons, lang }) {
    const t = useTranslations(lang);

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
        <aside
            className={`o-recomendedTracks -bentoContainer js-recomendedTracks ${
                collapsed ? " -collapsed" : ""
            }`}
        >
            <div className="m-bentoContainer__header">
                <button
                    onClick={handleToggle}
                    className="a-button -purple -small"
                    aria-label="Compress Recomended Tracks"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_186_5122)">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.8184 5.625C21.8184 5.32663 21.9369 5.04048 22.1479 4.8295C22.3588 4.61853 22.645 4.5 22.9434 4.5C23.2417 4.5 23.5279 4.61853 23.7389 4.8295C23.9498 5.04048 24.0684 5.32663 24.0684 5.625V18.375C24.0684 18.6734 23.9498 18.9595 23.7389 19.1705C23.5279 19.3815 23.2417 19.5 22.9434 19.5C22.645 19.5 22.3588 19.3815 22.1479 19.1705C21.9369 18.9595 21.8184 18.6734 21.8184 18.375V5.625ZM12.3069 6.33C12.0962 6.54094 11.9778 6.82687 11.9778 7.125C11.9778 7.42313 12.0962 7.70906 12.3069 7.92L15.2619 10.875H1.19336C0.894991 10.875 0.608843 10.9935 0.397864 11.2045C0.186886 11.4155 0.0683594 11.7016 0.0683594 12C0.0683594 12.2984 0.186886 12.5845 0.397864 12.7955C0.608843 13.0065 0.894991 13.125 1.19336 13.125H15.2619L12.3069 16.08C12.1963 16.183 12.1077 16.3072 12.0462 16.4452C11.9847 16.5832 11.9516 16.7322 11.949 16.8832C11.9463 17.0343 11.9741 17.1843 12.0307 17.3244C12.0873 17.4645 12.1715 17.5917 12.2783 17.6986C12.3851 17.8054 12.5124 17.8896 12.6525 17.9462C12.7925 18.0028 12.9426 18.0306 13.0936 18.0279C13.2447 18.0252 13.3937 17.9922 13.5317 17.9307C13.6697 17.8692 13.7939 17.7805 13.8969 17.67L18.7719 12.795L19.5684 12L18.7734 11.205L13.8984 6.33C13.7939 6.22546 13.6698 6.14253 13.5333 6.08594C13.3968 6.02936 13.2504 6.00024 13.1026 6.00024C12.9548 6.00024 12.8085 6.02936 12.6719 6.08594C12.5354 6.14253 12.4113 6.22546 12.3069 6.33Z"
                                fill="currentColor"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_186_5122">
                                <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0.0683594)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>{t("smallerContainer")}</span>
                </button>
                <h3 className="m-bentoContainerHeader__title">
                    {t("recomendedTracks.title")}
                </h3>
                <p className="m-bentoContainerHeader__subtitle">
                    {t("recomendedTracks.description")}
                </p>
            </div>

            <hr className="a-separator" />

            <ul className="m-featuredTracks">
                {/* <!-- hacer un bucle por el mayor numero de semanas 
                    que tengan la seasons seleccionadas y imprimir "week 1" , Week 2 --> */}
                {topTracks.map((item) => (
                    <li
                        key={item.track_id}
                        className="m-featuredTrack__item js-trackHover"
                        data-trackid={item.track_id}
                        data-isfreetrack={item.isFreeTrack}
                    >
                        <div className="a-featuredTrack__map">
                            <img
                                type="image/svg+xml"
                                src={item.mapUrl}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <span className="m-featuredTrack__times">
                            <strong>{item.timesThisSeason}</strong>
                            <span>{t("times")}</span>
                        </span>
                        <span className="m-featuredTrack__title">
                            {item.track}
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

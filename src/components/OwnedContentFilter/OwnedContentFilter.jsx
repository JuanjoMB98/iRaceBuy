import "./OwnedContentFilter.css";
import { useTranslations } from "../../locales/utils";

import Select, { components } from "react-select";

import { useState, useEffect } from "react";
import tracksFormated from "../../data/tracksFormated.json";
export default function OwnedContentFilter({
    lang,
    selectedIds = [],
    onChange,
}) {
    const t = useTranslations(lang);

    const OptionWithLogo = (props) => (
        <components.Option {...props}>
            <div className="m-optionSelect">
                {props.data.track && (
                    <img
                        type="image/svg+xml"
                        src={props.data.track}
                        alt=""
                        loading="lazy"
                    />
                )}
                <span>{props.data.name}</span>
            </div>
        </components.Option>
    );
    const MultiValueWithLogo = (props) => (
        <components.MultiValue {...props}>
            <div className="m-multiValueItem">
                {props.data.track && (
                    <img
                        type="image/svg+xml"
                        src={props.data.track}
                        alt=""
                        loading="lazy"
                    />
                )}
                <span>{props.data.name}</span>
            </div>
        </components.MultiValue>
    );

    // Aseguramos que las opciones tengan la propiedad 'value' para react-select
    const allOptions = tracksFormated.map((opt) => ({
        ...opt,
        value: opt.id,
        label: opt.name,
    }));

    // Estado interno para los IDs seleccionados
    const [ownedIds, setOwnedIds] = useState(selectedIds);

    // Leer de localStorage al montar (solo cliente)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("ownedTracks");
            if (stored) {
                setOwnedIds(JSON.parse(stored));
            }
        }
    }, []);

    // Guardar en localStorage los variantIds cada vez que cambian los IDs seleccionados
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Obtener todos los variantIds de los circuitos seleccionados
            const selectedTracks = allOptions.filter((opt) =>
                ownedIds.includes(opt.id)
            );
            const allVariantIds = selectedTracks.flatMap(
                (opt) => opt.variantIds || []
            );
            localStorage.setItem("ownedTracks", JSON.stringify(allVariantIds));
        }
        if (onChange) {
            onChange(ownedIds);
        }
    }, [ownedIds, allOptions]);

    // Opciones seleccionadas según estado interno
    const selectedOptions = allOptions.filter((opt) =>
        ownedIds.includes(opt.id)
    );

    const handleChange = (selected) => {
        setOwnedIds((selected || []).map((opt) => opt.id));
        // También guardar los variantIds en el cambio inmediato
        if (typeof window !== "undefined") {
            const allVariantIds = (selected || []).flatMap(
                (opt) => opt.variantIds || []
            );
            localStorage.setItem("ownedTracks", JSON.stringify(allVariantIds));
        }
    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            borderColor: "#ccc",
            minHeight: "38px",
            boxShadow: "none",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            borderRadius: "4px",
            width: "200px",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#1e293b",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#6366f1",
            ":hover": {
                backgroundColor: "#6366f1",
                color: "white",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#6366f1"
                : state.isFocused
                  ? "#e0e7ff"
                  : "white",
            color: state.isSelected ? "white" : "#1e293b",
        }),
    };

    const MenuListWithClass = (props) => (
        <components.MenuList {...props} className="o-menuList" />
    );
    return (
        <>
            <section className="o-filterContainer -bentoContainer">
                <div className="m-bentoContainer__header">
                    <h3 className="m-bentoContainerHeader__title">
                        {t("seasonFilter.title")}
                    </h3>
                    <p className="m-bentoContainerHeader__subtitle">
                        {t("seasonFilter.description")}
                    </p>
                </div>

                <hr className="a-separator" />

                <div className="m-bentoContainer__content">
                    <Select
                        isMulti
                        aria-label="Select series"
                        options={allOptions}
                        value={selectedOptions}
                        onChange={handleChange}
                        placeholder="Select series..."
                        closeMenuOnSelect={false}
                        classNamePrefix="season-select"
                        styles={customStyles}
                        components={{
                            Option: OptionWithLogo,
                            MultiValue: MultiValueWithLogo,
                            MenuList: MenuListWithClass,
                        }}
                    />
                </div>
            </section>
        </>
    );
}

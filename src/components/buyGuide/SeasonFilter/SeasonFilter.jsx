import "./SeasonFilter.css";
import { useTranslations } from "@locales/utils";

import Select, { components } from "react-select";

export default function SeasonFilter({
    seasonList = [],
    onChange,
    licenciaId = [],
    selectedIds = [], // Recibe los seleccionados del padre
    lang,
}) {
    const t = useTranslations(lang);

    const tipoLabels = {
        oval: "Oval",
        dirt_oval: "Dirt Oval",
        dirt_road: "Dirt Road",
        sports_car: "Road",
        formula_car: "Formula",
    };
    const OptionWithLogo = (props) => (
        <components.Option {...props}>
            <div className="m-optionSelect">
                {props.data.logo && (
                    <img src={props.data.logo} alt="" loading="lazy" />
                )}
                <span>{props.data.label}</span>
            </div>
        </components.Option>
    );
    const MultiValueWithLogo = (props) => (
        <components.MultiValue {...props}>
            <div className="m-multiValueItem">
                {props.data.logo && (
                    <img src={props.data.logo} alt="" loading="lazy" />
                )}
                <span>{props.data.label}</span>
            </div>
        </components.MultiValue>
    );
    const groupedOptions = Object.entries(
        seasonList
            .filter((season) =>
                !licenciaId || licenciaId.length === 0
                    ? true
                    : season.licencia === licenciaId
            )
            .reduce((groups, season) => {
                if (!groups[season.tipo]) {
                    groups[season.tipo] = [];
                }
                groups[season.tipo].push({
                    value: season.id,
                    label: season.nombre,
                    logo: season.logo,
                });
                return groups;
            }, {})
    ).map(([tipo, options]) => ({
        label: tipoLabels[tipo] || tipo,
        options,
    }));
    const allOptions = groupedOptions.flatMap((group) => group.options);
    // Opciones seleccionadas según selectedIds
    const selectedOptions = allOptions.filter((opt) =>
        selectedIds.includes(opt.value)
    );
    const handleChange = (selected) => {
        if (onChange) {
            onChange((selected || []).map((opt) => opt.value));
            // console.log("Selected options:", selected.map(opt => opt.value));
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
    const formatGroupLabel = (data) => (
        <div className="m-groupStyles">
            <span className="a-groupStyles__label">{data.label}</span>
            <span className="a-groupBadgeStyles">{data.options.length}</span>
        </div>
    );
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
                        options={groupedOptions}
                        value={selectedOptions}
                        onChange={handleChange}
                        placeholder="Select series..."
                        closeMenuOnSelect={false}
                        classNamePrefix="season-select"
                        formatGroupLabel={formatGroupLabel}
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

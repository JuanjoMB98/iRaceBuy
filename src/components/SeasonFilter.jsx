import { useState } from "react";
import Select from "react-select";

export default function SeasonFilter({
    seasonList = [],
    onChange,
    licenciaId,
}) {
    const options = seasonList
        .filter((season) => season.licencia === licenciaId)
        .map((season) => ({ value: season.id, label: season.nombre }));

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
        if (onChange) {
            onChange((selected || []).map((opt) => opt.value));
        }
    };

    // Estilos personalizados para react-select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#fff", // Cambia según tu tema
            borderColor: "#ccc", // O el color de tu diseño
            minHeight: "38px",
            boxShadow: "none",
            fontSize: "1rem",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#e0e7ff", // Color suave para etiquetas
            color: "#1e293b",
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

    return (
        <div className="season-filter">
            <h3>Filtrar por temporada</h3>
            <Select
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                placeholder="Selecciona temporadas..."
                closeMenuOnSelect={false}
                styles={customStyles}
                classNamePrefix="season-select"
            />
        </div>
    );
}

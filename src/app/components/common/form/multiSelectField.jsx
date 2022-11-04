import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    function handleChange(value) {
        const i = [];
        for (const num of value) {
            const mer = Object.keys(options).find(
                (user) => options[user]._id === num.value
            );
            i.push(options[mer]);
        }
        onChange({ name, value: i });
    }
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MultiSelectField;

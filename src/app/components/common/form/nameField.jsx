import React from "react";
import PropTypes from "prop-types";

const NameField = ({ label, name, value, onChange, error }) => {
    function handleChange({ target }) {
        onChange({ name: target.name, value: target.value });
    }
    function getInputClasses() {
        return "form-control" + (error ? " is-invalid" : "");
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type="text"
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
NameField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default NameField;

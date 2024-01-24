// FormField.js
import React from "react";
const FormField = ({ field, onChange, setFormData, formData }) => {
  const { id, label, type, options, value } = field;
  const handleChange = (e) => {
    setFormData({ ...formData, [label]: e.target.value });
    onChange(String(label), e.target.value);
  };
  const getFormType = (type) => {
    switch (type) {
      case "text":
        return (
          <>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              onChange={handleChange}
              value={formData[label]}
            />
          </>
        );
      case "textarea":
        return (
          <>
            <label htmlFor={id}>{label}</label>
            <textarea id={id} onChange={handleChange} value={formData[label]} />
          </>
        );
      case "dropdown":
        return (
          <>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={handleChange} value={formData[label]}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        );
      case "checkbox":
        return (
          <>
            <label>{label}</label>
            {options.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={`${id}_${option}`}
                  checked={formData[label]===option}
                  onChange={() => {
                    onChange(String(label), option);
                    setFormData({ ...formData, [label]: option });
                  }}
                />
                <label htmlFor={`${id}_${option}`}>{option}</label>
              </div>
            ))}
          </>
        );
      case "radio":
        return (
          <>
            <label>{label}</label>
            {options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={`${id}`}
                  name={option}
                  checked={formData[label]===option}
                  onChange={(e) => {
                    onChange(String(label), option);
                    setFormData({ ...formData, [label]: option });
                  }}
                />
                <label htmlFor={`${id}_${option}`}>{option}</label>
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return <div className="form_field_container">{getFormType(type)}</div>;
};

export default FormField;

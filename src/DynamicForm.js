// DynamicForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
const fieldType = ["text", "textarea", "dropdown", "radio", "checkbox"];
const DynamicForm = () => {
  const { handleSubmit, setValue, formState: { errors } } = useForm();
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState([]);
  const addFormField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `Field ${formFields?.length + 1}`,
      options:
        type === "dropdown" || type === "checkbox" || type === "radio"
          ? ["Option 1", "Option 2", "Option 3"]
          : undefined,
    };
    setFormFields([...formFields, newField]);
  };
  const removeFormField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const saveFormConfig = () => {
    const formConfig = JSON.stringify(
      formFields?.map((ele) => {
        return {
          ...ele,
          value: formData[ele.label],
        };
      })
    );
    alert("Form data is saved in localStorage");
    localStorage.setItem("formData", formConfig);
  };


  const loadFormConfig = () => {
    const loadedConfig = localStorage.getItem("formData");
    const parsedConfig = JSON.parse(loadedConfig);
    let formObj={};
    parsedConfig?.forEach((ele)=>{
      formObj[ele.label]=ele.value
    })
    setFormFields(parsedConfig);
    setFormData(formObj)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields?.map((field) => (
        <div key={field.id} className="form_field_container form_margin">
          <FormField
            field={field}
            onChange={(fieldId, value) => setValue(fieldId, value,{
              shouldValidate:true
            })}
            formData={formData}
            setFormData={setFormData}
          />
          <button type="button" onClick={() => removeFormField(field.id)}>
            Remove
          </button>
        </div>
      ))}
      <div className="field_container">
        <label className="field_label">Add Field:</label>
        {fieldType?.map((ele) => (
          <button type="button" onClick={() => addFormField(ele)}>
            {ele.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="field_container">
        <button type="submit">Submit</button>
        <button type="button" onClick={saveFormConfig}>
          Save Configuration
        </button>
        <button type="button" onClick={loadFormConfig}>
          Load Configuration
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;

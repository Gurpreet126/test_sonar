import { ethnicities, ethnicities as options } from "Pages/userScreen/data";
import { Checkbox } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const IsEthncityEnable = ({ values, handleChange, field }) => {
  const isIbeor_v2 = process.env.REACT_APP_BASEURL;
  return (
    <div>
      {isIbeor_v2?.includes("official") && (
        <div className="field-wrapper">
          <label className="subheading" htmlFor="ethnicity">
            Ethnicities
          </label>
          <div>
            <CheckboxGroup
              style={{ flexDirection: "column" }}
              options={ethnicities}
              name="ethnicity"
              defaultValue={values?.ethnicity}
              {...field}
              onChange={(value) => {
                let valueDetail = field.onChange({
                  target: { name: field.name, value: value },
                });
                handleChange(valueDetail);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CheckboxGroup = ({ options, name, defaultValue, onChange, ...rest }) => {
  const [state, setState] = useState(defaultValue);
  const handleChange = (checkedValues) => {
    let newe1 = [...checkedValues];
    if (checkedValues) setState(newe1);
    onChange(checkedValues);
  };
  return (
    <div>
      <Checkbox.Group
        {...rest}
        name={name}
        defaultValue={defaultValue}
        style={{ flexDirection: "column" }}
        options={options}
        value={state}
        onChange={handleChange}
      />
    </div>
  );
};

IsEthncityEnable.propTypes = {
  values: PropTypes.any,
  handleChange: PropTypes.func,
  field: PropTypes.any,
};
CheckboxGroup.propTypes = {
  options: PropTypes.any,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

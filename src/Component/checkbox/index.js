import React, { useState } from "react";
import { Checkbox } from "antd";
import PropTypes from "prop-types";

const CheckboxGroup = ({ options, name, defaultValue, onChange, ...rest }) => {
  const [state, setState] = useState(defaultValue);
  const handleChange = (checkedValues) => {
    let newe1 = [...checkedValues];
    if (checkedValues) setState(newe1);
    onChange(checkedValues);
  };
  return (
    <>
      <Checkbox.Group
        {...rest}
        name={name}
        style={{ display: "inline-block" }}
        options={options}
        value={state}
        onChange={handleChange}
      />
    </>
  );
};
export default CheckboxGroup;

CheckboxGroup.propTypes = {
  options: PropTypes.any,
  name: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.any,
};

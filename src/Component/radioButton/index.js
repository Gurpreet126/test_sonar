import React from "react";
import { Radio, Space } from "antd";
import PropTypes from "prop-types";

const RadioGroup = ({ onChange, options, name, value }) => {
  return (
    <Radio.Group onChange={onChange} value={value} name={name}>
      <Space direction="vertical">
        {options.length &&
          options.map((option, index) => (
            <Radio key={index} value={option.value}>
              <div className="radio-label">{option.label}</div>
            </Radio>
          ))}
      </Space>
    </Radio.Group>
  );
};
export default RadioGroup;

RadioGroup.propTypes = {
  onChange: PropTypes.any,
  options: PropTypes.any,
  name: PropTypes.any,
  value: PropTypes.any,
};

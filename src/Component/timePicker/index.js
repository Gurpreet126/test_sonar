import React, { useState } from "react";
import { TimePicker } from "antd";
import PropTypes from "prop-types";

const TimeSelector = ({ field, form, ...rest }) => {
  const { setFieldValue } = form;
  const { value, name } = field;
  const [data, setData] = useState(value);

  const handleTimer = (time, timestring) => {
    setData(time);
    setFieldValue(name, timestring);
  };

  return <TimePicker {...rest} value={data} form onChange={handleTimer} />;
};

export default TimeSelector;

TimeSelector.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
};

import React from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";

const PaginationFooter = ({ currentpage, onChange, totalCount, pageSize }) => {
  return (
    <div>
      <Pagination
        current={currentpage}
        onChange={onChange}
        total={totalCount}
        showSizeChanger
        defaultPageSize={pageSize}
      />
    </div>
  );
};

PaginationFooter.propTypes = {
  currentpage: PropTypes.any,
  onChange: PropTypes.func,
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
};

export default PaginationFooter;

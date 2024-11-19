import { Pagination } from "antd";
import PropTypes from "prop-types";
import React from "react";

const TablePagination = ({ currentpage, onChange, totalCount, pageSize }) => {
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

export default TablePagination;

TablePagination.propTypes = {
  currentpage: PropTypes.any,
  onChange: PropTypes.any,
  totalCount: PropTypes.any,
  pageSize: PropTypes.any,
};

import { Pagination } from "antd";
import React from "react";

const PaginationFooter = ({ currentpage, onChange, totalCount, pageSize }) => {
  return (
    <Pagination
      current={currentpage}
      onChange={onChange}
      total={totalCount}
      showSizeChanger
      defaultPageSize={pageSize}
    />
  );
};

export default PaginationFooter;

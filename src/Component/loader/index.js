import React from "react"
import {Spin } from 'antd';

const Loader=()=>{
    return(
        <Spin tip="Loading...">
        <div className="content" />
      </Spin>
    )
}
export default Loader
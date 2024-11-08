import { SortAscendingOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { heartlikeinfo } from "Services/Collection";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./AntTable.css";
import {
  HeartLikeButtonMatch,
  HeartLikeButtonview,
  HeartLikeRealusers,
  HeartLikeTitle,
} from "StyledComponents";
import PropTypes from "prop-types";

export default function HeartLikeModal({
  handleCancelHeartLikeModal,
  openHeartLikeModal,
}) {
  const [tableInfo, setTableInfo] = useState();
  const params = useParams();
  const { id } = params;

  const handleGetHeartLikeListing = async () => {
    let res = await heartlikeinfo(id);
    if (res.status === 200) {
      setTableInfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?.userData._id,
          country: ele?.userData.country,
          user: ele?.userData.firstName,
          phone: ele?.userData.phoneNumber,
          isMatch: ele?.isMatch,
        }))
      );
    } else {
      toast.error(
        res?.response?.data?.message ||
          res?.error ||
          res?.message ||
          "Somethin went wrong"
      );
    }
  };

  const columns = [
    {
      title: (
        <HeartLikeTitle>
          COUNTRY
          <SortAscendingOutlined
            style={{
              fontSize: "16px",
              width: "24px",
            }}
          />
        </HeartLikeTitle>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <HeartLikeTitle>
          USER
          <SwapOutlined rotate={90} />
        </HeartLikeTitle>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <HeartLikeTitle>
          PHONE#
          <SwapOutlined rotate={90} />
        </HeartLikeTitle>
      ),
      dataIndex: "phone",
    },
    {
      title: "STATUS",
      key: "match",

      render: () => (
        <Space size="middle">
          <HeartLikeRealusers>Real</HeartLikeRealusers>
        </Space>
      ),
    },
    {
      title: "MATCH",
      key: "action",
      render: () => (
        <Space size="middle">
          <HeartLikeButtonMatch>Unmatch</HeartLikeButtonMatch>
        </Space>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/dashboard/userdetails/${record.id}`} target="_self">
            <HeartLikeButtonview>View</HeartLikeButtonview>
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetHeartLikeListing();
  }, []);

  return (
    <Modal
      open={openHeartLikeModal}
      width="60%"
      onOk={handleCancelHeartLikeModal}
      onCancel={handleCancelHeartLikeModal}
    >
      <div style={{ paddingTop: "25px" }}>
        <Table
          className="recent-users-table"
          scroll={{ x: true, y: 400 }}
          columns={columns}
          dataSource={tableInfo}
          pagination={false}
        />
      </div>
    </Modal>
  );
}

HeartLikeModal.propTypes = {
  handleCancelHeartLikeModal: PropTypes.func,
  openHeartLikeModal: PropTypes.bool,
};

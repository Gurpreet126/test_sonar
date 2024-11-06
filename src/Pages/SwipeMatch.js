import { SortAscendingOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Space, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { matchUser, userSwipeMatchinfo } from "Services/Collection";
import styled from "styled-components";
import { Tabledata, Viewbtn } from "./Stylepage";
import { LoaderWrapper } from "Styles/Globalstyle";
import PropTypes from "prop-types";

export default function SwipeMatch({ user_id, onCancel }) {
  const [tableinfo, settableinfo] = useState();
  const [matchid, setmatchid] = useState();
  const [matchUserName, setmatchUserName] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatch, setisMatch] = useState();
  const showModal = (data) => {
    setisMatch(data.isMatch);
    setIsModalOpen(true);
    setmatchid(data.id);
    setmatchUserName(data.user);
  };
  const [loading, setLoading] = useState(true);
  const [loadingMatch, setLoadingMatch] = useState(false);

  const handleOk = async () => {
    setLoadingMatch(true);
    let req = {
      receiverId: user_id,
      isLike: true,
      isAdmin: true,
      _id: matchid,
      type: isMatch ? 2 : 1,
      isPrivateMessage: false,
    };
    let res = await matchUser(req);

    if (res.status === 200 || res.status === 205) {
      setIsModalOpen(false);
      toast.success(res.message);
      setLoadingMatch(false);
      onCancel();
      window.location.reload();
    } else {
      setLoadingMatch(false);
      setIsModalOpen(false);
      onCancel();
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    {
      title: (
        <Title>
          COUNTRY
          <SortAscendingOutlined
            style={{
              fontSize: "16px",
              width: "24px",
            }}
          />
        </Title>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <Title>
          USER
          <SwapOutlined rotate={90} />
        </Title>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <Title>
          PHONE#
          <SwapOutlined rotate={90} />
        </Title>
      ),
      dataIndex: "phone",
    },
    {
      title: "STATUS",
      key: "match",

      render: (_, data) => (
        <Space size="middle">
          {data.admin === true ? (
            <Fakeuser>Fake</Fakeuser>
          ) : (
            <Realusers>Real</Realusers>
          )}
        </Space>
      ),
    },
    {
      title: "MATCH",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          {data?.admin ? (
            data.isMatch === false ? (
              <ButtonMatch onClick={() => showModal(data)}>Match</ButtonMatch>
            ) : (
              <ButtonMatch onClick={() => showModal(data)}>Unmatch</ButtonMatch>
            )
          ) : null}
        </Space>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/dashboard/userdetails/${record.id}`} target="_self">
            <Buttonview>View</Buttonview>
          </a>
        </Space>
      ),
    },
  ];

  const getAllData = async () => {
    let res = await userSwipeMatchinfo(user_id);
    if (res.status === 200) {
      settableinfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?.userData[0]._id,
          country: ele?.userData[0].country,
          user: ele?.userData[0].firstName,
          phone: ele?.userData[0].phoneNumber,
          admin: ele?.userData[0].createdByAdmin,
          isMatch: ele?.isMatch,
          isDislike: ele?.isDislike,
        }))
      );
      setLoading(false);
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <Tabledata>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okText="Yes"
        onCancel={handleCancel}
      >
        {loadingMatch ? (
          <LoaderWrapperforMatch>
            <Spin size="60" />
          </LoaderWrapperforMatch>
        ) : (
          <p style={{ color: "white" }}>
            {" "}
            Do You want {isMatch ? "unmatch" : "match"} with {matchUserName}
          </p>
        )}
      </Modal>
      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Table
          className="recent-users-table"
          scroll={{ x: true, y: 400 }}
          columns={columns}
          dataSource={tableinfo}
          pagination={false}
        />
      )}
    </Tabledata>
  );
}

SwipeMatch.propTypes = {
  user_id: PropTypes.any,
  onCancel: PropTypes.func,
};

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const ButtonMatch = styled(Viewbtn)`
  background: #f6ca16;
  color: black;
  font-weight: bold;
  cursor: pointer;
`;
const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;
const Fakeuser = styled(Viewbtn)`
  background: red;
`;
const Realusers = styled(Viewbtn)`
  background: green;
`;
const LoaderWrapperforMatch = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  height: 30px;
`;

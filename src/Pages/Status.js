import React, { useEffect, useState } from "react";
import {
  Mainheading,
  Mainwrapper,
  Viewbtn,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import { RightOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Table, Space, Pagination, Spin } from "antd";
import { toast } from "react-toastify";
import { getDailyOnlineStatus } from "../Services/Collection";
import { LoaderWrapper } from "Styles/Globalstyle";

export default function Status() {
  const [userListing, setUserListing] = useState([]);
  const [selectedValue, setSelectedValue] = useState(24);
  const [loading, setLoading] = useState(false);
  const [totalusers, settotalusers] = useState();
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(25);
  const [totalcount, settotalcount] = useState();
  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "User",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "PHONE#",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "STATUS",
      key: "action",
      render: () => (
        <Space size="middle">
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PLATFORM",
      dataIndex: "deviceType",
      key: "Platform",
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "GENDER",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/dashboard/userdetails/${record._id}`} target="_self">
            <Buttonview>View</Buttonview>
          </a>
        </Space>
      ),
    },
  ];

  const manupilatedata = (data) => {
    if (data) {
      let newArray = [];
      data?.map((ele) => {
        let createNewObject = {
          _id: ele?._id,
          phoneNumber: ele?.phoneNumber,
          firstName: ele?.firstName,
          photos: ele?.photos,
          deviceType: ele?.deviceType,
          createdByAdmin: ele?.createdByAdmin,
          blockedByAdmin: ele?.blockedByAdmin,
          country: ele?.country,
          email: ele?.email,
          country_1: ele?.country_1,
          gender: ele?.gender === 0 ? "Male" : "Female",
        };
        newArray.push(createNewObject);
      });
      setUserListing(newArray);
      setLoading(false);
    }
  };
  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  const getDailyOnlineStatusUserListing = async () => {
    setLoading(true);
    let req = {
      online_status_time: selectedValue,
      pageNumber: currentpage,
      perPage: pagesize,
    };
    let res = await getDailyOnlineStatus(req);
    if (res.status === 200) {
      manupilatedata(res.data);
      settotalusers(res.extraData);
      settotalcount(res.extraData);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong",
        { theme: "colored" }
      );
    }
  };

  useEffect(() => {
    getDailyOnlineStatusUserListing();
  }, [selectedValue, currentpage, pagesize]);

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Daily Online Status</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Daily Online Status</span>
          </p>
        </div>
      </Mainheading>
      <Activeview>
        <div className="select-options">
          <select
            name="status"
            id="status"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="1" hidden>
              select
            </option>
            <option value="1">Recently active users</option>
            <option value="5">5 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">60 Minutes</option>
            <option selected value="24">
              Last 24 hours
            </option>
          </select>
        </div>
        <div className="user-info">
          <div>
            <h3>{totalusers}</h3>
            <p>ONLINE USERS</p>
          </div>
          <div>
            <UsergroupAddOutlined />
          </div>
        </div>
      </Activeview>
      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Tabledata>
          <Table
            className="recent-users-table"
            scroll={{ x: true }}
            columns={columns}
            dataSource={userListing}
            pagination={false}
            footer={() => (
              <Pagination
                current={currentpage}
                onChange={onChange}
                total={totalcount}
                showSizeChanger
                defaultPageSize={pagesize}
              />
            )}
            title={() => <Tableheader />}
          />
        </Tabledata>
      )}{" "}
    </Mainwrapper>
  );
}

const Activeview = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  padding: 15px 15px;
  .select-options {
    width: 50%;

    select {
      background-color: #212121;
      color: white;
      width: 100%;
      height: 40px;
      padding: 10px;
    }
  }
  .user-info {
    display: flex;
    width: 50%;
    height: 100px;
    color: white;
    background: #01c853;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    p {
      font-size: 12px;
      padding: 8px 0px;
      font-weight: 600;
    }
    .anticon {
      font-size: 50px;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 5px;
    .select-options,
    .user-info {
      width: 100%;
      height: 70px;
    }
  }
`;
const Tableheader = styled.div`
  padding: 40px;
`;

const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;
const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;

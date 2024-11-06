import {
  RightOutlined,
  SortAscendingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  DashboardLink,
  Mainheading,
  Mainwrapper,
  Tabledata,
  Viewbtn,
} from "./Stylepage";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Pagination, Space, Spin, Table } from "antd";
import { getAllMessagerListing, searchMatch } from "Services/Collection";
import { toast } from "react-toastify";
import { LoaderWrapper } from "Styles/Globalstyle";
import moment from "moment";

export default function Messanger() {
  const [tableinfo, settableinfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(25);
  const [searchtext, setsearchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [totaluser, settotaluser] = useState();
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  let timeoutId;
  useEffect(() => {
    if (searchtext !== "") timeoutId = setTimeout(() => handleSearch(), 500);
    else messagerListing();
    return () => clearTimeout(timeoutId);
  }, [searchtext]);

  const handleSearch = async () => {
    let queryParameters = new URLSearchParams();
    queryParameters.append("pageNumber", currentpage);
    queryParameters.append("perPage", pagesize);
    queryParameters.append("search", searchtext);
    queryParameters.append("type", selectedTab);
    setLoading(true);
    let res = await searchMatch(queryParameters);
    if (res.status === 200) {
      manupilateData(res.data);
      settotaluser(res.extraData?.count);
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  const Searchtable = async (e) => {
    setsearchtext(e.target.value);
  };

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
      key: "action",
      render: () => (
        <Space size="middle">
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },

    {
      title: "MESSAGE",
      key: "message",
      render: (_, record) => (
        <Space size="middle">
          <TableMessageButton
            onClick={() =>
              navigate(`/dashboard/messanger/chat/${record.id}`, {
                state: record,
              })
            }
          >
            Chat
          </TableMessageButton>
        </Space>
      ),
    },

    {
      title: "ACCOUNT TYPE",
      key: "accountType",
      render: (_, record) => (
        <Space size="middle">
          {record?.accountType ? (
            <TableRealFakeUser style={{ background: "red" }}>
              Fake
            </TableRealFakeUser>
          ) : (
            <TableRealFakeUser style={{ background: "green" }}>
              Real
            </TableRealFakeUser>
          )}
        </Space>
      ),
    },

    {
      title: "DATE",
      dataIndex: "date",
    },
    {
      title: "TIME",
      dataIndex: "time",
    },
    {
      title: "PLATFORM",
      dataIndex: "platform",
    },
    {
      title: "GENDER",
      dataIndex: "gender",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/dashboard/userdetails/${record.id}`}
            state={{ showButton: true, userid: record?.id }}
          >
            <Buttonview>View</Buttonview>
          </Link>
        </Space>
      ),
    },
  ];

  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };

  const getTime = (time) => {
    let newTime = moment(time).format("HH:mm");
    return newTime;
  };

  const parseData = (data) => {
    if (Array.isArray(data)) {
      let response = data?.map((item, index) => ({
        key: index + 1,
        id: item?._id,
        country: item?.country === "" ? "N/A" : item?.country,
        user: item?.firstName,
        email: item?.email,
        phone: item?.phoneNumber === "" ? "N/A" : item?.phoneNumber,
        date: getDate(item?.matchDate),
        time: getTime(item?.matchDate),
        accountType: item?.createdByAdmin,
        platform: item?.deviceType,
        gender: item?.gender === 0 ? "Male" : "Female",
      }));
      return response;
    } else return {};
  };

  const manupilateData = async (payload) => {
    let response = await parseData(payload);
    settableinfo(response);
  };

  const messagerListing = async () => {
    setLoading(true);
    let queryParameters = new URLSearchParams();
    queryParameters.append("pageNumber", currentpage);
    queryParameters.append("perPage", pagesize);
    queryParameters.append("type", selectedTab);

    let res = await getAllMessagerListing(queryParameters);
    if (res.status === 200) {
      let response = await parseData(res.data);
      settableinfo(response);
      settotaluser(res.extraData?.count);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const SeleteDTabHeading = () => {
    if (selectedTab === 2) {
      return <div>Real User Listing</div>;
    } else if (selectedTab === 3) {
      return <div>Fake User Listing</div>;
    } else {
      return <div>All Matched User Listing</div>;
    }
  };

  useEffect(() => {
    if (searchtext) {
      handleSearch();
    } else {
      messagerListing();
    }
  }, [pagesize, currentpage, selectedTab]);

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Messenger</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
          </p>
          <RightOutlined className="right-icon" />
          <span className="current-page">Messenger</span>
        </div>
      </Mainheading>
      <SwitchTab>
        <section>
          <button
            onClick={() => setSelectedTab(2)}
            style={{
              background: selectedTab == 2 ? "green" : "red",
            }}
          >
            Real User
          </button>
          <button
            onClick={() => setSelectedTab(3)}
            style={{
              background: selectedTab == 3 ? "green" : "red",
            }}
          >
            Fake User
          </button>
          <button
            onClick={() => setSelectedTab(1)}
            style={{
              background: selectedTab == 1 ? "green" : "red",
            }}
          >
            All User
          </button>
        </section>

        <SeleteDTabHeading />
        <Searchbox>
          <input
            value={searchtext}
            onChange={Searchtable}
            placeholder="Search"
          />
        </Searchbox>
      </SwitchTab>
      <Tabledata>
        {loading ? (
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        ) : (
          <Table
            className="recent-users-table"
            columns={columns}
            dataSource={tableinfo}
            pagination={false}
            scroll={{ x: true }}
            footer={() => (
              <>
                <Pagination
                  current={currentpage}
                  onChange={onChange}
                  total={totaluser}
                  showSizeChanger
                  defaultPageSize={pagesize}
                />
              </>
            )}
          />
        )}
      </Tabledata>
    </Mainwrapper>
  );
}

const SwitchTab = styled.div`
  width: 100%;
  section {
    display: flex;
  }
  div {
    color: #fff;
    margin: 0 10px;
    font-size: 28px;
    font-weight: 500;
    padding: 20px 0 0 0;
  }
  button {
    width: 100px;
    height: 41px;
    background: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    margin: 0 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border-style: none;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;
const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;

const TableMessageButton = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  color: #000000;
  background: #bebf08;
  cursor: pointer;
`;

const TableRealFakeUser = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  color: #ffffff;
`;
const Searchbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 30px 10px;
  input {
    border: none;
    border-radius: 5px;
    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
    border: 1px solid #484748;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
    @media (max-width: 786px) {
      width: 100%;
    }
  }
`;

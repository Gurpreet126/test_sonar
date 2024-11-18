import React, { useEffect, useState } from "react";
import {
  Mainheading,
  Mainwrapper,
  Tabledata,
  DashboardLink,
  DateWrapper,
} from "./Stylepage";
import {
  RightOutlined,
  SortAscendingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Table, Space, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import { gethideuserlist, Search } from "../Services/Collection";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Buttonactive,
  Buttonview,
  LoaderWrapper,
  SearchboxForPendingPages,
  HideUserTitle,
} from "StyledComponents";
import PropTypes from "prop-types";

const FooterComponent = ({ currentpage, onChange, totalData, pageSize }) => (
  <div>
    <Pagination
      current={currentpage}
      onChange={onChange}
      total={totalData}
      showSizeChanger
      defaultPageSize={pageSize}
    />
  </div>
);

export default function HideUsers() {
  const [tableInfo, setTableInfo] = useState([]);

  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalData, setTotalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };

  const getTime = (time) => {
    let newTime = moment(time).format("HH:mm");
    return newTime;
  };

  const handleGetHideUserListing = async () => {
    setLoading(true);
    let res = await gethideuserlist(pageSize, currentpage);
    if (res.status === 200) {
      setLoading(false);
      setTotalData(res?.extraData);
      setTableInfo(
        roleType == 1 || roleType == 2
          ? res?.data?.map((ele, index) => ({
              key: index + 1,
              id: ele?._id,
              name: ele?.firstName,
              user: ele?.firstName,
              country: ele?.country,
              date: getDate(ele?.created_at),
              time: getTime(ele?.created_at),
              platform: ele?.deviceType,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
          : res?.data?.map((ele, index) => ({
              key: index + 1,
              id: ele?._id,
              name: ele?.firstName,
              user: ele?.firstName,
              phone: ele?.phoneNumber,
              country: ele?.country,
              email: ele?.email,
              date: getDate(ele?.created_at),
              time: getTime(ele?.created_at),
              platform: ele?.deviceType,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
      );
    } else {
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: (
        <HideUserTitle>
          COUNTRY
          <SortAscendingOutlined
            style={{
              fontSize: "16px",
              width: "24px",
            }}
          />
        </HideUserTitle>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <HideUserTitle>
          USER
          <SwapOutlined rotate={90} />
        </HideUserTitle>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <HideUserTitle
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          PHONE#
          <SwapOutlined rotate={90} />
        </HideUserTitle>
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
      title: (
        <HideUserTitle
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          EMAIL
          <SwapOutlined rotate={90} />
        </HideUserTitle>
      ),
      dataIndex: "email",
    },
    {
      title: "DATE",
      dataIndex: "date",
      render: () => <DateWrapper>26-2-2024</DateWrapper>,
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

  const handleSearch = async (e) => {
    setLoading(true);
    let searchtype = {
      search: e,
      searchType: "hideSearch",
      pageNumber: currentpage,
      perPage: pageSize,
    };
    let res = await Search(searchtype);
    if (res.status === 200) {
      setLoading(false);
      setTotalData(res?.extraData?.totalRecords);
      setTableInfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?._id,
          name: ele?.firstName,
          user: ele?.firstName,
          phone: ele?.phoneNumber,
          country: ele?.country,
          email: ele?.email,
          date: getDate(ele?.created_at),
          time: getTime(ele?.created_at),
          platform: ele?.deviceType,
          gender: ele?.gender === 0 ? "Male" : "Female",
        }))
      );
    } else {
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    handleGetHideUserListing();
  }, []);

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Hide-Users({totalData})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Hide-Users Listing</span>
          </p>
        </div>
      </Mainheading>
      <SearchboxForPendingPages>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </SearchboxForPendingPages>
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
            dataSource={tableInfo}
            pagination={false}
            footer={() => (
              <FooterComponent
                currentpage={currentpage}
                onChange={onChange}
                totalData={totalData}
                pageSize={pageSize}
              />
            )}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

FooterComponent.propTypes = {
  currentpage: PropTypes.any,
  onChange: PropTypes.any,
  totalData: PropTypes.any,
  pageSize: PropTypes.any,
};

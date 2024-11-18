import React, { useState, useEffect } from "react";
import {
  Mainwrapper,
  Mainheading,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { Space, Table, Pagination, Spin } from "antd";
import "bootstrap-daterangepicker/daterangepicker.css";
import { allDeletedUsersList, deletesearchapi } from "../Services/Collection";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteuserId } from "Store/userStore";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { toast } from "react-toastify";
import {
  Buttonactive,
  Buttonview,
  Filters,
  LoaderWrapper,
  Searchbox,
} from "StyledComponents";

const PaginationFooter = ({ currentpage, onChange, totalCount, pageSize }) => (
  <Pagination
    current={currentpage}
    onChange={onChange}
    total={totalCount}
    showSizeChanger
    defaultPageSize={pageSize}
  />
);

export default function Deleteuser() {
  const [tableInfo, settableInfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setpagesize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const dispatch = useDispatch();
  const userCount = useSelector((e) => e.UserCounts?.userCounts?.deletedUsers);
  const [totalCount, setTotalCount] = useState(userCount);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setpagesize(pageSize);
  };
  let isFilter = currentDate?.start?._d ? true : false;
  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };
  const handleSearch = (value) => {
    setSearchText(value);
  };
  const searchInputValue = () => {
    if (searchText) return searchText;
  };
  const getAllData = async () => {
    setLoading(true);
    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pageSize);
    params.append("isFilter", isFilter);
    currentDate?.start?._d &&
      params.append(
        "startDate",
        moment(currentDate?.start?._d).format("YYYY-MM-DD")
      );
    currentDate?.end?._d &&
      params.append(
        "endDate",
        moment(currentDate?.end?._d).format("YYYY-MM-DD")
      );
    const res = await allDeletedUsersList(params.toString());
    if (res.status === 200) {
      setTotalCount(userCount);
      settableInfo(
        roleType == 1 || roleType == 2
          ? res?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              id: ele?._id,
              user: ele?.firstName,
              platform: ele?.deviceType,
              date: getDate(ele?.created_at),
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
          : res?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              id: ele?._id,
              user: ele?.firstName,
              email: ele?.email,
              phone: ele?.phoneNumber,
              platform: ele?.deviceType,
              date: getDate(ele?.created_at),
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
      );
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong",
        {
          theme: "colored",
        }
      );
    }
  };
  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      pageNumber: currentpage,
      perPage: pageSize,
    };
    if (value) {
      let searchBy = await deletesearchapi(searchtype);
      if (searchBy.status === 200) {
        setTotalCount(searchBy?.extraData);
        settableInfo(
          roleType == 1 || roleType == 2
            ? searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                country: ele?.country,
                id: ele?._id,
                user: ele?.firstName,
                platform: ele?.deviceType,
                date: getDate(ele?.created_at),
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
            : searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                country: ele?.country,
                id: ele?._id,
                user: ele?.firstName,
                email: ele?.email,
                phone: ele?.phoneNumber,
                platform: ele?.deviceType,
                date: getDate(ele?.created_at),
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
        );

        setLoading(false);
      } else {
        setLoading(false);
        settableInfo([]);
      }
    }
  };

  let timeoutId;
  useEffect(() => {
    if (searchText) {
      timeoutId = setTimeout(() => Searchtable(searchText), 500);
    } else {
      getAllData();
    }
    return () => clearTimeout(timeoutId);
  }, [currentpage, pageSize, currentDate, searchText]);
  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "country",
    },
    {
      title: "USER",
      dataIndex: "user",
    },

    {
      title: "PHONE#",
      dataIndex: "phone",
    },

    {
      title: "STATUS",
      key: "action",
      render: () => (
        <Space size="middle">
          <Buttonactive>Deleted</Buttonactive>
        </Space>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "DATE",
      dataIndex: "date",
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
          <a href="/dashboard/deleteuserinfo" target="_self">
            <Buttonview
              onClick={() => {
                dispatch(deleteuserId(record.id));
              }}
            >
              View
            </Buttonview>
          </a>
        </Space>
      ),
    },
  ];
  const columns2 = [
    {
      title: "COUNTRY",
      dataIndex: "country",
    },
    {
      title: "USER",
      dataIndex: "user",
    },
    {
      title: "STATUS",
      key: "action",
      render: () => (
        <Space size="middle">
          <Buttonactive>Deleted</Buttonactive>
        </Space>
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
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
          <a href="/dashboard/deleteuserinfo" target="_self">
            <Buttonview
              onClick={() => {
                dispatch(deleteuserId(record.id));
              }}
            >
              View
            </Buttonview>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Delete Users({totalCount || 0})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Deleted User Listing</span>
          </p>
        </div>
      </Mainheading>
      <Filters>
        <div className="filters">
          <label htmlFor="date-input">Filter By Date</label>
          <DateRangePicker
            onCallback={(start, end) =>
              setCurrentDate({ start: start, end: end })
            }
          >
            <input
              id="date-input"
              placeholder="hello"
              type="text"
              className="form-control input"
            />
          </DateRangePicker>
          <button
            onClick={() => {
              setCurrentDate({ start: null, end: null });
              window.location.reload();
            }}
          >
            Reset
          </button>
        </div>
        <Searchbox>
          <input
            value={searchInputValue()}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
        </Searchbox>
      </Filters>
      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Tabledata>
          <Table
            className="recent-users-table"
            scroll={{ x: true }}
            columns={roleType == 1 || roleType == 2 ? columns2 : columns}
            dataSource={tableInfo}
            pagination={false}
            footer={() => (
              <PaginationFooter
                currentpage={currentpage}
                onChange={onChange}
                totalCount={totalCount}
                pageSize={pageSize}
              />
            )}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

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
import {
  getPreRegUsersListing,
  getSearchPreRegUserData,
} from "../Services/Collection";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Buttonactive,
  Buttonview,
  LoaderWrapper,
  SearchboxForPendingPages,
  PreRegTitle,
} from "StyledComponents";

export default function PreRegusers() {
  const [tableInfo, setTableInfo] = useState([]);
  const [sortBasis, setSortBasis] = useState({
    sortBasis: undefined,
    sortOrder: undefined,
  });

  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortUser, setSortUser] = useState(false);
  const [sortCountry, setSortCountry] = useState(false);
  const [sortPhone, setSortPhone] = useState(false);
  const [sortEmail, setSortEmail] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const [totalCount, setTotalCount] = useState();

  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      pageNumber: currentpage,
      perPage: pageSize,
    };
    if (value) {
      let searchBy = await getSearchPreRegUserData(searchtype);
      if (searchBy.status === 200) {
        setTotalCount(searchBy?.extraData);
        setLoading(false);
        setTableInfo(
          roleType == 1 || roleType == 2
            ? searchBy?.data?.map((ele, index) => ({
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
            : searchBy?.data?.map((ele, index) => ({
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
        setTableInfo([]);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };

  const getTime = (time) => {
    let newTime = moment(time).format("HH:mm");
    return newTime;
  };

  const getAllData = async () => {
    setLoading(true);

    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pageSize);

    let res = await getPreRegUsersListing(params);

    if (res.status === 200) {
      setTotalCount(res?.extraData);
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
      setLoading(false);
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
        <PreRegTitle>
          COUNTRY
          <SortAscendingOutlined
            onClick={() => {
              setSortCountry((e) => !e);
              if (sortCountry === true) {
                setSortBasis({ sortBasis: "country", sortOrder: "ASC" });
              } else {
                setSortBasis({ sortBasis: "country", sortOrder: "DESC" });
              }
            }}
            style={{
              fontSize: "16px",
              width: "24px",
            }}
          />
        </PreRegTitle>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <PreRegTitle>
          USER
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortUser((e) => !e);

              if (sortUser === true) {
                setSortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setSortBasis({ sortBasis: "lastName", sortOrder: "ASC" });
              }
            }}
          />
        </PreRegTitle>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <PreRegTitle
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          PHONE#
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortPhone((e) => !e);
              if (sortPhone === true) {
                setSortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setSortBasis({ sortBasis: "firstName", sortOrder: "ASC" });
              }
            }}
          />
        </PreRegTitle>
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
        <PreRegTitle
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          EMAIL
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortEmail((e) => !e);
              if (sortEmail === true) {
                setSortBasis({ sortBasis: "email", sortOrder: "ASC" });
              } else {
                setSortBasis({ sortBasis: "email", sortOrder: "DESC" });
              }
            }}
          />
        </PreRegTitle>
      ),
      dataIndex: "email",
    },
    {
      title: "DATE",
      dataIndex: "date",
      render: (_, record) => <DateWrapper>{record.date}</DateWrapper>,
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

  let timeoutId;
  useEffect(() => {
    if (searchText) {
      timeoutId = setTimeout(() => Searchtable(searchText), 500);
    } else {
      getAllData();
    }
    return () => clearTimeout(timeoutId);
  }, [sortBasis, currentpage, pageSize, searchText]);

  const searchInputValue = () => {
    if (searchText) return searchText;
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Pre-Reg({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Pre-Reg Listing</span>
          </p>
        </div>
      </Mainheading>
      <SearchboxForPendingPages>
        <input
          value={searchInputValue()}
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
            dataSource={tableInfo?.sort((a, b) => {
              const dateA = new Date(a.date + " " + a.time);
              const dateB = new Date(b.date + " " + b.time);
              return dateA - dateB;
            })}
            pagination={false}
            footer={() => (
              <Pagination
                current={currentpage}
                onChange={onChange}
                total={totalCount}
                showSizeChanger
                defaultPageSize={pageSize}
              />
            )}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

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
import { Search, banUserListing } from "../Services/Collection";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Buttonactive,
  Buttonview,
  LoaderWrapper,
  SearchboxForPendingPages,
  ShadowBanTitle,
} from "StyledComponents";

export default function ShadowBan() {
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

    let res = await banUserListing(currentpage, pageSize);

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
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong",
        { theme: "colored" }
      );
    }
  };

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: (
        <ShadowBanTitle>
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
        </ShadowBanTitle>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <ShadowBanTitle>
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
        </ShadowBanTitle>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <ShadowBanTitle
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
        </ShadowBanTitle>
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
        <ShadowBanTitle
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
        </ShadowBanTitle>
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
      render: (_, user) => (
        <Space size="middle">
          <Link
            to={`/dashboard/userdetails/${user?.id}`}
            state={{ showButton: true, userid: user?.id }}
          >
            <Buttonview>View</Buttonview>
          </Link>
        </Space>
      ),
    },
  ];
  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      searchType: "shadowBan",
      search: value.trim(),
      status: 1,
      pageNumber: currentpage,
      perPage: pageSize,
    };
    if (value) {
      let searchBy = await Search(searchtype);
      if (searchBy.status === 200) {
        setTotalCount(searchBy?.extraData?.totalRecords);
        setLoading(false);
        setTableInfo(
          searchBy?.data?.map((ele, index) => ({
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
          <p>Shadow-Ban({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Shadow Ban Listing</span>
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
            dataSource={tableInfo}
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

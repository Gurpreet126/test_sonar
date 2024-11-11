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
  const [tableinfo, settableinfo] = useState([]);
  const [sortBasis, setsortBasis] = useState({
    sortBasis: undefined,
    sortOrder: undefined,
  });

  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(25);
  const [searchtext, setsearchtext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortuser, setsortuser] = useState(false);
  const [sortcountry, setsortcountry] = useState(false);
  const [sortPhone, setsortPhone] = useState(false);
  const [sortEmail, setsortEmail] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const [totalcount, settotalcount] = useState();

  const handleSearch = (value) => {
    setsearchtext(value);
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

    let res = await banUserListing(currentpage, pagesize);

    if (res.status === 200) {
      settotalcount(res?.extraData);
      settableinfo(
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

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  const columns = [
    {
      title: (
        <ShadowBanTitle>
          COUNTRY
          <SortAscendingOutlined
            onClick={() => {
              setsortcountry((e) => !e);
              if (sortcountry === true) {
                setsortBasis({ sortBasis: "country", sortOrder: "ASC" });
              } else {
                setsortBasis({ sortBasis: "country", sortOrder: "DESC" });
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
              setsortuser((e) => !e);

              if (sortuser === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "lastName", sortOrder: "ASC" });
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
              setsortPhone((e) => !e);
              if (sortPhone === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "firstName", sortOrder: "ASC" });
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
              setsortEmail((e) => !e);
              if (sortEmail === true) {
                setsortBasis({ sortBasis: "email", sortOrder: "ASC" });
              } else {
                setsortBasis({ sortBasis: "email", sortOrder: "DESC" });
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
      perPage: pagesize,
    };
    if (value) {
      let searchBy = await Search(searchtype);
      if (searchBy.status === 200) {
        settotalcount(searchBy?.extraData?.totalRecords);
        setLoading(false);
        settableinfo(
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

        settableinfo([]);
      }
    }
  };

  let timeoutId;
  useEffect(() => {
    if (searchtext) {
      timeoutId = setTimeout(() => Searchtable(searchtext), 500);
    } else {
      getAllData();
    }
    return () => clearTimeout(timeoutId);
  }, [sortBasis, currentpage, pagesize, searchtext]);

  const searchInputValue = () => {
    if (searchtext) return searchtext;
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Shadow-Ban({totalcount})</p>
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
            dataSource={tableinfo}
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
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

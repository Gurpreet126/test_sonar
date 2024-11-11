import React, { useEffect, useState } from "react";
import { Mainwrapper, Mainheading, Tabledata } from "./Stylepage";
import { Pagination, Spin, Table, Space } from "antd";
import { toast } from "react-toastify";

import { LoaderWrapper } from "Styles/Globalstyle";
import { RightOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, getUserListing } from "Services/Collection";
import { useDispatch, useSelector } from "react-redux";
import { saveSearchField } from "Store/userStore";
import {
  Buttonactive,
  Buttonview,
  UserListingSearchbox,
} from "StyledComponents";

export default function Userlisting() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(25);
  const state = location?.state;
  const [totalcount, settotalcount] = useState();
  const [loading, setLoading] = useState(false);
  const [tableinfo, settableinfo] = useState([]);
  const [searchtext, setsearchtext] = useState(null);
  const dispatch = useDispatch();
  const saveSearchWord = useSelector((e) => e.UserCounts?.searchValueForReal);

  const listingname = () => {
    if (state?.cardName === 1) {
      return "All users";
    }
    if (state?.cardName === "United States") {
      return "United States";
    }
    if (state?.cardName === "Canada") {
      return "Canada";
    }
    return ""; // Default case if no condition matches
  };

  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PHONE#",
      dataIndex: "phone",
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
      dataIndex: "Platform",
      key: "Platform",
    },
    {
      title: "GENDER",
      dataIndex: "GENDER",
      key: "GENDER",
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

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  const searchInputValue = () => {
    if (saveSearchWord) return saveSearchWord;
    if (searchtext) return searchtext;
  };
  const Searchtable = async (value) => {
    setLoading(true);
    dispatch(saveSearchField(value));
    setsearchtext(value);
    let searchtype = {
      searchType: "mobile",
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

  const getAllData = async () => {
    setLoading(true);
    let reqe = {
      country: state?.cardName,
    };
    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pagesize);

    let res = await getUserListing(params, state?.cardName === "1" ? {} : reqe);
    if (res.status === 200) {
      settotalcount(res?.extraData.TotalRecords);
      setLoading(false);
      settableinfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?._id,
          name: ele?.firstName,
          user: ele?.firstName,
          phone: ele?.phoneNumber,
          country: ele?.country,
          email: ele?.email,

          Platform: ele?.deviceType,
          GENDER: ele?.gender === 0 ? "Male" : "Female",
        }))
      );
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong",
        { theme: "colored" }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchtext) {
      Searchtable(searchtext);
    } else if (saveSearchWord) {
      Searchtable(saveSearchWord);
    } else {
      getAllData();
    }
  }, [currentpage, pagesize, searchtext]);

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>{listingname()}</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined className="right-icon" />
            <span className="current-page">User Listing</span>
          </p>
        </div>
      </Mainheading>
      <UserListingSearchbox>
        <input
          value={searchInputValue()}
          onChange={(e) => Searchtable(e.target.value)}
          placeholder="Search"
        />

        <button onClick={() => Navigate("/dashboard/adduser ")}>
          Add User
        </button>
      </UserListingSearchbox>

      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Tabledata>
          <Table
            className="recent-users-table"
            columns={columns}
            dataSource={tableinfo}
            pagination={false}
            scroll={{ x: true }}
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

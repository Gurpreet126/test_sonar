import React, { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import {
  Mainwrapper,
  Mainheading,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import { Pagination, Spin, Space, Table } from "antd";
import { Suspendedusersearchapi, listblockuser } from "../Services/Collection";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Buttonactive,
  Buttonview,
  LoaderWrapper,
  Searchbox,
} from "StyledComponents";

export default function Suspendeduser() {
  const [tableinfo, settableinfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(20);
  const [totalcount, settotalcount] = useState();
  const [loading, setLoading] = useState(false);
  const [searchtext, setsearchtext] = useState(null);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  const getAllData = async () => {
    setLoading(true);
    let res = await listblockuser(currentpage, pagesize);
    if (res.status === 200) {
      settotalcount(res?.extraData);
      settableinfo(
        roleType == 1 || roleType == 2
          ? res?.data?.map((ele, index) => ({
              key: index + 1,
              user: ele?.firstName,
              id: ele?._id,
              date: moment(ele?.created_at.split("T")[0]).format("MM-DD-YYYY"),
              platform: ele?.deviceType,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
          : res?.data?.map((ele, index) => ({
              key: index + 1,
              user: ele?.firstName,
              id: ele?._id,
              phone: ele?.phoneNumber,
              date: moment(ele?.created_at.split("T")[0]).format("MM-DD-YYYY"),
              platform: ele?.deviceType,
              email: ele?.email,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
      );
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(
        res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong",
        { theme: "colored" }
      );
    }
  };
  const handleSearch = (value) => {
    setsearchtext(value);
  };
  const searchInputValue = () => {
    if (searchtext) return searchtext;
  };
  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      pageNumber: currentpage,
      perPage: pagesize,
    };
    if (value) {
      let searchBy = await Suspendedusersearchapi(searchtype);
      if (searchBy.status === 200) {
        settotalcount(searchBy?.extraData);
        settableinfo(
          roleType == 1 || roleType == 2
            ? searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                user: ele?.firstName,
                id: ele?._id,
                date: moment(ele?.created_at.split("T")[0]).format(
                  "MM-DD-YYYY"
                ),
                platform: ele?.deviceType,
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
            : searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                user: ele?.firstName,
                id: ele?._id,
                phone: ele?.phoneNumber,
                date: moment(ele?.created_at.split("T")[0]).format(
                  "MM-DD-YYYY"
                ),
                platform: ele?.deviceType,
                email: ele?.email,
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
        );

        setLoading(false);
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
  }, [currentpage, pagesize, searchtext]);
  const columns = [
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
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "SUSPENDED DATE",
      dataIndex: "date",
    },

    {
      title: "PLATFORM",
      dataIndex: "platform",
    },
    {
      title: "GENDER",
      dataIndex: "platform",
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
  const columns2 = [
    {
      title: "USER",
      dataIndex: "user",
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
      title: "SUSPENDED DATE",
      dataIndex: "date",
    },

    {
      title: "PLATFORM",
      dataIndex: "platform",
    },
    {
      title: "GENDER",
      dataIndex: "platform",
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

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Suspended user({totalcount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Blocked user Listing</span>
          </p>
        </div>
      </Mainheading>
      <Searchbox>
        <input
          value={searchInputValue()}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </Searchbox>

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

import React, { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import {
  Mainwrapper,
  Viewbtn,
  Tabledata,
  Mainheading,
  DashboardLink,
} from "./Stylepage";
import { Pagination, Popconfirm, Space, Table, Spin } from "antd";
import styled from "styled-components";
import {
  getUserListing,
  Markascompleteduserapi,
  Search,
} from "../Services/Collection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

export default function Incomplete() {
  const [tableinfo, settableinfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState("20");
  const [loading, setLoading] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const [searchtext, setsearchtext] = useState();
  const sortBasis = "";
  const status = "";
  const [totalcount, settotalcount] = useState();

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
  };

  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      searchType: "incompleteUsers",
      pageNumber: currentpage,
      perPage: pagesize,
    };
    let searchBy = await Search(searchtype);
    if (searchBy.status === 200) {
      setLoading(false);
      settotalcount(searchBy?.extraData?.totalRecords);
      settableinfo(
        roleType == 1 || roleType == 2
          ? searchBy?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              user: ele?.firstName,
              id: ele?._id,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
          : searchBy?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              user: ele?.firstName,
              email: ele?.email,
              id: ele?._id,
              phone: ele?.phoneNumber,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
      );
    } else {
      setLoading(false);
      settableinfo();
      settotalcount(searchBy?.extraData?.totalRecords);
    }
  };

  const handleSearch = (value) => {
    setsearchtext(value);
  };

  const getAllData = async () => {
    setLoading(true);
    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pagesize);
    params.append("status", status);
    params.append("sortBasis", sortBasis.sortBasis);
    params.append("sortOrder", sortBasis.sortOrder);

    let reqe = {
      createdByAdmin: false,
      incompleteStatus: true,
    };
    let res = await getUserListing(params, reqe);
    if (res.status === 200) {
      settotalcount(res?.extraData?.TotalRecords);
      settableinfo(
        roleType == 1 || roleType == 2
          ? res?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              user: ele?.firstName,
              date: moment(ele?.created_at.split("T")[0]).format("MM-DD-YYYY"),
              id: ele?._id,
              platform: ele?.deviceType,
              gender: ele?.gender === 0 ? "Male" : "Female",
            }))
          : res?.data?.map((ele, index) => ({
              key: index + 1,
              country: ele?.country,
              user: ele?.firstName,
              email: ele?.email,
              date: moment(ele?.created_at.split("T")[0]).format("MM-DD-YYYY"),
              id: ele?._id,
              phone: ele?.phoneNumber,
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
        {
          theme: "colored",
        }
      );
    }
  };
  const handlecompleteduser = async (id) => {
    const res = {
      user_id: id,
    };
    const req = await Markascompleteduserapi(res);
    if (req.status === 200) {
      toast.success("successfully updated");
      getAllData();
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "updates failed"
      );
    }
  };

  let timeoutId;
  useEffect(() => {
    if (searchtext) {
      timeoutId = setTimeout(() => Searchtable(searchtext), 500);
    } else getAllData();

    return () => clearTimeout(timeoutId);
  }, [currentpage, pagesize, searchtext]);

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
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "PLATFORM",
      dataIndex: "platform",
    },
    {
      title: "CREATED DATE",
      dataIndex: "date",
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
          <a href={`/dashboard/userdetails/${record.id}`} target="_self">
            <Buttonview>View</Buttonview>
          </a>
          <Popconfirm
            prefixCls="incompleted-popconfirm"
            title="Are you sure?"
            description="Please ensure that user profile is complete with all the required fields."
            onConfirm={() => handlecompleteduser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Completebtn>Complete</Completebtn>
          </Popconfirm>
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
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },
    {
      title: "PLATFORM",
      dataIndex: "platform",
    },
    {
      title: "CREATED DATE",
      dataIndex: "date",
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
          <a href={`/dashboard/userdetails/${record.id}`} target="_self">
            <Buttonview>View</Buttonview>
          </a>
          <Popconfirm
            prefixCls="incompleted-popconfirm"
            title="Are you sure?"
            description="Please ensure that user profile is complete with all the required fields."
            onConfirm={() => handlecompleteduser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Completebtn>Complete</Completebtn>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Incomplete users({totalcount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />{" "}
            <span className="current-page">Incomplete users Listing</span>
          </p>
        </div>
      </Mainheading>
      <Searchbox>
        <input
          value={searchtext}
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
              <>
                <Pagination
                  current={currentpage}
                  onChange={onChange}
                  total={totalcount}
                  showSizeChanger
                  defaultPageSize={pagesize}
                />
              </>
            )}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}
const LoaderWrapper = styled.div`
  width: 100%;
  height: 450px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Searchbox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;

  input {
    border: none;
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

const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;
const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;

const Completebtn = styled(Viewbtn)`
  background: green;
  cursor: pointer;
`;

import React, { useState, useEffect } from "react";

import { DownOutlined, RightOutlined } from "@ant-design/icons";
import {
  Mainwrapper,
  Tabledata,
  Mainheading,
  DashboardLink,
} from "./Stylepage";
import { Dropdown, Pagination, Radio, Space, Table, Switch, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  pauseAllfakeAccounts,
  getUserListing,
  Search,
} from "../Services/Collection";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveSearchFieldForFake } from "Store/userStore";
import {
  Buttonactive,
  Buttonview,
  FakeUserDropdowndiv,
  FakeUserSearchbox,
  LoaderWrapper,
} from "StyledComponents";
import PropTypes from "prop-types";

const FooterComponent = ({ currentpage, onChange, totalCount, pageSize }) => (
  <div>
    <Pagination
      current={currentpage}
      onChange={onChange}
      total={totalCount}
      showSizeChanger
      defaultPageSize={pageSize}
    />
  </div>
);

const FilterDropdown = ({
  tableInfo,
  genderValue,
  switchchange,
  Male_female,
  getAllData,
}) => {
  return (
    <FakeUserDropdowndiv>
      <div className="pause-btn">
        <p>Pause Fake User</p>
        <Switch
          onChange={switchchange}
          className="pause-switch"
          checked={tableInfo?.[0]?.pauseStatus}
        />
      </div>
      <div className="radio-btns-date">
        <Radio.Group onChange={Male_female} value={genderValue}>
          <Radio value={1}>Female</Radio>
          <Radio value={0}>Male</Radio>
        </Radio.Group>
      </div>
      <div className="dropdown-btn">
        <div>
          <button className="apply-btn" onClick={getAllData}>
            Apply
          </button>
        </div>
      </div>
    </FakeUserDropdowndiv>
  );
};

export default function Fakeuser() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableInfo, setTableInfo] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [genderValue, SetGenderValue] = useState();
  const sortBasis = "";
  const status = "";
  const [totalCount, setTotalCount] = useState();
  const saveSearchWord = useSelector((e) => e.UserCounts?.searchValueForFake);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };
  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      searchType: "web",
      pageNumber: currentpage,
      perPage: pageSize,
    };
    if (value) {
      let searchBy = await Search(searchtype);
      if (searchBy.status === 200) {
        setTotalCount(searchBy?.extraData?.totalRecords);
        setTableInfo(
          roleType == 1 || roleType == 2
            ? searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                country: ele?.country === "" ? "N/A" : ele?.country,
                user: ele?.firstName,
                id: ele?._id,
                platform: ele?.deviceType,
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
            : searchBy?.data?.map((ele, index) => ({
                key: index + 1,
                country: ele?.country === "" ? "N/A" : ele?.country,
                user: ele?.firstName,
                id: ele?._id,
                email: ele?.email,
                phone: ele?.phoneNumber,
                platform: ele?.deviceType,
                gender: ele?.gender === 0 ? "Male" : "Female",
              }))
        );
        setLoading(false);
      } else {
        setLoading(false);
        setTableInfo();
        setTotalCount(searchBy?.extraData?.totalRecords);
      }
    }
  };

  const handleSearch = (value) => {
    dispatch(saveSearchFieldForFake(value));
    setSearchText(value);
  };

  const switchchange = async (checked) => {
    const req = {
      pauseStatus: checked ? 1 : 0,
    };

    const res = await pauseAllfakeAccounts(req);
    if (res.status === 200) {
      getAllData();
    } else {
      toast.error(
        res?.response?.data?.message ||
          res?.error ||
          res?.message ||
          "Something went wrong"
      );
    }
  };
  const Male_female = (e) => {
    SetGenderValue(e.target.value);
  };

  const getAllData = async () => {
    setLoading(true);
    const req = {
      createdByAdmin: true,
    };
    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pageSize);
    params.append("status", status);
    params.append("sortBasis", sortBasis.sortBasis);
    params.append("sortOrder", sortBasis.sortOrder);

    if (genderValue === 1) {
      params.append("gender", genderValue);
    }
    if (genderValue === 0) {
      params.append("gender", genderValue);
    }

    const res = await getUserListing(params, req);
    if (res.status === 200) {
      setTotalCount(res?.extraData.TotalRecords);
      setTableInfo(
        roleType == 1 || roleType == 2
          ? res?.data?.map((ele, index) => ({
              key: index + 1,
              id: ele?._id,
              country: ele?.country === "" ? "N/A" : ele?.country,
              user: ele?.firstName,
              platform: ele?.deviceType,
              gender: ele?.gender === 1 ? "Female" : "male",
              pauseStatus: ele?.pauseStatus === 1 ? true : false,
            }))
          : res?.data?.map((ele, index) => ({
              key: index + 1,
              id: ele?._id,
              country: ele?.country === "" ? "N/A" : ele?.country,
              user: ele?.firstName,
              email: ele?.email,
              phone: ele?.phoneNumber,
              platform: ele?.deviceType,
              gender: ele?.gender === 1 ? "Female" : "male",
              pauseStatus: ele?.pauseStatus === 1 ? true : false,
            }))
      );
      setLoading(false);
    } else {
      toast.error(res?.response?.data?.message || res.error || res.message, {
        theme: "colored",
      });
      setLoading(false);
    }
  };

  let timeoutId;
  useEffect(() => {
    if (searchText) {
      timeoutId = setTimeout(() => Searchtable(searchText), 500);
    } else if (saveSearchWord) {
      timeoutId = setTimeout(() => Searchtable(saveSearchWord), 500);
    } else {
      getAllData();
    }
    return () => clearTimeout(timeoutId);
  }, [currentpage, pageSize, searchText]);

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
        </Space>
      ),
    },
  ];

  const searchInputValue = () => {
    if (saveSearchWord) return saveSearchWord;
    if (searchText) return searchText;
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Fake Users({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Fake user Listing</span>
          </p>
        </div>
      </Mainheading>

      <FakeUserSearchbox>
        <input
          value={searchInputValue()}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="search"
        />
        <div className="active-btn">
          <Dropdown
            overlay={
              <FilterDropdown
                tableInfo={tableInfo}
                genderValue={genderValue}
                switchchange={switchchange}
                Male_female={Male_female}
                getAllData={getAllData}
              />
            }
            trigger={["click"]}
          >
            <button className="filter-btn">
              {" "}
              Filter <DownOutlined />
            </button>
          </Dropdown>

          <button
            className="adduser-btn"
            onClick={() => Navigate("/dashboard/createfakeuser")}
          >
            ADD USER
          </button>
        </div>
      </FakeUserSearchbox>
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
              <FooterComponent
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
FooterComponent.propTypes = {
  currentpage: PropTypes.any,
  onChange: PropTypes.any,
  totalCount: PropTypes.any,
  pageSize: PropTypes.any,
};
FilterDropdown.propTypes = {
  tableInfo: PropTypes.any,
  genderValue: PropTypes.any,
  switchchange: PropTypes.func,
  Male_female: PropTypes.func,
  getAllData: PropTypes.func,
};

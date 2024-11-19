import React, { useEffect, useState } from "react";
import {
  Mainheading,
  Mainwrapper,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import {
  RightOutlined,
  SortAscendingOutlined,
  SwapOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Table,
  DatePicker,
  Space,
  Dropdown,
  Checkbox,
  Radio,
  Pagination,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import { exportdata, getUserListing, Search } from "../Services/Collection";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { saveSearchField } from "../Store/userStore";
import { countries } from "Component/contactData/country";
import {
  Buttonactive,
  Buttonview,
  RealUserDropdowndiv,
  LoaderWrapper,
  SearchboxForPendingPages,
  RealUserTitle,
} from "StyledComponents";
import PropTypes from "prop-types";

const DropdownContent = ({
  online,
  handleChange_online,
  faceVerificationStatus,
  handleChange_verified,
  countries,
  setCountry,
  Male_female,
  genderValue,
  dateSelection,
  getAllData,
}) => (
  <RealUserDropdowndiv>
    <div className="dropdown-items">
      <Checkbox checked={online} onChange={handleChange_online}>
        Online
      </Checkbox>
      <Checkbox
        checked={faceVerificationStatus}
        onChange={handleChange_verified}
      >
        Verified
      </Checkbox>
    </div>
    <div className="search-box">
      <div>
        <select name="countries" onChange={(e) => setCountry(e.target.value)}>
          {countries?.map((list) => (
            <option
              value={list?.name !== "None" ? list?.name : ""}
              key={list?.code}
            >
              {list?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="radio-btns-date">
      <Radio.Group onChange={Male_female} value={genderValue}>
        <Radio value={1}>Female</Radio>
        <Radio value={0}>Male</Radio>
      </Radio.Group>
    </div>
    <div className="day-date">
      <DatePicker onChange={dateSelection} style={{ background: "#979797" }} />
    </div>
    <div className="dropdown-btn">
      <div>
        <button className="apply-btn" onClick={getAllData}>
          Apply
        </button>
      </div>
    </div>
  </RealUserDropdowndiv>
);

export default function Realusers() {
  const dispatch = useDispatch();
  const [tableInfo, setTableInfo] = useState([]);
  const [sortBasis, setSortBasis] = useState({
    sortBasis: undefined,
    sortOrder: undefined,
  });
  const [country, setCountry] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState();
  const [genderValue, SetGenderValue] = useState(null);
  const [sortUser, setSortUser] = useState(false);
  const [sortCountry, setSortCountry] = useState(false);
  const [sortPhone, setSortPhone] = useState(false);
  const [sortEmail, setSortEmail] = useState(false);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);
  const [faceVerificationStatus, setFaceVerificationStatus] = useState();
  const [online, setOnline] = useState();
  const [totalCount, setTotalCount] = useState();
  const saveSearchWord = useSelector((e) => e.UserCounts?.searchValueForReal);

  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      searchType: "mobile",
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
    dispatch(saveSearchField(value));
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

  const dateSelection = (date, dateString) => {
    setCreatedAt(dateString);
  };

  const exporttable = async () => {
    let res = await exportdata();
    if (res.status === 200) {
      window.location.href = `https://app.ibeor.com/assets/uploads/${res?.data}`;
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const Male_female = (e) => SetGenderValue(e.target.value);

  const handleChange_verified = (e) =>
    setFaceVerificationStatus(Boolean(e.target.checked));

  const handleChange_online = (e) => setOnline(Boolean(e.target.checked));

  const getAllData = async () => {
    setLoading(true);
    let reqe = {
      createdByAdmin: false,
    };

    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pageSize);
    params.append("status", 1);
    params.append("sortBasis", sortBasis.sortBasis);
    params.append("sortOrder", sortBasis.sortOrder);
    params.append("faceVerificationStatus", faceVerificationStatus);
    params.append("online_status", online);
    params.append("createdAt", createdAt);
    country !== undefined && params.append("country", country);

    if (genderValue === 1) {
      params.append("gender", genderValue);
    }
    if (genderValue === 0) {
      params.append("gender", genderValue);
    }
    let res = await getUserListing(params, reqe);

    if (res.status === 200) {
      setTotalCount(res?.extraData.TotalRecords);
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

  const items = [
    {
      label: "hello",
    },
  ];

  const columns = [
    {
      title: (
        <RealUserTitle>
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
        </RealUserTitle>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <RealUserTitle>
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
        </RealUserTitle>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <RealUserTitle
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
        </RealUserTitle>
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
        <RealUserTitle
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
        </RealUserTitle>
      ),
      dataIndex: "email",
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
  }, [sortBasis, currentpage, pageSize, searchText]);

  const searchInputValue = () => {
    if (saveSearchWord) return saveSearchWord;
    if (searchText) return searchText;
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Real Users({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Real user Listing</span>
          </p>
        </div>
      </Mainheading>
      <SearchboxForPendingPages>
        <input
          value={searchInputValue()}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />

        <div className="active-btn">
          <Dropdown
            menu={{
              items,
            }}
            dropdownRender={() => (
              <DropdownContent
                online={online}
                handleChange_online={handleChange_online}
                faceVerificationStatus={faceVerificationStatus}
                handleChange_verified={handleChange_verified}
                countries={countries}
                setCountry={setCountry}
                Male_female={Male_female}
                genderValue={genderValue}
                dateSelection={dateSelection}
                getAllData={getAllData}
              />
            )}
            trigger={["click"]}
          >
            <button className="filter-btn">
              Filter <DownOutlined />
            </button>
          </Dropdown>

          {adminDetails?.role === "3" && (
            <button className="export-btn" onClick={exporttable}>
              Export
            </button>
          )}
        </div>
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

DropdownContent.propTypes = {
  online: PropTypes.any,
  handleChange_online: PropTypes.func,
  faceVerificationStatus: PropTypes.any,
  handleChange_verified: PropTypes.func,
  countries: PropTypes.any,
  setCountry: PropTypes.any,
  Male_female: PropTypes.func,
  genderValue: PropTypes.any,
  dateSelection: PropTypes.func,
  getAllData: PropTypes.func,
};

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
  const [tableinfo, settableinfo] = useState([]);
  const [sortBasis, setsortBasis] = useState({
    sortBasis: undefined,
    sortOrder: undefined,
  });
  const [country, setCountry] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(25);
  const [searchtext, setsearchtext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState();
  const [genderValue, SetgenderValue] = useState();
  const [sortuser, setsortuser] = useState(false);
  const [sortcountry, setsortcountry] = useState(false);
  const [sortPhone, setsortPhone] = useState(false);
  const [sortEmail, setsortEmail] = useState(false);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);
  const [faceVerificationStatus, setfaceVerificationStatus] = useState();
  const [online, setonline] = useState();
  const [totalcount, settotalcount] = useState();
  const saveSearchWord = useSelector((e) => e.UserCounts?.searchValueForReal);

  const Searchtable = async (value) => {
    setLoading(true);
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

        settableinfo([]);
      }
    }
  };

  const handleSearch = (value) => {
    dispatch(saveSearchField(value));
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

  const Male_female = (e) => SetgenderValue(e.target.value);

  const handleChange_verified = (e) =>
    setfaceVerificationStatus(Boolean(e.target.checked));

  const handleChange_online = (e) => setonline(Boolean(e.target.checked));

  const getAllData = async () => {
    setLoading(true);
    let reqe = {
      createdByAdmin: false,
    };

    let params = new URLSearchParams();
    params.append("pageNumber", currentpage);
    params.append("perPage", pagesize);
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
      settotalcount(res?.extraData.TotalRecords);
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
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const onChange = (page, pagesize) => {
    setCurrentpage(page);
    setpagesize(pagesize);
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
              setsortuser((e) => !e);

              if (sortuser === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "lastName", sortOrder: "ASC" });
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
              setsortPhone((e) => !e);
              if (sortPhone === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "firstName", sortOrder: "ASC" });
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
              setsortEmail((e) => !e);
              if (sortEmail === true) {
                setsortBasis({ sortBasis: "email", sortOrder: "ASC" });
              } else {
                setsortBasis({ sortBasis: "email", sortOrder: "DESC" });
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
    if (searchtext) {
      timeoutId = setTimeout(() => Searchtable(searchtext), 500);
    } else if (saveSearchWord) {
      timeoutId = setTimeout(() => Searchtable(saveSearchWord), 500);
    } else {
      getAllData();
    }
    return () => clearTimeout(timeoutId);
  }, [sortBasis, currentpage, pagesize, searchtext]);

  const searchInputValue = () => {
    if (saveSearchWord) return saveSearchWord;
    if (searchtext) return searchtext;
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Real Users({totalcount})</p>
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

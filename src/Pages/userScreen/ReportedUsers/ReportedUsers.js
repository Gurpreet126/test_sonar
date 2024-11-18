import React, { useEffect, useState } from "react";
import {
  Mainheading,
  Mainwrapper,
  Tabledata,
  DashboardLink,
  DateWrapper,
} from "../../Stylepage";
import {
  RightOutlined,
  SortAscendingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Table, Space, Pagination, Spin } from "antd";
import {
  getReportedUserListing,
  getSearchReportedUserData,
  deleteReport,
} from "Services/Collection";
import moment from "moment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveSearchField } from "../../../Store/userStore";
import StckityNotesModal from "./StckityNotesModal";
import sticky_note from "Assests/Images/Sticky_Notes_icon.png";
import {
  Buttonactive,
  ButtonResolved,
  Buttonview,
  LoaderWrapper,
  Searchbox,
  Title,
} from "models/ReportedUserStyle";

export default function Reportedusers() {
  const dispatch = useDispatch();
  const [tableinfo, settableinfo] = useState([]);
  const [sortBasis, setsortBasis] = useState({
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
  const [openStickyNote, setOpenStickyNote] = useState(false);
  const [stickyNoteContent, setStickyNoteContent] = useState("");
  const [totalCount, setTotalCount] = useState();
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const Searchtable = async (value) => {
    setLoading(true);
    let searchtype = {
      search: value.trim(),
      pageNumber: currentpage,
      perPage: pageSize,
    };
    if (value) {
      let searchBy = await getSearchReportedUserData(searchtype);
      if (searchBy.status === 200) {
        setTotalCount(searchBy?.extraData);
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
    params.append("limit", pageSize);

    let res = await getReportedUserListing(params);

    if (res.status === 200) {
      setTotalCount(res?.extraData);
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
              reason: ele?.reportedUserData?.reportText,
              gender: ele?.gender === 0 ? "Male" : "Female",
              reportedUserId: ele?.reportedUserData?._id,
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
              reason: ele?.reportedUserData?.reportText,
              gender: ele?.gender === 0 ? "Male" : "Female",
              reportedUserId: ele?.reportedUserData?._id,
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

  const handleResolved = async (id) => {
    try {
      setLoading(true);
      const res = await deleteReport(id);
      if (res.status === 200) {
        getAllData();
      } else {
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong",
          {
            theme: "colored",
          }
        );
        setLoading(false);
      }
    } catch {
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: (
        <Title>
          COUNTRY
          <SortAscendingOutlined
            onClick={() => {
              setSortCountry((e) => !e);
              if (sortCountry === true) {
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
        </Title>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <Title>
          USER
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortUser((e) => !e);

              if (sortUser === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "lastName", sortOrder: "ASC" });
              }
            }}
          />
        </Title>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <Title
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          PHONE#
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortPhone((e) => !e);
              if (sortPhone === true) {
                setsortBasis({ sortBasis: "firstName", sortOrder: "DESC" });
              } else {
                setsortBasis({ sortBasis: "firstName", sortOrder: "ASC" });
              }
            }}
          />
        </Title>
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
        <Title
          style={{ display: roleType == 1 || roleType == 2 ? "none" : "unset" }}
        >
          EMAIL
          <SwapOutlined
            rotate={90}
            onClick={() => {
              setSortEmail((e) => !e);
              if (sortEmail === true) {
                setsortBasis({ sortBasis: "email", sortOrder: "ASC" });
              } else {
                setsortBasis({ sortBasis: "email", sortOrder: "DESC" });
              }
            }}
          />
        </Title>
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
      title: "Reason",
      dataIndex: "reason",
      render: (_, record) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleNoteOpenClose(record?.reason)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleNoteOpenClose(record?.reason);
            }
          }}
          aria-label="Open or Close Note"
        >
          <img src={sticky_note} height="20px" alt="note" />
        </div>
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
          <ButtonResolved onClick={() => handleResolved(record.reportedUserId)}>
            Resolved
          </ButtonResolved>
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

  const handleNoteOpenClose = (reason) => {
    setStickyNoteContent(reason);
    setOpenStickyNote((pre) => !pre);
  };

  return (
    <Mainwrapper>
      {openStickyNote && (
        <StckityNotesModal
          onCancel={handleNoteOpenClose}
          open={openStickyNote}
          content={stickyNoteContent}
        />
      )}
      <Mainheading>
        <div>
          <p>Reported Users({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Reported User</span>
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
            columns={columns}
            dataSource={tableinfo}
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

import React, { useEffect, useState } from "react";
import {
  user,
  AddUser,
  android,
  apple,
  Dollar,
  femalemale,
  block,
} from "../Utils/Logo";
import { Space, Table } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Mainwrapper } from "./Stylepage";
import { getRecentUserList, getRealUserCount } from "../Services/Collection";
import { getDobfromTimestamp } from "../Utils/commanMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUsersCount } from "../Store/userStore";
import { Button } from "StyledComponents";
import {
  Card,
  Dashboardcard,
  Cardinfo,
  Tabledata,
  Cardlogo,
  Tableheader,
} from "../StyledComponents";

const cardarray = [
  {
    count: "449",
    title: "TOTAL USERS",
    bg: "red",
    logo: femalemale,
    key: "totalUsersInApp",
    countryName: "1",
    path: "/dashboard/userlisting",
  },
  {
    count: "233",
    title: "TOTAL USERS FROM USA",
    logo: AddUser,
    bg: "#FFBF09",
    key: "totalUsersInUSA",
    countryName: "United States",
    path: "/dashboard/userlisting",
  },
  {
    count: "1",
    title: "TOTAL USERS FROM CANADA",
    logo: user,
    bg: "#01c853",
    key: "totalUsersInCANADA",
    countryName: "Canada",
    path: "/dashboard/userlisting",
  },
  {
    count: "0",
    title: "SUSPENDED ACCOUNTS",
    logo: block,
    bg: "#2879FF",
    key: "totalBlockedUsers",
    countryName: "blockeduser",
    path: "/dashboard/suspendeduser",
  },
  {
    count: "2",
    title: "TOTAL ACCOUNTS REPORTED",
    logo: block,
    bg: "#FFBF09",
    key: "totalReportedUser",
    countryName: "Usa",
    path: "/dashboard/reporteduser",
  },
  {
    count: "25",
    title: "ALL MATCHES COUNT",
    logo: Dollar,
    bg: "#01c853",
    key: "totalMatches",
    countryName: "blockeduser",
    path: "",
  },
  {
    count: "56",
    title: "TOTAL  ANDROID SIGNUPS",
    logo: android,
    bg: "#2879FF",
    key: "totalAndroidSignUp",
    countryName: "Usa",
    path: "/dashboard/userlisting",
  },
  {
    count: "395",
    title: "TOTAL  IOS SIGNUPS",
    logo: apple,
    bg: "red",
    key: "totalIosSignUp",
    countryName: "Usa",
    path: "/dashboard/userlisting",
  },
];

const TableHeader = ({ fullScreen, setFullScreen, handle }) => (
  <Tableheader>
    <h3>Recent Users</h3>
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFullScreen((value) => !value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Prevent default behavior (e.g., scrolling for space)
          setFullScreen((value) => !value);
        }
      }}
      aria-label="Toggle full screen"
    >
      {fullScreen ? (
        <FullscreenOutlined onClick={handle.enter} />
      ) : (
        <FullscreenExitOutlined onClick={handle.exit} />
      )}
    </div>
  </Tableheader>
);

export default function Dashbordinfo() {
  const Navigate = useNavigate();
  const handle = useFullScreenHandle();
  const [fullScreen, setFullScreen] = useState(true);
  const [recentUser, setRecentUser] = useState([]);
  const [cardList, setCardList] = useState(cardarray);
  console.log(cardList, "cardList");
  const [showTableLoading, setShowTableLoading] = useState(false);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const columns = [
    {
      title: "FULLNAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "PLATFORM",
      dataIndex: "platform",
      key: "Platform",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "DOB",
    },

    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/dashboard/userdetails/${record.id}`} target="_self">
            <Button>View</Button>
          </a>
        </Space>
      ),
    },
  ];

  const getRecentUser = async () => {
    setShowTableLoading(true);
    const res = await getRecentUserList(1, 20);
    if (res?.status === 200) {
      await setRecentUser(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?._id,
          name: ele?.firstName,
          country: ele?.country || "N/A",
          dob: getDobfromTimestamp(ele?.dob),
          platform: ele?.deviceType,
        }))
      );
      for (let i = 0; i < cardarray.length; i++) {
        cardarray[i]["count"] =
          res.extraData[cardarray[i].key] !== null
            ? res.extraData[cardarray[i].key]
            : "---";
      }
      setCardList(cardarray);
      setShowTableLoading(false);
    } else {
      setShowTableLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const setRealUser = async () => {
    try {
      let res = await getRealUserCount();
      if (res?.status === 200) {
        dispatch(addUsersCount(res?.data));
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
      }
    } catch (e) {
      toast.error("Something went Wrong");
    }
  };
  useEffect(() => {
    getRecentUser();
    setRealUser();
  }, []);

  const ScreenCheck = {
    "TOTAL  ANDROID SIGNUPS": false,
    "TOTAL IOS SIGNUPS": false,
    "TOTAL CANCEL SUBSCRIPTION": false,
    "TOTAL ACTIVE SUBSCRIPTION": false,

    "TOTAL USERS": true,
    "TOTAL USERS FROM USA": true,
    "TOTAL USERS FROM CANADA": true,
    "SUSPENDED ACCOUNTS": true,
    "TOTAL ACCOUNTS REPORTED": true,
  };
  const screenRender = (data) => {
    if (ScreenCheck[data.title]) {
      if (data?.path != "/dashboard/userlisting") {
        Navigate(data?.path);
      } else {
        Navigate(data?.path, {
          state: { cardName: data.countryName },
        });
      }
    }
  };

  return (
    <Mainwrapper>
      <Dashboardcard>
        {cardList?.map((values) => {
          return (
            <Card
              onClick={() => screenRender(values)}
              key={values?.key}
              isActive={pathname === "/dashboard/userlisting"}
              style={{ background: `${values.bg}` }}
            >
              <Cardinfo>
                <div>
                  <h1>{values.count}</h1>
                </div>
                <div>
                  <p>{values.title}</p>
                </div>
              </Cardinfo>
              <Cardlogo>
                <img src={values.logo} alt="logo" />
              </Cardlogo>
            </Card>
            // </SLink>
          );
        })}
      </Dashboardcard>
      <FullScreen handle={handle}>
        <Tabledata>
          <Table
            className="recent-users-table"
            loading={showTableLoading}
            pagination={false}
            scroll={{ x: true }}
            columns={columns}
            dataSource={recentUser}
            title={() => (
              <TableHeader
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                handle={handle}
              />
            )}
          />
        </Tabledata>
      </FullScreen>
    </Mainwrapper>
  );
}

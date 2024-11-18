import React, { useState } from "react";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Space, Popover, Badge, Drawer, Radio } from "antd";
import { ibeorlogo, menu } from "../Utils/Logo";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sideopen } from "../Store/Navslice";
import "../Style/global.css";
import { navcolor, sidecolor, color } from "../Store/Colorslice";
import { authlogout } from "../Store/Authlogin";
import { NotificationBellIcon } from "Utils/Icons";
import { AccountSettings, OnlineStatus } from "Utils/Image";
import {
  Accountinfo,
  Colortheme,
  Navbarfixed,
  Navlogo,
  NotificationBellWarpper,
  Popoverinfo,
  Primarycolor,
  Settingbtn,
} from "models/GlobalComponentsStyle";
export default function Navbar() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    (state) => state?.UserCounts?.notificationCount
  );
  const [done, setDone] = useState(false);
  function onclick() {
    setDone(!done);
    dispatch(sideopen(!done));
  }
  const over = useSelector((e) => e.Navslice.done);
  const navbarcolor = useSelector((e) => e.Color.navbarcolor);
  const profile_Image = useSelector((e) => e?.Authlogin?.data?.profileImage[0]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Navbarfixed style={{ background: `${navbarcolor}` }}>
        <Navlogo>
          {(over || done) && (
            <div className="ibeor-logo">
              <img src={ibeorlogo} alt="logo" />
            </div>
          )}
          <div
            className="menu-logo"
            tabIndex={0}
            onClick={onclick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onclick();
              }
            }}
            aria-label="Menu"
          >
            <img src={menu} alt="menu" />
          </div>
        </Navlogo>

        <NotificationBellWarpper>
          <Accountinfo>
            <a
              style={{ textDecoration: "none" }}
              target="_self"
              href={process.env.REACT_APP_WEB_URL_V2}
            >
              <h4>Switch to official iBeor V2</h4>
            </a>
            <Popover
              placement="bottomRight"
              content={
                <Popoverinfo>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      Navigate("/dashboard/updateprofile");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate("/dashboard/updateprofile");
                      }
                    }}
                    aria-label="Update Profile"
                  >
                    <img className="Online-Status" src={OnlineStatus} alt="" />
                    <p> Online</p>
                  </div>

                  <div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        Navigate("/dashboard/superadmin");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate("/dashboard/superadmin");
                        }
                      }}
                      aria-label="Go to Super Admin Dashboard"
                    >
                      <img src={AccountSettings} alt="" />
                      <p>Account settings</p>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => dispatch(authlogout())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        dispatch(authlogout());
                      }
                    }}
                    style={{ borderBlockStart: "1px solid #484748" }}
                    aria-label="Logout"
                  >
                    <LogoutOutlined />
                    <p>Logout</p>
                  </div>
                </Popoverinfo>
              }
              trigger="click"
            >
              <Badge
                offset={[-8, 39]}
                style={{ background: "green", width: "8px", height: "8px" }}
                dot
              >
                <Avatar
                  size={50}
                  src={process.env.REACT_APP_BASEURL_IMAGE + profile_Image}
                />
              </Badge>
            </Popover>
          </Accountinfo>

          <div className="notificationBell">
            <NotificationBellIcon
              style={{ color: "#f1c04e", width: "51px", fontSize: "28px" }}
              onClick={() => navigate("/dashboard/messangerForFake")}
            />
            <label style={{ color: "#f1c04e" }}>
              {notificationCount === null ? 0 : notificationCount}
            </label>
          </div>
        </NotificationBellWarpper>
      </Navbarfixed>
      <Settingbtn>
        <button>
          <SettingOutlined
            onClick={showDrawer}
            style={{ color: "white", fontSize: "20px" }}
          />
        </button>
        <Drawer
          width={250}
          title="Color Settings"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <Colortheme>
            <p>Theme Color</p>
            <div className="card-box">
              <div
                role="button"
                tabIndex={0}
                className="color-box"
                onClick={() => {
                  dispatch(navcolor("white"));
                  dispatch(sidecolor("white"));
                }}
              >
                <div className="box-header" style={{ background: "white" }} />
                <div className="box-main">
                  <div
                    role="button"
                    tabIndex={0}
                    className="box-leftbar"
                    style={{ background: "white" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
              <div
                className="color-box"
                role="button"
                tabIndex={0}
                onClick={() => {
                  dispatch(navcolor("lightgrey"));
                  dispatch(sidecolor("white"));
                }}
              >
                <div
                  className="box-header"
                  style={{ background: "lightgrey" }}
                />
                <div className="box-main">
                  <div
                    className="box-leftbar"
                    style={{ background: "white" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="color-box"
                onClick={() => {
                  dispatch(navcolor("black"));
                  dispatch(sidecolor("white"));
                }}
              >
                <div className="box-header" style={{ background: "black" }} />
                <div className="box-main">
                  <div
                    className="box-leftbar"
                    style={{ background: "white" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="color-box"
                onClick={() => {
                  dispatch(navcolor("#212121"));
                  dispatch(sidecolor("#333333"));
                }}
              >
                <div className="box-header" style={{ background: "black" }} />
                <div className="box-main">
                  <div
                    className="box-leftbar"
                    style={{ background: "#212121" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="color-box"
                onClick={() => {
                  dispatch(navcolor("#284152"));
                  dispatch(sidecolor("#375468"));
                }}
              >
                <div className="box-header" style={{ background: "#284152" }} />
                <div className="box-main">
                  <div
                    className="box-leftbar"
                    style={{ background: "#375468" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="color-box"
                onClick={() => {
                  dispatch(navcolor("#351e28"));
                  dispatch(sidecolor("#462b36"));
                }}
              >
                <div className="box-header" style={{ background: "#351e28" }} />
                <div className="box-main">
                  <div
                    className="box-leftbar"
                    style={{ background: "#462b36" }}
                  />
                  <div className="box-rightbar" />
                </div>
              </div>
            </div>
          </Colortheme>
          <Primarycolor>
            <p>Primary Colors</p>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio
                  onChange={() => {
                    dispatch(color("red"));
                  }}
                  value={1}
                >
                  Red
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#2879ff"));
                  }}
                  value={2}
                >
                  Blue
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#01c853"));
                  }}
                  value={3}
                >
                  Green
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#fec107"));
                  }}
                  value={4}
                >
                  Yellow
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#e91e63"));
                  }}
                  value={5}
                >
                  Pink
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#ff6005"));
                  }}
                  value={6}
                >
                  Orange
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("#c4996d"));
                  }}
                  value={7}
                >
                  Gold
                </Radio>
                <Radio
                  onChange={() => {
                    dispatch(color("silver"));
                  }}
                  value={8}
                >
                  Silver
                </Radio>
              </Space>
            </Radio.Group>
          </Primarycolor>
        </Drawer>
      </Settingbtn>
    </>
  );
}

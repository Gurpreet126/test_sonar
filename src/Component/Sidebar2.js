import React, { useState } from "react";
import {
  SLink,
  SLinkContainer,
  SLinkLabel,
  SLogo,
  SSidebar,
  SLinkdropdownlabel,
} from "./Styleside";
import { useLocation } from "react-router-dom";
import {
  mountain,
  bell,
  group,
  Inbox,
  message,
  invite,
  messanger,
} from "../Utils/Logo";
import { useSelector, useDispatch } from "react-redux";
import { ActiveTab, Over } from "../Store/Navslice";
import { IdcardOutlined } from "@ant-design/icons";

export default function Sidebar2() {
  const dispatch = useDispatch();
  const [subnav, setSubnav] = useState(false);
  const count = useSelector((e) => e.Navslice.status);
  const over = useSelector((e) => e.Navslice.done);
  const sidebarcolor = useSelector((e) => e.Color.sidebarcolor);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const getThemeColor = useSelector((state) => state?.Color?.color);
  const [expenedMessageCenter, setExpenedMessageCenter] = useState(false);

  const { pathname } = useLocation();
  //Updated sidenav
  const shouldDisplayLabel = (over, count) => over || count;

  return (
    <div>
      <SSidebar
        style={{ background: `${sidebarcolor}` }}
        onMouseOver={() => dispatch(Over(true))}
        onMouseLeave={() => dispatch(Over(false))}
        isOpen={count}
      >
        <div className="sideBarWrapper">
          <SLinkContainer
            isActive={pathname === "/dashboard/dashboardinfo"}
            color={getThemeColor}
            onClick={() => dispatch(ActiveTab("dashboardinfo"))}
          >
            <SLink to="/dashboard/dashboardinfo">
              <SLogo>
                <img src={mountain} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Dashboard</SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>

          <SLinkContainer
            onClick={() => setSubnav((Value) => !Value)}
            color={getThemeColor}
          >
            <div className="userSide">
              <SLogo>
                <img src={group} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Users</SLinkLabel>
              )}
            </div>
          </SLinkContainer>
          {subnav && (
            <div>
              <SLinkContainer
                isActive={pathname === "/dashboard/Pre-Reg"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("Pre-Reg"))}
              >
                <SLink to="/dashboard/Pre-Reg">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Pre-Reg</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
              <SLinkContainer
                isActive={pathname === "/dashboard/shadow-ban"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("shadow-ban"))}
              >
                <SLink to="/dashboard/shadow-ban">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Shadow ban</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>

              <SLinkContainer
                isActive={pathname === "/dashboard/hide-users"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("hide-users"))}
              >
                <SLink to="/dashboard/hide-users">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Hide Users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>

              <SLinkContainer
                isActive={pathname === "/dashboard/realuser"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("realuser"))}
              >
                <SLink to="/dashboard/realuser">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Real users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>

              <SLinkContainer
                isActive={pathname === "/dashboard/fakeuser"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("fakeuser"))}
              >
                <SLink to="/dashboard/fakeuser">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Fake users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
              <SLinkContainer
                isActive={pathname === "/dashboard/reporteduser"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("reporteduser"))}
              >
                <SLink to="/dashboard/reporteduser">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Reported Users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
              <SLinkContainer
                isActive={pathname === "/dashboard/suspendeduser"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("suspendeduser"))}
              >
                <SLink to="/dashboard/suspendeduser">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Suspended users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
              <SLinkContainer
                isActive={pathname === "/dashboard/deleteuser"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("deleteuser"))}
              >
                <SLink to="/dashboard/deleteuser">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel> Delete users</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
              <SLinkContainer
                isActive={pathname === "/dashboard/incomplete"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("incomplete"))}
              >
                <SLink to="/dashboard/incomplete">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel> Incomplete Profile</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
            </div>
          )}
          {adminDetails?.role != "1" && (
            <SLinkContainer
              isActive={pathname === "/dashboard/admin"}
              color={getThemeColor}
              onClick={() => dispatch(ActiveTab("admin"))}
            >
              <SLink to="/dashboard/admin" style={{ width: "fit-content" }}>
                <SLogo>
                  <img src={invite} alt="" />
                </SLogo>

                {shouldDisplayLabel(over, count) && (
                  <SLinkLabel>Admin</SLinkLabel>
                )}
              </SLink>
            </SLinkContainer>
          )}

          <SLinkContainer
            isActive={pathname === "/dashboard/notification"}
            color={getThemeColor}
            onClick={() => dispatch(ActiveTab("notification"))}
          >
            <SLink to="/dashboard/notification">
              <SLogo>
                <img src={bell} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Manage Notifications</SLinkLabel>
              )}
              {}
            </SLink>
          </SLinkContainer>

          <SLinkContainer
            isActive={pathname === "/dashboard/status"}
            color={getThemeColor}
            onClick={() => dispatch(ActiveTab("status"))}
          >
            <SLink to="/dashboard/status" style={{ width: "fit-content" }}>
              <SLogo>
                <img src={message} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Daily online Status</SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>

          <SLinkContainer
            onClick={() => {
              dispatch(ActiveTab("messanger"));
              setExpenedMessageCenter((Value) => !Value);
            }}
            color={getThemeColor}
          >
            <SLink to="/dashboard/messanger" style={{ width: "fit-content" }}>
              <SLogo>
                <img src={messanger} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Message Center</SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>
          {expenedMessageCenter && (
            <div>
              <SLinkContainer
                isActive={pathname === "/dashboard/messanger"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("messanger"))}
              >
                <SLink to="/dashboard/messanger">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Matched User</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>

              <SLinkContainer
                isActive={pathname === "/dashboard/messangerForFake"}
                color={getThemeColor}
                onClick={() => dispatch(ActiveTab("messangerForFake"))}
              >
                <SLink to="/dashboard/messangerForFake">
                  {shouldDisplayLabel(over, count) && (
                    <SLinkdropdownlabel>Messenger</SLinkdropdownlabel>
                  )}
                </SLink>
              </SLinkContainer>
            </div>
          )}

          <SLinkContainer
            isActive={pathname === "/dashboard/email"}
            color={getThemeColor}
            onClick={() => dispatch(ActiveTab("email"))}
          >
            <SLink to="/dashboard/email" style={{ width: "fit-content" }}>
              <SLogo>
                <img src={Inbox} alt="" />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Inbox</SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>

          <SLinkContainer
            isActive={pathname === "/dashboard/supportmember"}
            color={getThemeColor}
            onClick={() => dispatch(ActiveTab("supportmember"))}
          >
            <SLink
              to="/dashboard/supportmember"
              style={{ width: "fit-content" }}
            >
              <SLogo>
                <IdcardOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </SLogo>

              {shouldDisplayLabel(over, count) && (
                <SLinkLabel>Staff Member</SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>
        </div>
      </SSidebar>
    </div>
  );
}

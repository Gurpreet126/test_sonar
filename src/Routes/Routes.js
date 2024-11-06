import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Admin from "../Pages/Admin";
import Dashbord from "../Pages/Dashbord";
import Users from "../Pages/Users";
import Login from "../Pages/Login";
import Inbox from "../Pages/Inbox";
import Forgetpassword from "../Pages/Forgetpassword";
import React from "react";
import Dashbordinfo from "../Pages/Dashbordinfo";
import Notifications from "../Pages/Notifications";
import ChangePassword from "../Pages/ChangePassword";
import Updateprofile from "../Pages/Updateprofile";
import Userlisting from "../Pages/Userlisting";
import Userdetails from "../Pages/Userdetails";
import Addadmin from "../Pages/Addadmin";
import Addnotification from "../Pages/Addnotification";
import Status from "../Pages/Status";
import Realusers from "../Pages/Realusers";
import Fakeuser from "../Pages/Fakeuser";
import Suspendeduser from "../Pages/Suspendeduser";
import Deleteuser from "../Pages/Deleteuser";
import Incomplete from "../Pages/Incomplete";
import { useSelector } from "react-redux";
import Editnotification from "../Pages/Editnotification";
import AddUser from "../Pages/AddUser";
import Editadmin from "Pages/Editadmin";
import Messanger from "Pages/Messanger";
import ChatLayout from "Pages/Messager/ChatLayout";
import Deleteuserinfo from "Pages/userScreen/deleteUserScreen/Deleteuserinfo";
import EmailLayout from "Pages/Email/EmailLayout";
import FakeMessager from "Pages/Messager/FakeMessager";
import Addauth from "Pages/Email/Addauth";
import SupportMember from "Pages/SupportMember/SupportMember";
import SuperAdminAction from "../Pages/SuperAdmin/SuperAdminActions";
import EditContactName from "Pages/ContactName/EditContactName";
import EditEmail from "Pages/EditEmail/EditEmail";
import Reportedusers from "Pages/userScreen/ReportedUsers/ReportedUsers";
import PreRegusers from "Pages/preReg";
import { EmailThread } from "EmailThread/EmailThread";
import CreateFakeUser from "Pages/CreateFakeUser";
import ShadowBan from "Pages/ShodowBan";
import HideUsers from "Pages/HideUsers";
import PropTypes from "prop-types";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated)
    return <Navigate to="/dashboard/dashboardinfo" replace />;
  return <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
}

export default function IbeorRoutes() {
  const authlogin = useSelector((e) => e?.Authlogin?.data?.isActive);
  const isLoggedIn = authlogin;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/" element={<Login />} />
          <Route element={<Forgetpassword />} path="/Forgetpassword" />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
          <Route element={<Dashbord />} path="/dashboard">
            <Route element={<Dashbordinfo />} path="/dashboard/dashboardinfo" />
            <Route element={<Admin />} path="/dashboard/admin" />
            <Route element={<Inbox />} path="/dashboard/inbox" />
            <Route element={<Users />} path="/dashboard/users" />
            <Route element={<Status />} path="/dashboard/status" />
            <Route element={<Notifications />} path="/dashboard/notification" />
            <Route
              element={<ChangePassword />}
              path="/dashboard/changepassword"
            />
            <Route
              element={<EditContactName />}
              path="/dashboard/editcontact"
            />
            <Route element={<EditEmail />} path="/dashboard/editemail" />
            <Route
              element={<Updateprofile />}
              path="/dashboard/updateprofile"
            />
            <Route
              element={<SuperAdminAction />}
              path="/dashboard/superadmin"
            />
            <Route element={<Userlisting />} path="/dashboard/userlisting" />
            <Route
              element={<Userdetails />}
              path="/dashboard/userdetails/:id"
            />
            <Route element={<EmailThread />} path="/dashboard/emailThread" />
            <Route element={<Addadmin />} path="/dashboard/addadmin" />
            <Route
              element={<Addnotification />}
              path="/dashboard/addnotification"
            />
            <Route element={<PreRegusers />} path="/dashboard/Pre-Reg" />
            <Route element={<HideUsers />} path="/dashboard/hide-users" />
            <Route element={<ShadowBan />} path="/dashboard/shadow-ban" />
            <Route element={<Reportedusers />} path="/dashboard/reporteduser" />
            <Route element={<Realusers />} path="/dashboard/realuser" />
            <Route element={<Fakeuser />} path="/dashboard/fakeuser" />
            <Route
              element={<Suspendeduser />}
              path="/dashboard/suspendeduser"
            />
            <Route element={<Deleteuser />} path="/dashboard/deleteuser" />
            <Route element={<Incomplete />} path="/dashboard/incomplete" />
            <Route
              element={<Editnotification />}
              path="/dashboard/editnotification"
            />
            <Route element={<AddUser />} path="/dashboard/adduser" />
            <Route
              element={<CreateFakeUser />}
              path="/dashboard/createfakeuser"
            />
            <Route element={<Editadmin />} path="/dashboard/editadmin" />
            <Route element={<Messanger />} path="/dashboard/messanger" />
            <Route
              element={<ChatLayout />}
              path="/dashboard/messanger/chat/:id"
            />
            <Route
              element={<FakeMessager />}
              path="/dashboard/messangerForFake"
            />
            <Route
              element={<SupportMember />}
              path="/dashboard/supportmember"
            />
            <Route
              element={<Deleteuserinfo />}
              path="/dashboard/deleteuserinfo"
            />
            <Route element={<EmailLayout />} path="/dashboard/email" />
            <Route element={<Addauth />} path="/dashboard/addauth" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.any,
};
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.any,
};

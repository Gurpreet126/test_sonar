import React, { useState } from "react";
import { Mainwrapper, Mainheading, DashboardLink } from "./Stylepage";
import {
  RightOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { editadminprofile } from "Services/Collection";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { EditAdminFormdata, EditAdminFromdatainner } from "StyledComponents";

export default function Editadmin() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const editinfo = useLocation()?.state;

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .optional("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum."),
    roles: Yup.string().required("Role is required"),
  });

  const handlesubmit = async (values) => {
    setLoading(true);
    let data = new FormData();
    data.append("firstName", values?.firstName);
    data.append("lastName", values?.lastName);
    data.append("admin_id", editinfo?.id);
    data.append("email", values?.email.toLowerCase());
    if (values.password !== "!password@#$%")
      data.append("password", values?.password);
    data.append("role", values?.roles);
    image?.[0] && data.append("photos", image?.[0], image?.[0].name);

    let res = await editadminprofile(data);
    if (res.status === 200) {
      toast.success("Admin updated Successfully");
      setLoading(false);
      navigate("/dashboard/admin");
    } else {
      setLoading(false);
      toast.error(res?.response?.data?.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Edit</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Edit Admin</span>
          </p>
        </div>
      </Mainheading>
      <EditAdminFormdata>
        <EditAdminFromdatainner>
          <div className="personal-info">
            <UserAddOutlined />
            <p>Personal Info</p>
          </div>
          <Formik
            initialValues={{
              firstName: editinfo?.name,
              lastName: editinfo?.last,
              email: editinfo?.email,
              password: "!password@#$%",
              roles: editinfo?.role,
            }}
            validationSchema={validationSchema}
            onSubmit={handlesubmit}
          >
            <Form>
              <div className="form-data">
                <div className="form-details">
                  <div className="form-input">
                    <div>
                      <label htmlFor="firstName">First Name</label>
                      <br />
                      <Field id="firstName" name="firstName" />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="firstName" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName">Last Name</label>
                      <br />
                      <Field id="lastName" name="lastName" />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="lastName" />
                      </div>
                    </div>
                  </div>
                  <div className="form-input">
                    <div>
                      <label htmlFor="email">Email</label>
                      <br />
                      <Field id="email" name="email" />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <br />
                      <Field id="password" name="password" type="password" />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h4>Roles</h4>
                  <div className="rolesWrapper">
                    <div>
                      <Field type="radio" name="roles" value="1" />{" "}
                      <label htmlFor="roles">Employee</label>
                    </div>
                    <div>
                      <Field type="radio" name="roles" value="2" />{" "}
                      <label htmlFor="roles">Manager</label>
                    </div>
                    <div>
                      <Field type="radio" name="roles" value="3" />{" "}
                      <label htmlFor="roles">Super Admin </label>
                    </div>
                  </div>
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="roles" />
                  </div>
                </div>
              </div>
              <div className="add-photos">
                <div className="personal-info">
                  <UserOutlined />
                  <p>Add Photos</p>
                </div>
                <div className="profile-img">
                  {editinfo?.image && (
                    <img
                      alt=""
                      src={
                        process.env.REACT_APP_BASEURL_IMAGE + editinfo?.image
                      }
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="myfile"
                  accept=".png, .jpg, .jpeg, .heic"
                  onChange={(e) => setImage(e.target.files)}
                />
              </div>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "15px",
                    paddingTop: "5px",
                  }}
                >
                  <Spin />
                </div>
              ) : (
                <button type="submit" className="Addbtn">
                  Add
                </button>
              )}
            </Form>
          </Formik>
        </EditAdminFromdatainner>
      </EditAdminFormdata>
    </Mainwrapper>
  );
}

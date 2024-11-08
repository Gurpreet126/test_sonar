import React, { useState } from "react";
import { Mainwrapper, Mainheading, DashboardLink } from "./Stylepage";
import {
  RightOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createadmin } from "Services/Collection";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import CopyMailPassword from "./CopyMailPassword";
import { AddAdminFormdata, AddAdminFromdatainner } from "StyledComponents";

export default function Addadmin() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);
  const [openCopyModal, setOpenCopyPassword] = useState(false);
  const [allData, setAllData] = useState(null);

  const handleOpenCopyModal = () => {
    setOpenCopyPassword(true);
  };
  const handleCancelCopyModal = () => {
    setOpenCopyPassword(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum."),
  });

  const handlesubmit = async (values) => {
    setAllData(values);
    setLoading(true);
    let data = new FormData();
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("email", values.email.toLowerCase());
    data.append("password", values.password);
    data.append("role", values?.roles);
    image?.[0] && data.append("photos", image?.[0], image?.[0].name);

    let res = await createadmin(data);
    if (res.status === 200) {
      toast.success("Admin Created Successfully");
      setLoading(false);
      handleOpenCopyModal();
    } else {
      setLoading(false);
      toast.error(res?.response?.data?.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };
  return (
    <Mainwrapper>
      {openCopyModal && (
        <CopyMailPassword
          openCopyModal={openCopyModal}
          handleCancelCopyModal={handleCancelCopyModal}
          allData={allData}
        />
      )}
      <Mainheading>
        <div>
          <p>Add Admin</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined style={{ fontSize: "15px" }} />
            <span className="current-page">Add User</span>
          </p>
        </div>
      </Mainheading>
      <AddAdminFormdata>
        <AddAdminFromdatainner>
          <div className="personal-info">
            <UserAddOutlined />
            <p>Personal Info</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlesubmit}
          >
            {() => (
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
                    {roleType !== 1 ? <h4>Roles</h4> : ""}
                    {roleType == 1 ? (
                      ""
                    ) : roleType == 2 ? (
                      <div className="rolesWrapper">
                        <div>
                          <Field type="radio" name="roles" value="1" />{" "}
                          <label htmlFor="roles">Employee</label>
                        </div>
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
                <div className="add-photos">
                  <div className="personal-info">
                    <UserOutlined />
                    <p>Add Photos</p>
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
            )}
          </Formik>
        </AddAdminFromdatainner>
      </AddAdminFormdata>
    </Mainwrapper>
  );
}

import React, { useState } from "react";
import { Mainwrapper, Mainheading } from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { updatePassword } from "Services/Collection";
import { toast } from "react-toastify";

import * as Yup from "yup";
import {
  ChangePasswordbox,
  ChangePasswordinfo,
  Submitbtn,
} from "StyledComponents";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required("Old Password required"),
    newpassword: Yup.string().required("New Password required"),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("newpassword"), null],
      "Must match New password field value"
    ),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      oldPassword: values.oldpassword,
      newPassword: values.newpassword,
    };
    let res = await updatePassword(req);
    if (res.status === 200) {
      toast.success(
        res?.response?.data?.message || "Password updated successfully"
      );
      setLoading(false);
    } else {
      toast.error(res?.response?.data?.message || res.error || res.message, {
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Change Password</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined style={{ fontSize: "15px" }} />
            ChangePassword
          </p>
        </div>
      </Mainheading>
      <ChangePasswordbox>
        <ChangePasswordinfo>
          <Formik
            initialValues={{
              oldpassword: "",
              newpassword: "",
              confirmpassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="oldpassword">Old Password*</label>
                <Field name="oldpassword" placeholder="Enter Password" />
              </div>
              <section style={{ color: "red", textAlign: "center" }}>
                <ErrorMessage name="oldpassword" />
              </section>

              <div>
                <label htmlFor="newpassword">New Password*</label>
                <Field name="newpassword" placeholder="Enter New Password" />
              </div>
              <section style={{ color: "red", textAlign: "center" }}>
                <ErrorMessage name="newpassword" />
              </section>
              <div>
                <label htmlFor="confirmpassword">Confirm New Password*</label>
                <Field
                  name="confirmpassword"
                  placeholder="Confirm New Password"
                />
              </div>
              <section style={{ color: "red", textAlign: "center" }}>
                <ErrorMessage name="confirmpassword" />
              </section>
              <div className="submit-btn">
                {loading ? (
                  <Submitbtn>Loading...</Submitbtn>
                ) : (
                  <Submitbtn type="submit">Save</Submitbtn>
                )}
              </div>
            </Form>
          </Formik>
        </ChangePasswordinfo>
      </ChangePasswordbox>
    </Mainwrapper>
  );
}

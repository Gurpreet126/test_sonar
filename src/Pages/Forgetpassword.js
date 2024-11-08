import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { reset_forgetPassword } from "Services/Collection";
import { toast } from "react-toastify";
import { Spin } from "antd";
import Header from "../Component/Header";
import * as Yup from "yup";
import {
  AuthLoaderWrapper,
  Logindetails,
  Loginform,
  Loginwrapper,
} from "StyledComponents";

export default function Forgetpassword() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      email: values.email,
    };
    let res = await reset_forgetPassword(req);
    if (res.status === 200) {
      setLoading(false);
      toast.success(
        res?.response?.data?.message || "Message sent successfully"
      );
    } else {
      setLoading(false);
      toast.error(res?.response?.data?.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };
  const validation = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").required("Required*"),
  });
  return (
    <Loginwrapper>
      <Header type="forgetPassword" />
      <Loginform>
        <div className="form-heading">
          <h6>Forget Your Password?</h6>
        </div>
        <Logindetails>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="login-wrapper">
                  <h4>Enter your Email to reset Your password</h4>
                  <div className="email-section">
                    <div className="email-label">
                      <label htmlFor="email">Email:</label>
                    </div>
                    <div>
                      <Field name="email" type="mail" className="form-input" />
                    </div>
                    {errors.email && touched.email ? (
                      <div className="error-box">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="login">
                    {loading ? (
                      <AuthLoaderWrapper>
                        <Spin size="large" />
                      </AuthLoaderWrapper>
                    ) : (
                      <div className="login-section">
                        <button className="login-btn" type="submit">
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Logindetails>
      </Loginform>
    </Loginwrapper>
  );
}

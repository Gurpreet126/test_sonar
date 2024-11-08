import { RightOutlined } from "@ant-design/icons";
import { Mainheading, Mainwrapper } from "Pages/Stylepage";
import { createAuthadminUser } from "Services/Collection";
import { Spin } from "antd";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formdata, Formdatainner, LoaderWrapper } from "models/EmailStyle";

export default function Addauth() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const validation = Yup.object().shape({
    firstname: Yup.string().trim().required("First Name is Required*"),
    lastname: Yup.string().trim().required("Last Name is Required*"),
    email: Yup.string().trim().required("Email Name is Required*"),
    password: Yup.string().trim().required("Password Name is Required*"),
  });
  const handlesubmit = async (values) => {
    setloading(true);
    let req = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
    };

    let res = await createAuthadminUser(req);
    if (res.status === 200) {
      setloading(false);
      navigate("/dashboard/supportmember");
      toast.success(
        res.reponse.data.message || res.message || "User addes successfully",
        { theme: "colored" }
      );
    } else {
      setloading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Add Auth</p>
        </div>
        <div className="page-info">
          <p>
            Email
            <RightOutlined className="right-icon" />
            <span className="current-page">Add Auth</span>
          </p>
        </div>
      </Mainheading>
      <Formdata>
        <Formdatainner>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            }}
            validationSchema={validation}
            onSubmit={handlesubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-data">
                  <div className="form-details">
                    <div className="form-input">
                      <div>
                        <label htmlFor="firstname">First Name</label>
                        <br />
                        <Field id="firstname" name="firstname" />
                        <div className="validation-box">
                          {errors.firstname && touched.firstname ? (
                            <div className="error-text">{errors.firstname}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="form-input">
                      <div>
                        <label htmlFor="lastname">Last Name</label>
                        <br />
                        <Field id="lastname" name="lastname" />
                        <div className="validation-box">
                          {errors.lastname && touched.lastname ? (
                            <div className="error-text">{errors.lastname}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="form-input">
                      <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <Field id="email" type="email" name="email" />
                        <div className="validation-box">
                          {errors.email && touched.email ? (
                            <div className="error-text">{errors.email}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="form-input">
                      <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <Field id="password" type="password" name="password" />
                        <div className="validation-box">
                          {errors.password && touched.password ? (
                            <div className="error-text">{errors.password}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="add-box">
                      {loading ? (
                        <LoaderWrapper>
                          <Spin size="large" />
                        </LoaderWrapper>
                      ) : (
                        <button className="add-btn">Add</button>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Formdatainner>
      </Formdata>
    </Mainwrapper>
  );
}

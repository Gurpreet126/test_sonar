import React, { useState } from "react";
import { Mainwrapper, Mainheading } from "../../Pages/Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ChangePasswordbox,
  ChangePasswordinfo,
  Submitbtn,
} from "models/ContactNameEditMailStyle";

export default function EditEmail() {
  const [loading, setloading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async () => {
    setloading(true);
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Change Email Address</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined style={{ fontSize: "15px" }} />
            Email Address
          </p>
        </div>
      </Mainheading>
      <ChangePasswordbox>
        <ChangePasswordinfo>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="password">Password*</label>
                <Field type="password" name="password" placeholder="Password" />
              </div>
              <div>
                <label htmlFor="email">Email Address*</label>
                <Field name="email" placeholder="Email Address" />
              </div>
              <section style={{ color: "red", textAlign: "center" }}>
                <ErrorMessage name="email" />
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

import React, { useState } from "react";
import { Mainwrapper, Mainheading } from "../../Pages/Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { editadminprofile } from "Services/Collection";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authlogin } from "Store/Authlogin";
import {
  ChangePasswordbox,
  ChangePasswordinfo,
  Submitbtn,
} from "models/ContactNameEditMailStyle";

export default function EditContactName() {
  const [loading, setloading] = useState(false);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const handleSubmit = async (values) => {
    if (values?.name) {
      setloading(true);
      let obj;
      if (values?.name.includes("")) {
        let x = values?.name.split(" ");
        obj = {
          firstName: x[0],
          lastName: x?.[1] ? x?.[1] : "",
          admin_id: adminDetails?._id,
        };
      } else {
        obj = {
          firstName: "",
          lastName: "",
        };
      }

      let res = await editadminprofile(obj);
      if (res.status === 200) {
        let obj = {
          ...adminDetails,
          firstName: res?.data?.firstName,
        };
        dispatch(authlogin(obj));
        setloading(false);
      } else {
        setloading(false);
        toast.error(
          res?.response?.data?.message ||
            res?.message ||
            res?.error ||
            "Something went wrong",
          { theme: "colored" }
        );
      }
    }
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Contact Name</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined style={{ fontSize: "15px" }} />
            Contact Name
          </p>
        </div>
      </Mainheading>
      <ChangePasswordbox>
        <ChangePasswordinfo>
          <Formik
            initialValues={{
              name: adminDetails?.firstName,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label>Contact Name*</label>
                <Field name="name" placeholder="Enter Name" />
              </div>
              <section style={{ color: "red", textAlign: "center" }}>
                <ErrorMessage name="name" />
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

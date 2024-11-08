import React, { useState } from "react";
import { Mainwrapper, Mainheading } from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { createNotification } from "../Services/Collection";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import TimeSelector from "Component/timePicker";
import { Notificationbox, Notificationform } from "StyledComponents";

export default function Addnotification() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const success = async () => {
    Modal.success({
      content: "Notification added successfully.",
      onOk() {
        Navigate("/dashboard/notification");
      },
    });
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().trim().required("Title is required"),
    Textarea: Yup.string().trim().required("Message is required"),
    date: Yup.date()
      .required("Date is required")
      .min(today, "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      Title: values.Title,
      message: values.Textarea,
      notificationPushDate: values.date + " " + values.time,
    };
    const currentdate = moment().format("DD-MM-YYYY"); //new Date();

    const inputdate = moment(values.date).format("DD-MM-YYYY");

    const currenttime = moment().format("HH:mm");
    const inputtime = moment(values.time, ["HH:mm"]);

    let timeDiff = moment(inputtime, "HH:mm").diff(
      moment(currenttime, "HH:mm"),
      "minutes"
    );
    let dayDiff = moment(inputdate, "DD-MM-YYYY").diff(
      moment(currentdate, "DD-MM-YYYY"),
      "days"
    );

    if ((dayDiff === 0 && timeDiff > 0) || dayDiff > 0) {
      let res = await createNotification(req);
      if (res.status === 200) {
        success();
        setLoading(false);
      } else {
        toast.error(res?.response?.data?.message || res.error || res.message, {
          theme: "colored",
        });
        setLoading(false);
      }
    } else {
      toast.error("The time must be greater than the current time.");
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Create Notification</p>
        </div>
        <div className="page-info">
          <p>
            Manage Notification <RightOutlined className="right-icon" />{" "}
            <span className="current-page">Create Notification</span>
          </p>
        </div>
      </Mainheading>
      <Notificationbox>
        <Notificationform>
          <div>
            <Formik
              initialValues={{
                Title: "",
                Textarea: "",
                date: "",
                time: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <br />
                  <Field id="Tilte" name="Title" />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="Title" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Textarea">Message:</label>
                  <br />
                  <Field
                    id="Textarea"
                    className="message-field"
                    name="Textarea"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="Textarea" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <br />
                  <Field id="date" name="date" type="date" />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="date" />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="time">Time:</label>
                  <br />
                  <Field
                    className="time-picker"
                    name="time"
                    id="time"
                    component={TimeSelector}
                    format="HH:mm"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="time" />
                  </div>
                </div>
                <div>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "15px",
                        paddingTop: "10px",
                      }}
                    >
                      <Spin />
                    </div>
                  ) : (
                    <button className="submit-btn" type="submit">
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            </Formik>
          </div>
        </Notificationform>
      </Notificationbox>
    </Mainwrapper>
  );
}

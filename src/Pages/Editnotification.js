import React, { useState } from "react";
import { DashboardLink, Mainheading, Mainwrapper } from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { editNotification } from "../Services/Collection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Spin } from "antd";
import moment from "moment";
import { EditNotificationbox, EditNotificationform } from "StyledComponents";

export default function Editnotification() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const editNoti_details = useSelector(
    (state) => state?.editNotification?.data
  );

  const date = editNoti_details?.notification;
  const newdate = moment.unix(parseInt(date)).format("YYYY-MM-DD");
  const time = editNoti_details?.NotificationTime;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object().shape({
    Title: Yup.string().trim().required("Title is required"),
    Textarea: Yup.string().trim().required("Message is required"),
    date: Yup.date()
      .required("Date is required")
      .min(today, "Date cannot be in the past"),
    time: Yup.string()
      .trim()
      .required("time is required")
      .test("is-future-time", "Time cannot be in the past", function (value) {
        if (!value) return true;
        const now = new Date();
        const selectedTime = value.split(":");
        const selectedDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(selectedTime[0]),
          parseInt(selectedTime[1])
        );
        return selectedDate >= now;
      }),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const currentdate = new Date();
    const momenttime = moment(currentdate).format("MMMM Do YYYY");

    const inputdate = moment(values.date).format("MMMM Do YYYY");
    let req = {
      Title: values.Title,
      message: values.Textarea,
      status: editNoti_details?.Status,
      notificationPushDate: values.date + " " + values.time,
      notification_id: editNoti_details?.uniqueid,
    };

    if (momenttime === inputdate) {
      let res = await editNotification(req);
      if (res.status === 200) {
        Navigate("/dashboard/notification");
        setLoading(false);
      } else {
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
        setLoading(false);
      }
    } else {
      let res = await editNotification(req);
      if (res.status === 200) {
        Navigate("/dashboard/notification");
        setLoading(false);
      } else {
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
        setLoading(false);
      }
    }
  };
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Edit Notification</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/notification">
              Manage Notification
            </DashboardLink>
            <RightOutlined className="right-icon" />{" "}
            <span className="current-page">Edit Notification</span>
          </p>
        </div>
      </Mainheading>
      <EditNotificationbox>
        <EditNotificationform>
          <div>
            <Formik
              initialValues={{
                Title: editNoti_details?.Title,
                Textarea: editNoti_details?.message,
                date: newdate,
                time: time,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="Title">Title:</label>
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
                <div className="form-group">
                  <label htmlFor="time">Time:</label>
                  <br />
                  <Field id="time" name="time" type="Time" />
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
                        paddingTop: "5px",
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
        </EditNotificationform>
      </EditNotificationbox>
    </Mainwrapper>
  );
}

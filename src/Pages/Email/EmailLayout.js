import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  LoaderWrappersmall,
  Mainheading,
  Mainwrapper,
  Validationbox,
} from "Pages/Stylepage";
import { viewMailbox } from "Services/Collection";
import { LoaderWrapper } from "Styles/Globalstyle";
import { Modal, Spin, Table } from "antd";
import { Field, Form, Formik } from "formik";
import moment from "moment";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import {
  Buttons,
  Buttonview,
  Emailbox,
  Loginsection,
  Pageinfobox,
  Tabledata,
} from "models/EmailStyle";

const TitleComponent = () => (
  <Emailbox>
    <div className="Top_bar">
      <div className="Inbox">
        <p>Inbox</p>
      </div>
    </div>
  </Emailbox>
);

const Loginmodal = ({ validation, handleloginsubmit, loadinglogin }) => {
  return (
    <Loginsection>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={handleloginsubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="login_section">
              <p>User ID</p>
              <Field id="email" type="email" name="email" />

              {errors.email && touched.email ? (
                <Validationbox>
                  {" "}
                  <p className="error-text">{errors.email}</p>{" "}
                </Validationbox>
              ) : null}
            </div>
            <div className="login_section">
              <p>Password</p>
              <Field id="password" type="password" name="password" />
              {errors.password && touched.password ? (
                <Validationbox>
                  {" "}
                  <p className="error-text">{errors.password}</p>{" "}
                </Validationbox>
              ) : null}
            </div>
            <div className="login-btn">
              {loadinglogin ? (
                <LoaderWrappersmall>
                  {" "}
                  <Spin size="60" />
                </LoaderWrappersmall>
              ) : (
                <button className="loginbtn"> Login</button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Loginsection>
  );
};

export default function EmailLayout() {
  const navigate = useNavigate();
  const [tableInfo, setTableInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalForMessage, setModalForMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadinglogin, setLoadinglogin] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const cancelformessage = () => {
    setModalForMessage(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(" Email is Required"),
    password: Yup.string().required(" Password is Required"),
  });

  const columns = [
    {
      title: <>Date</>,
      dataIndex: "date",
      key: "date",
    },

    {
      title: <>Name</>,
      dataIndex: "name",
      key: "name",
    },

    {
      title: <>Email</>,
      dataIndex: "email",
      key: "email",
    },

    {
      title: <>Subject</>,
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: (
        <Pageinfobox>
          <p>1-10 of </p>
          <LeftOutlined />
          <RightOutlined />
        </Pageinfobox>
      ),
      dataIndex: "match",
      key: "match",
      render: (render, data) => (
        <Buttons>
          <Buttonview
            onClick={() => navigate("/dashboard/emailThread", { state: data })}
          >
            View message
          </Buttonview>
        </Buttons>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const structuringData = (data) => {
    let updated = data?.map((el, index) => {
      return {
        id: index,
        key: el,
        attachments: el?.attachments,
        html: el?.html,
        text: el?.text,
        textAsHtml: el?.textAsHtml,
        subject: el?.subject,
        date: moment(el?.date).format("DD MMM YYYY"),
        to: el?.to,
        from: el?.from,
        messageId: el?.messageId,
        name: el?.from?.value[0]?.name,
        email: el?.from?.value[0]?.address,
        threads: el?.threads,
      };
    });
    setTableInfo(updated);
  };

  const fetchingMail = async (payload) => {
    const username = payload.email;
    const password = payload.password;

    setLoading(true);
    try {
      // Encrypt the password before sending it to the backend
      const encryptPassword = (password, secretKey) => {
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          secretKey
        ).toString();
        return encryptedPassword;
      };

      let req = {
        username: username,
        password: encryptPassword(password, "secretKey"),
      };

      let res = await viewMailbox(req);
      if (res.status === 200) {
        setIsModalOpen(false);
        setLoading(false);
        setLoadinglogin(false);
        structuringData(res.data);
      } else {
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
        setLoading(false);
        setLoadinglogin(false);
      }
    } catch (e) {
      setLoading(false);
      setLoadinglogin(false);
      toast.error("Something went wrong");
    }
  };

  const handleloginsubmit = async (values) => {
    setLoadinglogin(true);
    let req = {
      email: values.email,
      password: values.password,
    };
    fetchingMail(req);
  };

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p> Email Inbox</p>
        </div>
        <div className="page-info">
          <p>
            Apps
            <RightOutlined className="right-icon" />
            <span className="current-page">Inbox</span>
          </p>
        </div>
      </Mainheading>

      <Modal footer={false} onCancel={handleCancel} open={isModalOpen}>
        <Loginmodal
          validation={validation}
          handleloginsubmit={handleloginsubmit}
          loadinglogin={loadinglogin}
        />
      </Modal>

      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Tabledata>
          <Modal
            footer={false}
            onCancel={cancelformessage}
            open={modalForMessage}
          >
            <Loginsection>
              <Loginmodal
                validation={validation}
                handleloginsubmit={handleloginsubmit}
                loadinglogin={loadinglogin}
              />
            </Loginsection>
          </Modal>

          <Table
            className="recent-users-table"
            columns={columns}
            scroll={{ x: true }}
            pagination={false}
            rowSelection={rowSelection}
            dataSource={tableInfo}
            title={() => <TitleComponent />}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

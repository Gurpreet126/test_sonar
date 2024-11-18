import React, { useState, useEffect } from "react";
import {
  Mainwrapper,
  Mainheading,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Pagination, Space, Table, Button, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { notificationlist, deleteNotification } from "../Services/Collection";
import moment from "moment";
import { useDispatch } from "react-redux";
import { userinfo } from "../Store/editNotification";
import { toast } from "react-toastify";
import {
  Notificationbtn,
  NotificationsDateField,
  NotificationsDeletebtn,
  NotificationsEditbtn,
  NotificationsLoaderWrapper,
  NotificationsModalbox,
  NotificationsTableheader,
  NotificationsTimeField,
} from "StyledComponents";
import PropTypes from "prop-types";

const TableTitle = ({ onClick }) => (
  <NotificationsTableheader>
    <Notificationbtn onClick={onClick}>Add Notification</Notificationbtn>
  </NotificationsTableheader>
);

export default function Notifications() {
  const [tableInfo, setTableInfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState();

  const dispatch = useDispatch();
  const showedit = (payload) => {
    dispatch(userinfo(payload));
    navigate("/dashboard/editnotification");
  };

  const showModal = (payload) => {
    setDeleteId(payload);
    setIsModalOpen(true);
  };
  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };

  const handleOk = async () => {
    setDeleteLoading(true);

    let req = await deleteNotification(deleteId.uniqueid);
    if (req.status === 200) {
      setDeleteLoading(false);
      toast.success("Notification deleted Successfully");
      getAllData();
      setIsModalOpen(false);
    } else {
      toast.error("No Notification Found");
      setDeleteLoading(false);
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDate = (date) => {
    let newDate = moment(date).format("DD-MM-YYYY ");
    return newDate;
  };

  const getTime = (time) => {
    let newTime = moment(time, ["HH:mm"]).format("hh:mm a");
    return newTime;
  };

  const getAllData = async () => {
    setLoading(true);
    let res = await notificationlist(currentpage, pageSize);
    if (res.status === 200) {
      setLoading(false);
      setTotalCount(res?.extraData);
      setTableInfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          Title: ele?.Title,
          Date: getDate(ele?.notification_date),
          Time: getTime(ele?.notification_Time),
          NotificationTime: ele?.notification_Time,
          Createdby: ele?.adminData[0]?.firstName,
          Status: ele?.status,
          uniqueid: ele?._id,
          message: ele?.message,
          notification: ele?.notificationPushDate,
        }))
      );
    } else {
      setLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "No notification available",
        {
          theme: "colored",
        }
      );
    }
  };
  useEffect(() => {
    getAllData();
  }, [currentpage, pageSize]);

  const columns = [
    {
      title: "TITLE",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "DATE",
      dataIndex: "Date",
      key: "Date",
      render: (data, record) => (
        <NotificationsDateField>{record.Date}</NotificationsDateField>
      ),
    },
    {
      title: "TIME",
      dataIndex: "Time",
      key: "Time",
      render: (data, record) => (
        <NotificationsTimeField>{record.Time}</NotificationsTimeField>
      ),
    },
    {
      title: "CREATED BY",
      dataIndex: "Createdby",
      key: "Createdby",
      render: (data, record) => (
        <div style={{ width: "100px" }}>{record.Createdby}</div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "EDIT",
      key: "action",
      render: (data, record) => (
        <Space size="middle">
          <NotificationsEditbtn
            onClick={() => {
              showedit(record);
            }}
          >
            <EditOutlined />
          </NotificationsEditbtn>
        </Space>
      ),
    },
    {
      title: "DELETE",
      key: "action",
      render: (data) => (
        <div>
          <Space size="middle">
            <NotificationsDeletebtn onClick={() => showModal(data)}>
              <DeleteOutlined />
            </NotificationsDeletebtn>
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                deleteLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      paddingRight: "20px",
                      paddingTop: "5px",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Button key="submit" type="primary" onClick={handleCancel}>
                      Cancel
                    </Button>

                    <Button type="primary" danger onClick={() => handleOk()}>
                      Yes, delete it!
                    </Button>
                  </>
                ),
              ]}
              okText="Delete"
            >
              <NotificationsModalbox>
                <WarningOutlined />
                <h1> Are you Sure!</h1>
                <p>You won&apos;t be able to revert this!</p>
              </NotificationsModalbox>
            </Modal>
          </Space>
        </div>
      ),
    },
  ];

  const Navigate = useNavigate();
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Manage Notification</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Manage Notification</span>
          </p>
        </div>
      </Mainheading>
      {loading ? (
        <NotificationsLoaderWrapper>
          <Spin size="large" />
        </NotificationsLoaderWrapper>
      ) : (
        <Tabledata>
          <Table
            className="recent-users-table"
            scroll={{ x: true }}
            columns={columns}
            dataSource={tableInfo}
            pagination={false}
            footer={() => (
              <Pagination
                current={currentpage}
                onChange={onChange}
                total={totalCount}
                showSizeChanger
                defaultPageSize={pageSize}
              />
            )}
            title={() => (
              <TableTitle
                onClick={() => Navigate("/dashboard/addnotification")}
              />
            )}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

TableTitle.propTypes = {
  onClick: PropTypes.any,
};

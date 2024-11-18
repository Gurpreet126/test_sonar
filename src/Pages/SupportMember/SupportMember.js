import { RightOutlined, WarningOutlined } from "@ant-design/icons";
import {
  DashboardLink,
  Mainheading,
  Mainwrapper,
  Tabledata,
} from "Pages/Stylepage";
import { allmemberlisting, deleteAuthadminuser } from "Services/Collection";
import { LoaderWrapper } from "Styles/Globalstyle";
import { Modal, Pagination, Space, Spin, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Buttonview,
  CreateAtField,
  Deletemodal,
  Emailbox,
  TableHeading,
} from "models/SupportMemberStyle";

export default function SupportMember() {
  const [loading, setLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState();
  const Navigate = useNavigate();

  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setUserId(data.id);
  };

  const handleOk = async () => {
    let res = await deleteAuthadminuser(userId);
    if (res.status === 200) {
      setIsModalOpen(false);
      toast.success(res?.message || "user deleted successfully");
      getuserdetails();
    } else {
      setIsModalOpen(false);
      toast.error(res.response.data.message || res.error || res.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Created At",
      dataIndex: "date",
      render: (data, record) => <CreateAtField>{record.date}</CreateAtField>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (data, record) => (
        <Space size="middle">
          <Buttonview onClick={() => showModal(record)}>Delete</Buttonview>
        </Space>
      ),
    },
  ];

  const getuserdetails = async () => {
    setLoading(true);

    let res = await allmemberlisting(currentpage, pageSize);
    if (res.status === 200) {
      setLoading(false);
      setCount(res?.data);

      setTableInfo(
        res?.extraData?.map((ele, index) => ({
          key: index + 1,
          id: ele?._id,
          firstname: ele?.firstName,
          lastname: ele?.lastName,
          email: ele?.email,
          date: getDate(ele?.createdAt),
        }))
      );
    } else {
      setTableInfo([]);
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getuserdetails();
  }, [currentpage, pageSize]);

  return (
    <Mainwrapper>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okText="Delete"
        onCancel={handleCancel}
      >
        <Deletemodal>
          <WarningOutlined />
          <p>Are you sure to delete this </p>
        </Deletemodal>
      </Modal>

      <Mainheading>
        <div>
          <p>Support </p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Staff Member</span>
          </p>
        </div>
      </Mainheading>

      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Tabledata>
          <Emailbox>
            <button
              className="compose-btn"
              onClick={() => Navigate("/dashboard/addauth")}
            >
              {" "}
              Add Authentication
            </button>
          </Emailbox>

          <Table
            className="recent-users-table"
            scroll={{
              x: true,
            }}
            pagination={false}
            columns={columns}
            dataSource={tableInfo}
            footer={() => (
              <Pagination
                current={currentpage}
                onChange={onChange}
                total={count}
                showSizeChanger
                defaultPageSize={pageSize}
              />
            )}
            title={() => <TableHeading>Staff Member</TableHeading>}
          />
        </Tabledata>
      )}
    </Mainwrapper>
  );
}

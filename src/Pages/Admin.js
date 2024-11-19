import React, { useEffect, useState } from "react";
import {
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Mainwrapper,
  Mainheading,
  Tabledata,
  DashboardLink,
} from "./Stylepage";
import { Button, Modal, Pagination, Spin, Switch, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  adminsearchlist,
  alladminlist,
  changeAdminStatus,
  deleteadminlist,
} from "../Services/Collection";
import { toast } from "react-toastify";
import {
  AdminLoaderWrapper,
  AdminModalbox,
  AdminSearchbox,
  Deletebtn,
  Editbtn,
  Offlinebtn,
  Onlinebtn,
  Status,
} from "StyledComponents";
import PropTypes from "prop-types";

const PaginationFooter = ({ currentpage, onChange, totalCount, pageSize }) => (
  <div>
    <Pagination
      current={currentpage}
      onChange={onChange}
      total={totalCount}
      showSizeChanger
      defaultPageSize={pageSize}
    />
  </div>
);

const DeleteModalFooter = ({ deleteLoading, handleCancel, handleOk }) =>
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
      <Button type="primary" danger onClick={handleOk}>
        Yes, delete it!
      </Button>
    </>
  );

export default function Admin() {
  const Navigate = useNavigate();

  const [tableInfo, setTableInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(2);

  const adminDetails = useSelector((state) => state?.Authlogin?.data);

  const [searchText, setSearchText] = useState("");

  const switchchange = async (payload) => {
    const req = {
      admin_id: payload.id,
    };
    const res = await changeAdminStatus(req);
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(
        res?.response?.data?.message ||
          res?.error ||
          res?.message ||
          "Something went wrong"
      );
    }
  };
  const showModal = (payload) => {
    setIsModalOpen(true);
    setDeleteId(payload.id);
  };
  const editclick = (data) => {
    Navigate("/dashboard/editadmin", { state: data });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    setDeleteLoading(true);

    let req = await deleteadminlist(deleteId);
    if (req.status === 200) {
      setDeleteLoading(false);
      setIsModalOpen(false);
      toast.success("Admin Deleted successfully!");
      getAllData();
    } else {
      setDeleteLoading(false);
      toast.error(req?.response?.data?.message || req.error || req.message, {
        theme: "colored",
      });
      setIsModalOpen(false);
    }
  };

  const getAllData = async () => {
    setLoading(true);
    const req = {
      pageNumber: currentpage,
      perPage: pageSize,
    };
    const res = await alladminlist(req);
    if (res.status === 200) {
      setTotalCount(res?.extraData);
      setTableInfo(
        res?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele?._id,
          last: ele?.lastName,
          name: ele?.firstName,
          email: ele?.email,
          image: ele?.profileImage[0],
          status: ele?.active_status,
          isActive: ele?.isActive,
          isSuperAdmin: ele?.isSuperAdmin,
          role: ele?.role,
        }))
      );
      setLoading(false);
    } else {
      setLoading(false);
      setTableInfo([]);
    }
  };

  const Searchtable = async (value) => {
    if (value != "") {
      setLoading(true);
      let searchtype = {
        pageNumber: 1,
        search: value,
        searchType: "mobile",
      };
      let searchBy = await adminsearchlist(searchtype);
      if (searchBy.status === 200) {
        setTableInfo(
          searchBy?.data?.map((ele, index) => ({
            key: index + 1,
            id: ele?._id,
            name: ele?.firstName,
            email: ele?.email,
            image: ele?.profileImage[0],
            status: ele?.active_status,
            isActive: ele?.isActive,
            isSuperAdmin: ele?.isSuperAdmin,
          }))
        );
        setLoading(false);
      } else {
        setLoading(false);
        setTableInfo([]);
      }
    } else {
      getAllData();
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (page, pageSize) => {
    setCurrentpage(page);
    setPageSize(pageSize);
  };

  let timeoutId;
  useEffect(() => {
    if (searchText) {
      timeoutId = setTimeout(() => Searchtable(searchText), 500);
    } else getAllData();

    return () => clearTimeout(timeoutId);
  }, [currentpage, pageSize, searchText]);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ACOUNT TYPE",
      dataIndex: "",
      // key: "email",
      render: () => <p>--</p>,
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (srcimg) =>
        srcimg && (
          <div>
            <img
              src={process.env.REACT_APP_BASEURL_IMAGE + srcimg}
              style={{
                width: "80px",
                height: "80px",
              }}
              alt=" "
            />
          </div>
        ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "action",
      render: (data, record) => (
        <Status>
          {data == "online" ? (
            <Onlinebtn>{data}</Onlinebtn>
          ) : (
            <Offlinebtn>{data}</Offlinebtn>
          )}
          {adminDetails?.isSuperAdmin == "Yes" || adminDetails?.role == "2" ? (
            <Deletebtn onClick={() => showModal(record)}>
              <DeleteOutlined />
            </Deletebtn>
          ) : null}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
              <DeleteModalFooter
                deleteLoading={deleteLoading}
                handleCancel={handleCancel}
                handleOk={handleOk}
              />
            }
            okText="Delete"
          >
            <AdminModalbox>
              <WarningOutlined />
              <h1>Are you Sure!</h1>
              <p>You won&apos;t be able to revert this!</p>
            </AdminModalbox>
          </Modal>

          {adminDetails?.isSuperAdmin == "Yes" || adminDetails?.role == "2" ? (
            <>
              <Editbtn onClick={() => editclick(record)}>
                <EditOutlined />
              </Editbtn>
              <Switch
                defaultChecked={record?.isActive}
                onChange={() => switchchange(record)}
              />
            </>
          ) : null}
        </Status>
      ),
    },
  ];

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Admin({totalCount})</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Admin Listing</span>
          </p>
        </div>
      </Mainheading>
      <Tabledata className="ant-table-wrapper">
        <AdminSearchbox>
          <input
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={() => Navigate("/dashboard/addadmin")}>
            Add Admin
          </button>
        </AdminSearchbox>

        {loading ? (
          <AdminLoaderWrapper>
            <Spin size="large" />
          </AdminLoaderWrapper>
        ) : (
          <Table
            className="recent-users-table"
            scroll={{ x: true }}
            columns={columns}
            dataSource={tableInfo}
            pagination={false}
            footer={() => (
              <PaginationFooter
                currentpage={currentpage}
                onChange={onChange}
                totalCount={totalCount}
                pageSize={pageSize}
              />
            )}
          />
        )}
      </Tabledata>{" "}
    </Mainwrapper>
  );
}
PaginationFooter.propTypes = {
  currentpage: PropTypes.any,
  onChange: PropTypes.any,
  totalCount: PropTypes.any,
  pageSize: PropTypes.any,
};
DeleteModalFooter.propTypes = {
  deleteLoading: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};

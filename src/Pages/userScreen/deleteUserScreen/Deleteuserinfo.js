import {
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Modal, Spin, Tabs, Upload } from "antd";
import { Mainheading, Mainwrapper } from "Pages/Stylepage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Deleteimages,
  UploadImage,
  deletedPersonalDetail,
} from "Services/Collection";
import { getDobfromTimestamp, heightInFeet } from "Utils/commanMethod";
import UpdateUserPhoneNo from "../updatePhoneNo";
import UpdateUserMail from "../updateUserMail";
import UpdateUserName from "../updateUserName";
import DefaultPersonIcon from "Assests/Images/personIcon.jpg";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";
import { css } from "@emotion/css";
import {
  Carddetails,
  Cardview,
  Followerwrap,
  Userinfo,
} from "models/DeleteUserScreenStyle";
import PropTypes from "prop-types";

const DraggableUploadListItem = ({ originNode, file }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Transform?.toString(transform),
    transition,
    cursor: "move",
  };
  // prevent preview event when drag end
  const className = isDragging
    ? css`
        a {
          pointer-events: none;
        }
      `
    : "";
  const type = file?.url?.split(".").pop();
  const video_type = ["mp4", "mov", "avi"];
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging ? (
        originNode.props.children
      ) : video_type?.includes(type) ? (
        <div className="video-section">
          <video src={file?.url} height="100%" width="100%" controls />
        </div>
      ) : (
        originNode
      )}
    </div>
  );
};

export default function Deleteuserinfo() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [personlDetail, setPersonlDetail] = useState();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [imageName, setImageName] = useState();
  const CanceldeleteModal = () => setDeleteModal(false);
  const [deleteImageLoading, setDeleteImageLoading] = useState(false);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const params = useParams();
  const { id } = params;
  const iddata = params;
  const userId = useSelector((e) => e?.UserCounts?.data);
  const image = process.env.REACT_APP_BASEURL_IMAGE;
  const actionImage = async (fileListuser) => {
    const newfileList = fileListuser;
    let data = new FormData();
    data.append("id", iddata.id);
    data.append("photos", newfileList, newfileList?.name);
    const res = await UploadImage(data);
    if (res.status === 200) {
      toast.success("image uploades successfuly");
      getAllData();
    } else {
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const setUploadImage = (data) => {
    const imageList = [];

    for (let i = 0; i < data?.length; i++) {
      let value = data[i];

      let obj = {};
      obj["url"] = image + value;
      obj["name"] = "image.png";
      obj["status"] = "done";

      imageList.push(obj);
    }

    setFileList(imageList);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const deleteImage = async () => {
    setDeleteImageLoading(true);
    let res = await Deleteimages(imageName);
    if (res.status === 200) {
      toast.success("Image deleted successfully");
      setDeleteImageLoading(false);
      getAllData();
      setDeleteModal(false);
    } else {
      setDeleteModal(false);
      setDeleteImageLoading(false);
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const getAllData = async () => {
    let req = {
      id: userId,
    };
    let res = await deletedPersonalDetail(req);
    if (res.status === 200) {
      setPersonlDetail(res.data);
      setUploadImage(res?.data?.photos);
    } else {
      toast.error(
        res?.response?.data?.message ||
          res?.error ||
          res?.message ||
          "Something went wrong"
      );
    }
  };
  const handleRemove = (data) => {
    setDeleteModal(true);
    let imageBaseUrl = data?.url.split("/", -1);
    setImageName(imageBaseUrl[imageBaseUrl.length - 1]);
  };
  useEffect(() => {
    getAllData();
  }, []);
  const onDragEnd = ({ active, over }) => {
    if (active && over) {
      if (active.id !== over?.id) {
        setFileList((prev) => {
          const activeIndex = prev?.findIndex((i) => i?.uid === active?.id);
          const overIndex = prev?.findIndex((i) => i?.uid === over?.id);
          return arrayMove(prev, activeIndex, overIndex);
        });
      }
    }
  };
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const items = [
    {
      key: "1",
      label: "Basic Info",
      children: (
        <Followerwrap>
          <ul>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Birthday</h4>
                  <span>{getDobfromTimestamp(personlDetail?.dob)}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Gender</h4>
                  <span>{personlDetail?.gender === 0 ? "Male" : "Female"}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>About</h4>
                  <span>{personlDetail?.aboutMe}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Current Work</h4>
                  <span>{personlDetail?.currentWork}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>School</h4>
                  <span>{personlDetail?.school}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Location</h4>
                  <span>{personlDetail?.country}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>City</h4>
                  <span>{personlDetail?.livesIn}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>State</h4>
                  <span>{personlDetail?.state}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Country</h4>
                  <span>{personlDetail?.country}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Roots</h4>
                  <span>
                    {personlDetail?.country_2},{personlDetail?.country_1}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </Followerwrap>
      ),
    },
    {
      key: "2",
      label: "Personal Info",
      children: (
        <Followerwrap>
          <ul>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Looking For</h4>
                  <span>{personlDetail?.lookingFor?.[0]}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Pets</h4>
                  <span>
                    {personlDetail?.pets?.length
                      ? personlDetail?.pets.toString()
                      : ""}
                    {personlDetail?.childrens}
                  </span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Interests</h4>
                  <span>{personlDetail?.interest?.[0]}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Children</h4>
                  <span>{personlDetail?.childrens}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Astrogical Sign</h4>
                  <span>{personlDetail?.astrologicalSign}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Religions</h4>
                  <span>{personlDetail?.religion}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Education</h4>
                  <span>{personlDetail?.Education}</span>
                </div>
              </div>
            </li>
          </ul>
        </Followerwrap>
      ),
    },
    {
      key: "3",
      label: "Photos & Videos",
      children: (
        <div>
          <Followerwrap>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext
                items={fileList.map((i) => i.uid)}
                strategy={verticalListSortingStrategy}
              >
                <Upload
                  className="picturecard"
                  action={actionImage}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  multiple
                  onRemove={(data) => handleRemove(data)}
                  itemRender={(originNode, file) => (
                    <div className="video-div">
                      {["mp4", "mov", "avi"]?.includes(
                        file?.url?.split(".").pop()
                      ) && (
                        <div
                          role="button"
                          tabIndex={0}
                          className="delete-icon"
                          onClick={() => handleRemove(file)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleRemove(file);
                            }
                          }}
                          aria-label="Remove file"
                        >
                          <DeleteOutlined />
                        </div>
                      )}

                      <DraggableUploadListItem
                        originNode={originNode}
                        file={file}
                      />
                    </div>
                  )}
                >
                  {fileList.length >= 6 ? null : uploadButton}
                </Upload>
              </SortableContext>
            </DndContext>
            <Modal
              open={deleteModal}
              footer={[
                deleteImageLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "10px",
                      paddingTop: "10px",
                      justifyContent: "end",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Button key="submit" type="primary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="primary" danger onClick={deleteImage}>
                      Delete
                    </Button>
                  </>
                ),
              ]}
              okText="Delete"
              onCancel={CanceldeleteModal}
            >
              <h1 style={{ color: "red" }}> Delete this Image/Video</h1>
            </Modal>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Followerwrap>
        </div>
      ),
    },

    {
      key: "4",
      label: "Apperance & Habits",
      children: (
        <Followerwrap>
          <table>
            <tr>
              <td>Height</td>
              <td>
                {personlDetail?.height
                  ? heightInFeet[personlDetail?.height]["height"]
                  : ""}
              </td>
            </tr>
            <tr>
              <td>Body Type</td>
              <td>{personlDetail?.bodyType}</td>
            </tr>
            <tr>
              <td>Exercise</td>
              <td>{personlDetail?.exercise}</td>
            </tr>
            <tr>
              <td>Drink</td>
              <td>{personlDetail?.drink}</td>
            </tr>
            <tr>
              <td>Smoker</td>
              <td>{personlDetail?.smoker}</td>
            </tr>
            <tr>
              <td>Marijuana</td>
              <td>{personlDetail?.marijuana}</td>
            </tr>
          </table>
        </Followerwrap>
      ),
    },
    {
      key: "5",
      label: "Settings",
      children: (
        <Followerwrap>
          <div className="form">
            <span>Name</span>
            <div className="form-control-box">
              <div className="form-control">
                <div>
                  <UserOutlined />
                </div>
                <p>{personlDetail?.firstName}</p>
              </div>
              <div>
                <EditOutlined onClick={() => setModal1Open(true)} />
                {modal1Open && (
                  <UpdateUserName
                    data={personlDetail?.firstName}
                    modal1Open={modal1Open}
                    setModal1Open={setModal1Open}
                    id={id}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form">
            <span>Email</span>
            <div className="form-control-box">
              <div className="form-control">
                <div>
                  <MailOutlined />
                </div>
                <p>{personlDetail?.email}</p>
              </div>
              <div>
                <EditOutlined onClick={() => setModal2Open(true)} />
                {modal2Open && (
                  <UpdateUserMail
                    data={personlDetail?.email}
                    id={id}
                    modal2Open={modal2Open}
                    setModal2Open={setModal2Open}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form">
            <span>Contant Number</span>
            <div className="form-control-box">
              <div className="form-control">
                <div className="phone-outlined">
                  <PhoneOutlined />

                  <p>+(+1)</p>
                </div>
                <p>{personlDetail?.phoneNumber}</p>
              </div>
              <div>
                <EditOutlined onClick={() => setShowPhoneModal(true)} />
                {showPhoneModal && (
                  <UpdateUserPhoneNo
                    dialingValue=""
                    data={personlDetail?.phoneNumber}
                    id={id}
                    showPhoneModal={showPhoneModal}
                    setShowPhoneModal={setShowPhoneModal}
                  />
                )}
                <Modal
                  title="Update Settings"
                  style={{ top: 20, backgroundColor: "#212121" }}
                  open={modal1Open}
                  onOk={() => setModal1Open(false)}
                  onCancel={() => setModal1Open(false)}
                  okText="Update"
                  cancelText="Cancel"
                >
                  <span>Name</span>
                  <br />
                  <input
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#2a2a2a",
                      border: "1px solid #484748",
                    }}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </Followerwrap>
      ),
    },
  ];
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>User Details</p>
        </div>
        <div className="page-info">
          <p>Dashboard</p>
        </div>
      </Mainheading>

      <Userinfo>
        <Cardview>
          <div className="background-img">
            <div className="profile-pic">
              {["mp4", "mov", "avi"]?.includes(
                fileList?.[0]?.url?.split(".").pop()
              ) ? (
                <video
                  src={fileList[0].url}
                  height="100%"
                  width="100%"
                  className="profile-video"
                />
              ) : personlDetail?.photos?.[0] ? (
                <img src={fileList[0].url} alt="" />
              ) : (
                <img src={DefaultPersonIcon} alt="default-img" />
              )}
            </div>
          </div>
          <div className="profile-info">
            <div className="username">
              <h3>{personlDetail?.firstName || ""}</h3>
              <h6>{personlDetail?.currentWork || ""}</h6>
            </div>
            <div className="social-info">
              <div>
                <p className="name-info">Match</p>
              </div>
              <div>
                <p className="name-info">HeartLike</p>
              </div>
              <div>
                <p className="name-info">Like</p>
              </div>
              <div>
                <p className="name-info"> Swipe</p>
              </div>
            </div>
          </div>
        </Cardview>
        <Carddetails>
          <Tabs
            className="tabs"
            size="large "
            defaultActiveKey="1"
            items={items}
          />
        </Carddetails>
      </Userinfo>
    </Mainwrapper>
  );
}

Deleteuserinfo.propTypes = {
  originNode: PropTypes.any,
  file: PropTypes.any,
};

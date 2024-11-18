import React, { useEffect, useState } from "react";
import { Mainheading, Mainwrapper } from "./Stylepage";

import { Tabs, Modal, Upload, Button, Spin } from "antd";
import ".././Style/global.css";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";

import {
  CloseCircleFilled,
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  WarningOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getParticularUserInfo,
  getExportData,
  deleteUserData,
  suspendUserByAdmin,
  userverification,
  useraccountPause,
  dragAndDropImages,
  Deleteimages,
  UploadImage,
  updateUnsuspendUser,
  removeUserFromAdmin,
  approvePreRegUser,
  pushrecomendedversionapi,
} from "Services/Collection";
import { useNavigate, useParams } from "react-router-dom";
import { getDobfromTimestamp, heightInFeet } from "Utils/commanMethod";
import { toast } from "react-toastify";
import UserBasicInfo from "Pages/userScreen/userInfo";
import PersonalInfo from "Pages/userScreen/personalInfo";
import AppearanceAndHabit from "Pages/userScreen/appearenceAndHabit";
import moment from "moment";
import UpdateUserName from "Pages/userScreen/updateUserName";
import UpdateUserMail from "Pages/userScreen/updateUserMail";
import UpdateUserPhoneNo from "Pages/userScreen/updatePhoneNo";
import SwipeMatch from "./SwipeMatch";
import PromptsAndInspiration from "./userScreen/PromptsAndInspiration";
import { userDetailsActiveTab } from "Store/userStore";
import { useDispatch, useSelector } from "react-redux";
import MatchUserListing from "./userScreen/ParticularMatchesListing/MatchUserListing";
import DefaultPersonIcon from "Assests/Images/personIcon.jpg";
import ShadowBanModal from "Component/ShadowBanModal";
import HideUsersModal from "Component/HideUserModal";
import HeartLikeModal from "./HeatLikeModal";
import {
  Carddetails,
  Cardview,
  Followerwrap,
  Greenbtn,
  Modalbox,
  Modals,
  Orangebtn,
  Personalinfoedit,
  Unverified,
  UserDetailLoaderWrapper,
  Userinfo,
  VoiletBtn,
  Yellow,
} from "StyledComponents";
import PropTypes from "prop-types";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let initialValues = {
  dob: "",
  gender: "",
  about_me: "",
  current_work: "",
  school: "",
  city: "",
  state: "",
  roots_one: "",
  roots_two: "",
  country: "",
  latitude: "",
  longitude: "",
};
let initPersonalInfo = {
  lookingFor: [],
  pets: [],
  interest: [],
  childrens: "",
  Education: "",
  religion: "",
  astrologicalSign: "",
  marriage: "",
};
const appearenceAndHabitInit = {
  height: "",
  bodyType: "",
  exercise: "",
  drink: "",
  smoker: "",
  marijuana: "",
};

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
    transform: CSS.Transform.toString(transform),
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

export default function Userdetails() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(initialValues);
  const [verificationBox, setVerificationBox] = useState();
  const [exportLoading, setExportLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [personlDetail, setPersonlDetail] = useState({});
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalSwipe, setModalSwipe] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [matchListingModal, setMatchListingModal] = useState(false);
  const [pauseModal, setPauseModal] = useState(false);
  const [pauseLoading, setPauseLoading] = useState(false);
  const [suspendedModal, setSuspendedModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [openShadowModal, setOpenShadowModal] = useState(false);
  const [imagSwapLoading, setImagSwapLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState(initPersonalInfo);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);
  const [appearenceAndHabit, setAppearenceAndHabit] = useState(
    appearenceAndHabitInit
  );
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [handleCloseVerification, setHandleCloseVerification] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pauseBtn, setPauseBtn] = useState(false);
  const [firstIndex, setFirstIndex] = useState();
  const [secondIndex, setSecondIndex] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [imageName, setImageName] = useState();
  const [firstImage, setFirstImage] = useState();
  const [secondImage, setSecondImage] = useState();
  const [deleteImageLoading, setDeleteImageLoading] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [openHeartLikeModal, setOpenHeartLikeModal] = useState(false);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const activetabs = useSelector((state) => state?.Navslice?.tab);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ActiveTab = useSelector((state) => state?.UserCounts?.activeTab);
  const CanceldeleteModal = () => setDeleteModal(false);
  const params = useParams();
  const { id } = params;
  const iddata = params;
  const [openHideUserModal, setOpenHideUserModal] = useState(false);
  const roleType = useSelector((state) => state?.Authlogin?.data?.role);

  const handleOpenHideUserModal = () => {
    setOpenHideUserModal(true);
  };
  const handleCancelOpenHideUserModal = () => {
    setOpenHideUserModal(false);
  };

  const handleOpenHeartLikeModal = () => {
    setOpenHeartLikeModal(true);
  };
  const handleCancelHeartLikeModal = () => {
    setOpenHeartLikeModal(false);
  };

  const handleCancel = () => {
    setPreviewOpen(false);
    setDeleteModal(false);
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

  const handleOpenShadowModal = () => {
    setOpenShadowModal(true);
  };
  const handleShadowBanCancel = () => {
    setOpenShadowModal(false);
  };

  const handleRemove = (data) => {
    setDeleteModal(true);
    let imageBaseUrl = data?.url.split("/", -1);
    setImageName(imageBaseUrl[imageBaseUrl.length - 1]);
  };

  const image = process.env.REACT_APP_BASEURL_IMAGE;

  const setUploadImage = (data) => {
    const imageList = [];
    for (let i = 0; i < data?.length; i++) {
      let value = data[i];
      let obj = {};
      obj["url"] = image + value;
      obj["name"] = "video/image";
      obj["status"] = "done";
      imageList.push(obj);
    }
    setFileList(imageList);
  };

  const showVerificationModal = () => {
    setHandleCloseVerification(true);
  };

  const updateDetail = () => {
    let detail = { ...personlDetail };

    if (Object.keys(detail).length > 0) {
      const DOB = moment(detail?.dob).format("YYYY-MM-DD");
      let obj = {
        dob: DOB,
        gender: detail?.gender === 0 ? "male" : "female",
        about_me: detail?.aboutMe,
        current_work: detail?.currentWork,
        school: detail?.school,
        city: detail?.originCity,
        state: detail?.originState,
        lang: detail?.lang[0],
        roots_one: detail?.country_1,
        roots_two: detail?.country_2,
        country: detail?.country,
        latitude: detail?.location?.coordinates[0],
        longitude: detail?.location?.coordinates[1],
      };
      let personalInfo = {
        lookingFor: detail?.lookingFor,
        pets: detail?.pets,
        interest: detail?.interest,
        childrens: detail?.childrens,
        Education: detail?.Education,
        religion: detail?.religion,
        astrologicalSign: detail?.astrologicalSign,
        marriage: detail?.marriage,
      };
      const appearenceAndHabitobj = {
        height: detail?.height,
        bodyType: detail?.bodyType,
        exercise: detail?.exercise,
        drink: detail?.drink,
        smoker: detail?.smoker,
        marijuana: detail?.marijuana,
      };

      setUserInfo(obj);
      setPersonalInfo(personalInfo);
      setAppearenceAndHabit(appearenceAndHabitobj);
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  const getyear = (data) => {
    if (data?.createdByAdmin) {
      return data?.age;
    } else {
      let dob = new Date(data?.dob); // Assuming data.dob is a valid date string
      let currentYear = new Date().getFullYear();
      let birthYear = dob.getFullYear();
      let age = currentYear - birthYear;
      if (new Date(dob.setFullYear(currentYear)) > new Date()) {
        age--;
      }
      return age;
    }
  };

  useEffect(() => {
    updateDetail();
    if (firstIndex || secondIndex) {
      dragimages();
    }
  }, [personlDetail, firstIndex, secondIndex]);

  const dragimages = async () => {
    setImagSwapLoading(true);
    const req = {
      userId: iddata.id,
      firstIndex: firstIndex,
      secondIndex: secondIndex,
      firstImage: firstImage,
      secondImage: secondImage,
    };
    const res = await dragAndDropImages(req);
    if (res.status === 200) {
      setImagSwapLoading(false);
    } else {
      setImagSwapLoading(false);
    }
  };

  const verification = async () => {
    if (!verificationBox) {
      let req = {
        user_id: iddata.id,
        type: 1,
      };

      let res = await userverification(req);
      if (res.status === 200) {
        setVerificationBox(true);
      } else {
        toast.error(
          res?.response?.data?.message ||
            res?.error ||
            res?.message ||
            "Something went wrong"
        );
      }
      setHandleCloseVerification(false);
    } else {
      toast.error("User already verified", { theme: "colored" });
    }
  };

  const unverification = async () => {
    if (verificationBox) {
      let req = {
        user_id: iddata.id,
        type: 2,
      };
      let res = await userverification(req);
      if (res.status === 200) {
        setVerificationBox(false);
      } else {
        toast.error(
          res?.response?.data?.message ||
            res?.error ||
            res?.message ||
            "Something went wrong"
        );
      }
      setHandleCloseVerification(false);
    } else {
      toast.error("User already unverified", { theme: "colored" });
    }
  };

  const Pause_resume = async () => {
    setPauseLoading(true);
    let req = {
      user_id: iddata.id,
    };
    let res = await useraccountPause(req);
    if (res.status === 200) {
      setPauseBtn((e) => !e);
      toast.success(res.message);
      setPauseModal(false);
      setPauseLoading(false);
    } else {
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
      setPauseModal(false);
      setPauseLoading(false);
    }
  };

  const getUserInfo = async () => {
    setLoading(true);
    const res = await getParticularUserInfo(id);
    if (res?.status === 200) {
      setVerificationBox(res?.data?.faceVerificationStatus);
      setLoading(false);
      setExtraData(res?.extraData);
      setPersonlDetail(res?.data);
      setPauseBtn(res?.data?.pauseStatus);
      setUploadImage(res?.data?.photos);
    } else {
      setLoading(false);
    }
  };
  const handlerecomended = async () => {
    const res = {
      userId: id,
    };
    const req = await pushrecomendedversionapi(res);
    if (req?.status == 200) {
      toast.success("Recommended Successfully");
    } else {
      toast.error(
        req.response.data.message ||
          req.error ||
          req.message ||
          "Something went wrong"
      );
    }
  };

  const deleteImage = async () => {
    setDeleteImageLoading(true);
    let res = await Deleteimages(imageName);
    if (res.status === 200) {
      toast.success("Image deleted successfully");
      setDeleteImageLoading(false);
      getUserInfo();
      setDeleteModal(false);
    } else {
      setDeleteModal(false);
      setDeleteImageLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [iddata]);

  const actionImage = async (fileListuser) => {
    setLoading(true);
    const newfileList = fileListuser;
    let data = new FormData();
    data.append("id", iddata.id);
    data.append("photos", newfileList, newfileList?.name);
    const res = await UploadImage(data);
    if (res.status === 200) {
      toast.success("image uploades successfuly");
      getUserInfo();
    } else {
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const handleApproveBtn = async () => {
    setApproveLoading(true);
    let obj = {
      user_id: personlDetail?._id,
    };
    let res = await approvePreRegUser(obj);
    if (res.status === 200) {
      toast.success(res?.message);
      setApproveLoading(false);
      setApproveModal(false);
      getUserInfo();
    } else {
      setApproveLoading(false);
      toast.error(res?.response?.data?.message || res?.error || res.message);
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    const res = await getExportData(id);
    if (res?.status === 200) {
      setExportLoading(false);
      setExportModal(false);
      window.location.href = `http://ec2-54-146-77-20.compute-1.amazonaws.com:3001/assets/uploads/${res?.data}`;
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
      setExportLoading(false);
      setExportModal(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteUserData(id);
      if (res?.status === 200) {
        toast.info("Delete successfully");
        setDeleteLoading(false);
        setIsModalOpen(false);
        navigate(-1);
      } else {
        setDeleteLoading(false);
        setIsModalOpen(false);
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
      }
    } catch (e) {
      setIsModalOpen(false);
      setDeleteLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleRemoveUser = () => {
    setRemoveModal(true);
  };

  const handleTempRemoveUser = async () => {
    setRemoveLoading(true);
    let obj = {
      userId: id,
      removeStatus: true,
    };
    let res = await removeUserFromAdmin(obj);
    if (res?.status === 200) {
      toast.success(res?.message);
      setRemoveLoading(false);
      setRemoveModal(false);
      navigate(-1);
    } else {
      setRemoveLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const handleSuspend = async () => {
    if (personlDetail?.blockedByAdmin) {
      setSuspendLoading(true);
      let req = {
        userId: id,
      };
      try {
        const res = await updateUnsuspendUser(req);
        if (res.status === 200) {
          setSuspendLoading(false);
          setSuspendedModal(false);
          toast.info(res?.message);
          getUserInfo();
        } else {
          setSuspendLoading(false);
          setSuspendedModal(false);
          toast.error(
            res.response.data.message ||
              res.error ||
              res.message ||
              "Something went wrong"
          );
        }
      } catch (e) {
        setSuspendLoading(false);
        setSuspendedModal(false);
        toast.error("Something went wrong");
      }
    } else {
      setSuspendLoading(true);
      try {
        const res = await suspendUserByAdmin(id);
        if (res?.status === 200) {
          setSuspendLoading(false);
          setSuspendedModal(false);
          getUserInfo();
          toast.info("Suspend successfully");
        } else {
          setSuspendLoading(false);
          setSuspendedModal(false);
          toast.error(
            res.response.data.message ||
              res.error ||
              res.message ||
              "Something went wrong"
          );
        }
      } catch (e) {
        setSuspendLoading(false);
        setSuspendedModal(false);
        toast.error("Something went wrong");
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active && over) {
      if (active.id !== over?.id) {
        setFileList((prev) => {
          const activeIndex = prev?.findIndex((i) => i?.uid === active?.id);
          const overIndex = prev?.findIndex((i) => i?.uid === over?.id);
          const activeImage = prev?.filter((i) => i?.uid === active?.id);
          const overImage = prev?.filter((i) => i?.uid === over?.id);
          let activeImage_Name = activeImage[0]?.url?.split("/", -1);
          let overImage_Name = overImage[0]?.url?.split("/", -1);

          setFirstImage(activeImage_Name[activeImage_Name?.length - 1]);
          setSecondImage(overImage_Name[overImage_Name?.length - 1]);
          setFirstIndex(activeIndex);
          setSecondIndex(overIndex);
          return arrayMove(prev, activeIndex, overIndex);
        });
      }
    }
  };
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
                  <br />
                  <span>Age:{getyear(personlDetail)}</span>
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
                  <span>{personlDetail?.originCity}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Language</h4>
                  <span>
                    {personlDetail?.lang?.length > 0 &&
                      personlDetail.lang.join(", ").toString()}
                  </span>
                </div>
              </div>
            </li>

            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>State</h4>
                  <span>{personlDetail?.originState}</span>
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
                    {personlDetail?.country_1}
                    <br />
                    {personlDetail?.country_2}
                  </span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Lives In</h4>
                  <span>{personlDetail?.livesIn}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="bottom-btn">
                  <VoiletBtn onClick={handleRemoveUser}>Remove</VoiletBtn>
                  <Yellow onClick={() => setPauseModal(true)}>
                    {!pauseBtn ? "Pause" : "Resume"}
                  </Yellow>

                  {adminDetails?.role == 3 && (
                    <Orangebtn onClick={() => setExportModal(true)}>
                      Export
                    </Orangebtn>
                  )}

                  <Orangebtn onClick={() => setIsModalOpen(true)}>
                    Delete
                  </Orangebtn>
                  <Orangebtn onClick={() => setSuspendedModal(true)}>
                    {suspendLoading
                      ? "Loading"
                      : personlDetail?.blockedByAdmin
                        ? "Unsuspend"
                        : "Suspend"}{" "}
                  </Orangebtn>
                  <Greenbtn onClick={() => setOpen(true)}>Edit</Greenbtn>
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
                  <span>
                    {personlDetail?.lookingFor?.join(", ")?.toString()}
                  </span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Marriage History</h4>
                  <span>{personlDetail?.marriage || ""}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Pets</h4>
                  <span>
                    {personlDetail?.pets && personlDetail?.pets.length
                      ? personlDetail?.pets?.join(", ")?.toString()
                      : ""}
                  </span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Interests</h4>
                  <span>{personlDetail?.interest?.join(", ")?.toString()}</span>
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
            <li className="follow-list">
              <div className="follow-data">
                <div className="bottom-btn">
                  <Greenbtn onClick={() => setPersonalEdit(true)}>
                    Edit
                  </Greenbtn>
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
        <>
          {imagSwapLoading ? (
            <div>
              <UserDetailLoaderWrapper>
                <Spin size="large" />
              </UserDetailLoaderWrapper>
            </div>
          ) : (
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
                    itemRender={(originNode, file, index) => (
                      <div className="video-div" key={index}>
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
                                e.preventDefault(); // Prevent default action for Space key.
                                handleRemove(file);
                              }
                            }}
                            aria-label="Delete item"
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
                      <Button
                        key="submit"
                        type="primary"
                        onClick={handleCancel}
                      >
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
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Followerwrap>
          )}
        </>
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
          <div className="edit-btn">
            <Greenbtn onClick={() => setShowAppearanceModal(true)}>
              Edit
            </Greenbtn>
          </div>
        </Followerwrap>
      ),
    },
    {
      key: "5",
      label: "Prompts and Inspiration",
      children: (
        <Followerwrap>
          <ul>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>{personlDetail?.promptQuestion || " Prompt"}</h4>

                  <span>{personlDetail?.promptAnswer}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="user-data">
                  <h4>Inspiration</h4>
                  <span>{personlDetail?.inspiration}</span>
                </div>
              </div>
            </li>
            <li className="follow-list">
              <div className="follo-data">
                <div className="bottom-btn">
                  <Greenbtn onClick={() => setShowPrompts(true)}>Edit</Greenbtn>
                </div>
              </div>
            </li>
          </ul>
        </Followerwrap>
      ),
    },
    {
      key: "6",
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
                    getalldetails={getUserInfo}
                  />
                )}
              </div>
            </div>
          </div>
          {roleType == 1 || roleType == 2 ? (
            ""
          ) : (
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
                      getalldetails={getUserInfo}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {roleType == 1 || roleType == 2 ? (
            ""
          ) : (
            <div className="form">
              <span>Contant Number</span>
              <div className="form-control-box">
                <div className="form-control">
                  <div className="phone-outlined">
                    <PhoneOutlined />

                    <p>{personlDetail?.dialingCode}</p>
                  </div>
                  <p>{personlDetail?.phoneNumber}</p>
                </div>
                <div>
                  <EditOutlined onClick={() => setShowPhoneModal(true)} />
                  {showPhoneModal && (
                    <UpdateUserPhoneNo
                      dialingValue=""
                      data={personlDetail?.phoneNumber}
                      countryCode={personlDetail?.dialingCode}
                      id={id}
                      showPhoneModal={showPhoneModal}
                      getalldetails={getUserInfo}
                      setShowPhoneModal={setShowPhoneModal}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </Followerwrap>
      ),
    },
    {
      key: 7,
      label: "",
    },
  ];

  const onChange = (key) => {
    dispatch(userDetailsActiveTab(key));
  };

  return (
    <>
      {openHideUserModal && (
        <HideUsersModal
          openHideUserModal={openHideUserModal}
          personlDetail={personlDetail}
          getUserInfo={getUserInfo}
          handleCancelOpenHideUserModal={handleCancelOpenHideUserModal}
        />
      )}
      {openShadowModal && (
        <ShadowBanModal
          openShadowModal={openShadowModal}
          handleShadowBanCancel={handleShadowBanCancel}
          userid={id}
          isShadowBan={personlDetail?.isShadowBanned}
          getUserInfo={getUserInfo}
        />
      )}
      {openHeartLikeModal && (
        <HeartLikeModal
          openHeartLikeModal={openHeartLikeModal}
          handleCancelHeartLikeModal={handleCancelHeartLikeModal}
        />
      )}
      {matchListingModal && (
        <Modal
          open={matchListingModal}
          onOk={() => setMatchListingModal(false)}
          onCancel={() => setMatchListingModal(false)}
          width="75%"
          footer={[
            <Button
              key="close-button"
              type="primary"
              onClick={() => setMatchListingModal(false)}
            >
              Close
            </Button>,
          ]}
        >
          <MatchUserListing
            user_id={id}
            onCancel={() => setMatchListingModal(false)}
          />
        </Modal>
      )}
      {removeModal && (
        <Modal
          open={removeModal}
          onCancel={() => setRemoveModal(false)}
          footer={[
            removeLoading ? (
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
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={() => setRemoveModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleTempRemoveUser}>
                  Yes
                </Button>
              </>
            ),
          ]}
        >
          <Modalbox>
            <WarningOutlined />
            <h1>Are you sure you want to remove this profile?</h1>
            <p>You won’t be able to revert this!</p>
          </Modalbox>
        </Modal>
      )}

      {pauseModal && (
        <Modal
          open={pauseModal}
          onCancel={() => setPauseModal(false)}
          footer={[
            pauseLoading ? (
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
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={() => setPauseModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={Pause_resume}>
                  Yes
                </Button>
              </>
            ),
          ]}
        >
          <Modalbox>
            <WarningOutlined />
            <h2>
              Are you sure you want to {!pauseBtn ? "Pause" : "Resume"} this
              profile?
            </h2>
          </Modalbox>
        </Modal>
      )}

      {suspendedModal && (
        <Modal
          open={suspendedModal}
          onCancel={() => setSuspendedModal(false)}
          footer={[
            suspendLoading ? (
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
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={() => setSuspendedModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleSuspend}>
                  Yes
                </Button>
              </>
            ),
          ]}
        >
          <Modalbox>
            <WarningOutlined />
            <h2>
              Are you sure you want to{" "}
              {personlDetail?.blockedByAdmin ? "reinstate" : "Suspend"} this
              profile?
            </h2>
          </Modalbox>
        </Modal>
      )}

      {exportModal && (
        <Modal
          open={exportModal}
          onCancel={() => setExportModal(false)}
          footer={[
            exportLoading ? (
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
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={() => setExportModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleExport}>
                  Yes
                </Button>
              </>
            ),
          ]}
        >
          <Modalbox>
            <WarningOutlined />
            <h2>Are you sure you want to Export this profile?</h2>
          </Modalbox>
        </Modal>
      )}

      {approveModal && (
        <Modal
          open={approveModal}
          onCancel={() => setApproveModal(false)}
          footer={[
            approveLoading ? (
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
                <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={() => setApproveModal(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleApproveBtn}>
                  Yes
                </Button>
              </>
            ),
          ]}
        >
          <Modalbox>
            <WarningOutlined />
            <h2>Are you sure you want to approve this profile</h2>
          </Modalbox>
        </Modal>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleDeleteCancel}
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
              <Button
                key="submit"
                type="primary"
                danger
                onClick={handleDeleteCancel}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleDelete}>
                Yes
              </Button>
            </>
          ),
        ]}
      >
        <Modalbox>
          <WarningOutlined />
          <h1>Are you sure you want to delete this profile?</h1>
          <p>You won’t be able to revert this!</p>
        </Modalbox>
      </Modal>

      {loading ? (
        <UserDetailLoaderWrapper>
          <Spin size="large" />
        </UserDetailLoaderWrapper>
      ) : (
        <Mainwrapper>
          <Mainheading>
            <ArrowLeftOutlined onClick={() => navigate(-1)} />{" "}
            <p>User Details</p>
          </Mainheading>

          <Unverified>
            <div className="unverifed-account">
              {handleCloseVerification && (
                <Modal
                  open={handleCloseVerification}
                  onCancel={() => setHandleCloseVerification(false)}
                  title="CONFIRM"
                  footer={[
                    <>
                      <Button
                        key="submit"
                        type="primary"
                        onClick={unverification}
                      >
                        UNVERIFY
                      </Button>

                      <Button type="primary" danger onClick={verification}>
                        VERIFY
                      </Button>
                    </>,
                  ]}
                  okText="Delete"
                />
              )}

              <div
                role="button"
                tabIndex={0}
                className="unverifed-account-box"
                onClick={showVerificationModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault(); // Prevent scrolling on Space key.
                    showVerificationModal();
                  }
                }}
                aria-label="Show verification modal"
              >
                {verificationBox ? (
                  <div className="verifed-box">
                    <CheckOutlined style={{ color: "white" }} />
                    <p>VERIFIED</p>
                  </div>
                ) : (
                  <div className="unverifed-box">
                    <CloseCircleFilled style={{ color: "white" }} />
                    <p>UNVERIFIED</p>
                  </div>
                )}
              </div>
            </div>
          </Unverified>
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
                  <div
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                    onClick={() => setMatchListingModal(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); // Prevent scrolling for Space key.
                        setMatchListingModal(true);
                      }
                    }}
                    aria-label="Open match listing modal"
                  >
                    <p className="number-count">{extraData?.totalMatch}</p>
                    <p className="name-info">Match</p>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenHeartLikeModal()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); // Prevent default scroll behavior for the Space key.
                        handleOpenHeartLikeModal();
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    aria-label="Open heart like modal"
                  >
                    <p className="number-count">{extraData?.totalHertLike}</p>
                    <p className="name-info">Superlike</p>
                  </div>
                  <div>
                    <p className="number-count">{extraData?.totalLikes}</p>
                    <p className="name-info">Like</p>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="swipe-btn"
                    onClick={() => setModalSwipe(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setModalSwipe(true);
                      }
                    }}
                    aria-label="Open swipe modal"
                  >
                    <p className="number-count">{extraData?.totalSwipes}</p>
                    <p className="name-info">Swipes</p>
                  </div>

                  {modalSwipe && (
                    <Modal
                      style={{
                        left: "10%",
                        top: "30%",
                      }}
                      open={modalSwipe}
                      onOk={() => setModalSwipe(false)}
                      onCancel={() => setModalSwipe(false)}
                      width="60%"
                      footer={[
                        <Button
                          key="close-button"
                          type="primary"
                          onClick={() => setModalSwipe(false)}
                        >
                          Close
                        </Button>,
                      ]}
                    >
                      <SwipeMatch
                        user_id={id}
                        onCancel={() => setModalSwipe(false)}
                      />
                    </Modal>
                  )}
                </div>
              </div>
              <div className="action-btns">
                <div
                  className="approved-Btn"
                  style={{
                    background:
                      !personlDetail?.isAdminApproved ||
                      activetabs == "Pre-Reg" ||
                      activetabs == "realuser" ||
                      activetabs == "shadow-ban" ||
                      activetabs == "dashboardinfo"
                        ? "#fff"
                        : "transparent",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      background:
                        !personlDetail?.isAdminApproved ||
                        activetabs == "Pre-Reg" ||
                        activetabs == "realuser" ||
                        activetabs == "shadow-ban" ||
                        activetabs == "dashboardinfo"
                          ? "#fff"
                          : "transparent",
                    }}
                  >
                    {!personlDetail?.isAdminApproved &&
                      ![1, 2, 4].includes(personlDetail?.profileStatus) && (
                        <button
                          onClick={() => setApproveModal(true)}
                          className="approved-button"
                          style={{
                            margin: "0px 5px",
                          }}
                        >
                          APPROVE
                        </button>
                      )}
                    {(activetabs == "Pre-Reg" ||
                      activetabs == "realuser" ||
                      activetabs == "shadow-ban" ||
                      activetabs == "dashboardinfo") && (
                      <button
                        className="shadow-ban-btn"
                        onClick={() => handleOpenShadowModal()}
                        style={{
                          background:
                            personlDetail?.isShadowBanned == true
                              ? "red"
                              : "green",
                          margin: "0px 5px",
                        }}
                      >
                        Shadow Ban
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="recomended">
                    <button
                      className="recomended-btn"
                      onClick={() => handlerecomended()}
                    >
                      Recommend V2
                    </button>
                    {activetabs !== "shadow-ban" && (
                      <button
                        className="recomended-hide-btn"
                        onClick={() => handleOpenHideUserModal()}
                        style={{
                          background: personlDetail?.isHideByAdmin
                            ? "red"
                            : "green",
                        }}
                      >
                        Hide
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Cardview>
            <Carddetails>
              <Tabs
                className="tabs"
                size="large "
                activeKey={ActiveTab}
                items={items}
                onChange={onChange}
              />
              <Modals>
                {open && (
                  <Modal
                    title="Edit Basic Info"
                    centered
                    open={open}
                    style={{
                      padding: "0px",
                      background: "black",
                    }}
                    footer={null}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={700}
                  >
                    <Modalbox>
                      <UserBasicInfo
                        setOpen={setOpen}
                        setUserInfo={setUserInfo}
                        getalldetails={getUserInfo}
                        userInfo={userInfo}
                        personlDetail={personlDetail}
                        id={id}
                      />
                    </Modalbox>
                  </Modal>
                )}
                <Modal
                  title="Personal Basic Info"
                  centered
                  open={personalEdit}
                  onCancel={() => setPersonalEdit(false)}
                  width={700}
                  footer={null}
                >
                  <Personalinfoedit>
                    <PersonalInfo
                      personalInfo={personalInfo}
                      setPersonaledit={setPersonalEdit}
                      getalldetails={getUserInfo}
                      id={id}
                    />
                  </Personalinfoedit>
                </Modal>
                <Modal
                  title="Appearance and Habit Info"
                  centered
                  open={showAppearanceModal}
                  onCancel={() => setShowAppearanceModal(false)}
                  width={700}
                  footer={null}
                >
                  <Personalinfoedit>
                    <AppearanceAndHabit
                      apperanceList={appearenceAndHabit}
                      setShowAppearanceModal={setShowAppearanceModal}
                      getalldetails={getUserInfo}
                      id={id}
                    />
                  </Personalinfoedit>
                </Modal>
                <Modal
                  title="Prompts and Inspiration"
                  open={showPrompts}
                  onCancel={() => setShowPrompts(false)}
                  width={600}
                  footer={null}
                >
                  <Modalbox>
                    <PromptsAndInspiration
                      setshowPrompts={setShowPrompts}
                      personalInfo={personalInfo}
                      setPersonaledit={setPersonalEdit}
                      getalldetails={getUserInfo}
                      id={id}
                      personlDetail={personlDetail}
                    />
                  </Modalbox>
                </Modal>
              </Modals>
            </Carddetails>
          </Userinfo>
        </Mainwrapper>
      )}
    </>
  );
}

Userdetails.propTypes = {
  originNode: PropTypes.any,
  file: PropTypes.any,
};

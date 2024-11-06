import React, { useState } from "react";
import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { updatehideuserstatus } from "Services/Collection";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ShadowBanModalWrapper } from "models/GlobalComponentsStyle";
import PropTypes from "prop-types";

const HideUsersModal = ({
  openHideUserModal,
  handleCancelOpenHideUserModal,
  personlDetail,
  getUserInfo,
}) => {
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const { id } = params;
  const handleUpdateHideUserStatus = async () => {
    setLoader(true);
    let req = {
      userId: id,
    };
    let res = await updatehideuserstatus(req);
    if (res.status === 200) {
      setLoader(false);
      toast.success(res.message);
      handleCancelOpenHideUserModal();
      getUserInfo();
    } else {
      setLoader(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };
  return (
    <Modal
      open={openHideUserModal}
      onOk={handleCancelOpenHideUserModal}
      footer={false}
      onCancel={handleCancelOpenHideUserModal}
    >
      <ShadowBanModalWrapper>
        <div className="content">
          <h3>
            {personlDetail?.isHideByAdmin == true
              ? "Are you sure you want to unhide this profile"
              : "Are you sure you want to hide this profile"}
          </h3>
          <WarningOutlined />
        </div>
        <div className="ban-btn">
          {personlDetail?.isHideByAdmin === true ? (
            <button
              style={{ background: "green" }}
              onClick={() => {
                handleUpdateHideUserStatus();
              }}
            >
              {loader ? "Loading..." : "Unhide"}
            </button>
          ) : (
            <button
              style={{ background: "red" }}
              onClick={() => {
                handleUpdateHideUserStatus();
              }}
            >
              {loader ? "Loading..." : "Hide"}
            </button>
          )}
        </div>
      </ShadowBanModalWrapper>
    </Modal>
  );
};
export default HideUsersModal;

HideUsersModal.propTypes = {
  openHideUserModal: PropTypes.bool,
  handleCancelOpenHideUserModal: PropTypes.func,
  personlDetail: PropTypes.object,
  getUserInfo: PropTypes.func,
};

import React from "react";
import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { banUser } from "Services/Collection";
import { toast } from "react-toastify";
import { ShadowBanModalWrapper } from "models/GlobalComponentsStyle";
import PropTypes from "prop-types";

const ShadowBanModal = ({
  openShadowModal,
  handleShadowBanCancel,
  userid,
  isShadowBan,
  getUserInfo,
}) => {
  const handleBanUser = async () => {
    let req = {
      userId: userid,
    };
    let res = await banUser(req);
    if (res.status === 200) {
      toast.success(res.message);
      handleShadowBanCancel();
      getUserInfo();
    } else {
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
      open={openShadowModal}
      onOk={handleShadowBanCancel}
      footer={false}
      onCancel={handleShadowBanCancel}
    >
      <ShadowBanModalWrapper>
        <div className="content">
          <h3>
            {isShadowBan === true
              ? "Are you sure you want to unban this profile"
              : "Are you sure you want to ban this profile"}
          </h3>
          <WarningOutlined />
        </div>
        <div className="ban-btn">
          <button
            onClick={() => handleBanUser()}
            style={{ background: isShadowBan == true ? "green" : "red" }}
          >
            {isShadowBan == true ? "Unban" : "Ban"}
          </button>
        </div>
      </ShadowBanModalWrapper>
    </Modal>
  );
};
export default ShadowBanModal;

ShadowBanModal.propTypes = {
  openShadowModal: PropTypes.bool,
  handleShadowBanCancel: PropTypes.func,
  userid: PropTypes.any,
  isShadowBan: PropTypes.any,
  getUserInfo: PropTypes.func,
};

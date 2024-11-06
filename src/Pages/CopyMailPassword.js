import React, { useRef } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { CopyMailPasswordWrapper } from "StyledComponents";
import PropTypes from "prop-types";

const CopyMailPassword = ({
  openCopyModal,
  handleCancelCopyModal,
  allData,
}) => {
  const textRefs = useRef([]);

  const copyToClipboard = () => {
    let textToCopy = "";
    textRefs.current.forEach((ref) => {
      textToCopy += ref.innerText + "\n"; // Adding a newline for each <p> tag
    });

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Text copied successfuly");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <Modal
      open={openCopyModal}
      onOk={handleCancelCopyModal}
      footer={false}
      onCancel={handleCancelCopyModal}
      width={400}
    >
      <CopyMailPasswordWrapper>
        <div className="content">
          <p className="congratulation">
            Congratulations, {allData?.firstName}! Here are your credentials to
            access the iBeor admin user portal. Please ensure the safety of this
            information and refrain from sharing it with anyone.&quot;
          </p>

          <div className="mail-password-div">
            <p className="copied-text-1">
              Email:{" "}
              <span ref={(el) => (textRefs.current[0] = el)}>
                {allData?.email}
              </span>
            </p>
            <p className="copied-text">
              Password:{" "}
              <span ref={(el) => (textRefs.current[1] = el)}>
                {allData?.password}
              </span>
            </p>
          </div>
          <div className="btn-div">
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      </CopyMailPasswordWrapper>
    </Modal>
  );
};
export default CopyMailPassword;

CopyMailPassword.propTypes = {
  openCopyModal: PropTypes.bool,
  handleCancelCopyModal: PropTypes.func,
  allData: PropTypes.shape({
    firstName: PropTypes.any,
    email: PropTypes.any,
    password: PropTypes.any,
  }),
};

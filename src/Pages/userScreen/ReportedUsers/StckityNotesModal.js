import { Modal } from "antd";
import { StickyWrapper } from "models/ReportedUserStyle";
import PropTypes from "prop-types";
import React from "react";

const styles = {
  background: "#e5e566",
  borderRadius: "1px",
  color: "white",
  minHeight: "60px",
  fontWeight: "bold",
};

export default function StickyNotesModal(props) {
  const { onCancel, open, content } = props;
  return (
    <Modal
      className="sticky-notes"
      onCancel={onCancel}
      open={open}
      bodyStyle={styles}
      footer={false}
    >
      <StickyWrapper>{content}</StickyWrapper>
    </Modal>
  );
}

StickyNotesModal.propTypes = {
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  content: PropTypes.any,
};

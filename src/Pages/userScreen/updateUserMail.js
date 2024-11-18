import React, { useState } from "react";
import { settingUpdate } from "Services/Collection";
import { Button, Modal, Spin } from "antd";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const UpdateUserMail = (props) => {
  const { data = "", id, getalldetails, modal2Open, setModal2Open } = props;
  const [email, setEmail] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await settingUpdate({ email, id });
      if (res?.status === 200) {
        toast.info(res?.message || "update successfully");
        setModal2Open(false);
        setLoading(false);
        getalldetails();
      } else {
        toast.info(res?.response?.data?.message || "update not successfully");
        setModal2Open(false);
        setLoading(false);
      }
    } catch (e) {
      toast.info("Something Went Wrong");
      setModal2Open(false);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCancel = () => {
    setModal2Open(false);
  };

  return (
    <div>
      <Modal
        title="Update Email Settings"
        open={modal2Open}
        onCancel={handleCancel}
        footer={[
          loading ? (
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
              <Button key="submit" type="primary" danger onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleUpdate}>
                Update
              </Button>
            </>
          ),
        ]}
      >
        <label style={{ color: "white" }} htmlFor="email">
          Email
        </label>
        <br />
        <input
          name="email"
          value={email}
          onChange={handleChange}
          style={{
            height: "30px",
            width: "100%",
            background: "#2a2a2a",
            border: "1px solid #484748",
            color: "white",
          }}
        />
      </Modal>
    </div>
  );
};
export default UpdateUserMail;

UpdateUserMail.propTypes = {
  data: PropTypes.string,
  id: PropTypes.any,
  getalldetails: PropTypes.func,
  modal2Open: PropTypes.bool,
  setModal2Open: PropTypes.func,
};

import React, { useState } from "react";
import { settingUpdate } from "Services/Collection";
import { Button, Modal, Spin } from "antd";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const UpdateUserName = (props) => {
  const { data = "", getalldetails, id, modal1Open, setModal1Open } = props;
  const [firstName, setFirstName] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await settingUpdate({ firstName, id });
      if (res?.status === 200) {
        toast.info(res?.message || "update successfully");
        setModal1Open(false);
        setLoading(false);
        getalldetails();
      } else {
        toast.info(res?.response?.data?.message || "update not successfully");
        setModal1Open(false);
        setLoading(false);
      }
    } catch (e) {
      toast.info("Something Went Wrong");
      setLoading(false);
      setModal1Open(false);
    }
  };

  const handleChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleCancel = () => {
    setModal1Open(false);
  };

  return (
    <>
      <Modal
        title="Update Settings"
        open={modal1Open}
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
        <label style={{ color: "white" }}>Name</label>
        <br />
        <input
          name="firstName"
          value={firstName}
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
    </>
  );
};
export default UpdateUserName;

UpdateUserName.propTypes = {
  data: PropTypes.string,
  getalldetails: PropTypes.func,
  id: PropTypes.any,
  modal1Open: PropTypes.bool,
  setModal1Open: PropTypes.func,
};

import React, { useEffect, useState } from "react";
import { settingUpdate } from "Services/Collection";
import { Button, Modal, Spin } from "antd";
import { toast } from "react-toastify";
import { dialingCodeList } from "Component/contactData/dialing";
import { FieldWrapper, LabelWrapper } from "models/UserScreenStyle";
import PropTypes from "prop-types";

const NUMERIC_REGEXP = /[-]?\d*/g;
const UpdateUserPhoneNo = (props) => {
  const {
    data = "",
    id,
    getalldetails,
    showPhoneModal,
    setShowPhoneModal,
    countryCode,
  } = props;

  const [phoneNumber, SetPhoneNo] = useState(data);
  const [dialingCode, setDialingCode] = useState();
  const [loading, setLoading] = useState(false);

  const setDefaultDialingCode = async () => {
    const numbers = countryCode.match(NUMERIC_REGEXP).join("");
    let index = await dialingCodeList.findIndex(
      (list) => list.code === numbers
    );
    if (index !== -1) setDialingCode(dialingCodeList[index]?.code);
  };

  useEffect(() => {
    setDefaultDialingCode();
  }, [countryCode]);

  const handleUpdate = async () => {
    setLoading(true);
    let req = {
      id: id,
      phoneNumber: phoneNumber,
      dialingCode: dialingCode,
    };

    try {
      const res = await settingUpdate(req);
      if (res?.status === 200) {
        toast.info(res?.message || "update successfully");
        setShowPhoneModal(false);
        setLoading(false);
        getalldetails();
      } else {
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "update not successfully"
        );
        setShowPhoneModal(false);
        setLoading(false);
      }
    } catch (e) {
      toast.info("Something Went Wrong");
      setLoading(false);
      setShowPhoneModal(false);
    }
  };

  const handleChange = (e) => {
    SetPhoneNo(e.target.value);
  };

  const handleCancel = () => {
    setShowPhoneModal(false);
  };

  const handleDialNoChange = (e) => {
    setDialingCode(e.target.value);
  };

  return (
    <>
      <Modal
        title="Update Settings"
        open={showPhoneModal}
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
        <LabelWrapper>
          <span>Contact</span>
        </LabelWrapper>
        <FieldWrapper>
          <select
            value={dialingCode}
            onChange={handleDialNoChange}
            name="countryCode"
            id="settings_countrycode"
            className="custome-select"
            data-placeholder="Choose a Category"
          >
            {dialingCodeList.map((list) => (
              <option
                key={list?.code}
                data-countryCode={list.iso}
                value={list.code}
              >
                {list.country + "(" + list.code + ")"}
              </option>
            ))}
          </select>
          <input
            name="PhoneNo"
            type="number"
            value={phoneNumber}
            onChange={handleChange}
          />
        </FieldWrapper>
      </Modal>
    </>
  );
};
export default UpdateUserPhoneNo;

UpdateUserPhoneNo.propTypes = {
  data: PropTypes.string,
  id: PropTypes.any,
  getalldetails: PropTypes.func,
  showPhoneModal: PropTypes.bool,
  setShowPhoneModal: PropTypes.func,
  countryCode: PropTypes.any,
};

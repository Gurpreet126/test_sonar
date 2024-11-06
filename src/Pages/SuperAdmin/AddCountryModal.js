import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { addCountry } from "Services/Collection";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AddCountryModalWrapper } from "models/SuperAdminStyle";

const AddCountryModal = ({
  openAddCountryModal,
  handleCancelAddCountryModl,
  handleGetCountryListing,
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    countryName: "",
  };
  const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country name is required"),
  });

  const onSubmitAddCountry = async (e) => {
    setLoading(true);
    let req = {
      countryName: e?.countryName,
    };
    let res = await addCountry(req);
    if (res.status === 200) {
      setLoading(false);
      toast.success(res.message);
      handleCancelAddCountryModl();
      handleGetCountryListing();
    } else {
      setLoading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
      handleCancelAddCountryModl();
    }
  };

  return (
    <Modal
      open={openAddCountryModal}
      onOk={handleCancelAddCountryModl}
      footer={false}
      onCancel={handleCancelAddCountryModl}
    >
      <AddCountryModalWrapper>
        <div className="content">
          <h3>Add Country</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitAddCountry}
          >
            <Form>
              <label>Country Name</label>
              <Field type="text" name="countryName" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="countryName" />
              </div>
              <div className="ban-btn">
                <button type="submit">{loading ? "Loading..." : "Add"}</button>
              </div>
            </Form>
          </Formik>
        </div>
      </AddCountryModalWrapper>
    </Modal>
  );
};
export default AddCountryModal;

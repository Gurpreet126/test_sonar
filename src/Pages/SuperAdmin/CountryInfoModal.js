import React, { useState } from "react";
import { Modal, Spin } from "antd";
import styled from "styled-components";
import { deletecountry, editcountry } from "Services/Collection";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { DeleteCountry, EditCountry } from "Utils/Image";
import * as Yup from "yup";
import { CountryInfoModalWrapper } from "models/SuperAdminStyle";

const CountryInfoModal = ({
  deleteData,
  openCountryInfoModal,
  handleCancelOpenCountryModal,
  handleGetCountryListing,
}) => {
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showEditSection, setShowEditSection] = useState(false);

  const initialValues = {
    countryName: deleteData?.countryName,
  };
  const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country name is required"),
  });

  const handleDeleteCountry = async () => {
    setDeleteLoading(true);
    let req = {
      countryId: deleteData?._id,
    };
    let res = await deletecountry(req);
    if (res.status === 200) {
      setDeleteLoading(false);
      toast.success(res.message);
      handleCancelOpenCountryModal();
      handleGetCountryListing();
    } else {
      setDeleteLoading(false);
      handleCancelOpenCountryModal();
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const handleEditCountry = async (e) => {
    setEditLoading(true);
    let req = {
      countryId: deleteData?._id,
      countryName: e?.countryName || deleteData?.countryName,
    };
    let res = await editcountry(req);
    if (res.status === 200) {
      setEditLoading(false);
      toast.success(res.message);
      handleCancelOpenCountryModal();
      handleGetCountryListing();
    } else {
      setEditLoading(false);
      handleCancelOpenCountryModal();
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
      open={openCountryInfoModal}
      onOk={handleCancelOpenCountryModal}
      footer={false}
      onCancel={handleCancelOpenCountryModal}
    >
      <CountryInfoModalWrapper>
        <div className="content">
          <h3>Are you want to delete or edit the country?</h3>
          <p className="edit-or-delete">
            {deleteData?.countryName}
            <span>
              <img
                role="button"
                tabIndex={0}
                src={EditCountry}
                alt=""
                onClick={() => setShowEditSection(true)}
              />
              {deleteLoading ? (
                <Spin />
              ) : (
                <img
                  role="button"
                  tabIndex={0}
                  src={DeleteCountry}
                  alt=""
                  onClick={() => handleDeleteCountry()}
                />
              )}
            </span>
          </p>

          {showEditSection && (
            <div className="edit-section">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleEditCountry}
              >
                <Form>
                  <label className="label" htmlFor="countryName">
                    Country Name
                  </label>
                  <Field type="text" name="countryName" className="input" />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="countryName" />
                  </div>
                  <div className="buttons">
                    <button type="submit">
                      {editLoading ? "Loading..." : "Update"}
                    </button>

                    <button onClick={() => handleCancelOpenCountryModal()}>
                      {" "}
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}

          {showEditSection ? (
            ""
          ) : (
            <div className="buttons">
              <button> Cancel</button>
            </div>
          )}
        </div>
      </CountryInfoModalWrapper>
    </Modal>
  );
};
export default CountryInfoModal;

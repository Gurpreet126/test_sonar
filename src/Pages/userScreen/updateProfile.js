import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import RadioBoxGroup from "Component/radioButton";
import { bodyType, exercise, drink } from "./data";

const ApperanceHabit = (props) => {
  const { apperanceList, setShowAppearanceModal, id } = props;

  const handleSubmit = (valueszxsdfsdf) => {};
  const handleClose = () => {
    setShowAppearanceModal(false);
  };
  const validateSchema = Yup.object().shape({});
  return (
    <>
      <Formik
        initialValues={apperanceList}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="vertical-checkbox">
            <div className="modal-cheakbox">
              <div className="left-box">
                <label>Education</label>
                <RadioBoxGroup
                  options={bodyType}
                  name="bodyType"
                  value={values.bodyType}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-cheakbox">
              <div className="right-box">
                <label>Children</label>
                <RadioBoxGroup
                  options={exercise}
                  name="exercise"
                  value={values.exercise}
                  onChange={handleChange}
                />
              </div>
              <div className="left-box">
                <label>Astrology sign</label>
                <RadioBoxGroup
                  options={drink}
                  name="drink"
                  value={values.drink}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-cheakbox">
              <div className="right-box">
                <label>Religion</label>
                <RadioBoxGroup
                  options={drink}
                  name="smoker"
                  value={values.smoker}
                  onChange={handleChange}
                />
              </div>
              <div className="left-box">
                <label>Education</label>
                <RadioBoxGroup
                  options={drink}
                  name="marijuana"
                  value={values.marijuana}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-info">
              <button
                className="btn-style close"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
              <button className="btn-style update" type="submit">
                Update
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ApperanceHabit;

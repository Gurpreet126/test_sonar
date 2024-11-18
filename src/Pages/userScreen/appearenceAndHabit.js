import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import RadioBoxGroup from "Component/radioButton";
import { bodyType, excercise, drink } from "./data";
import { heightArray } from "Utils/commanMethod";
import { updateBasicPersonalInfo } from "Services/Collection";
import { Spin } from "antd";
import PropTypes from "prop-types";

const AppearanceAndHabit = (props) => {
  const { apperanceList, setShowAppearanceModal, getalldetails, id } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    let req = {
      bodyType: values?.bodyType !== "None" ? values?.bodyType : "",
      drink: values?.drink !== "None" ? values?.drink : "",
      exercise: values?.exercise !== "None" ? values?.exercise : "",
      id: id,
      marijuana: values?.marijuana !== "None" ? values?.marijuana : "",
      smoker: values?.smoker !== "None" ? values?.smoker : "",
      height: values?.height ? values?.height : "",
    };
    try {
      let res = await updateBasicPersonalInfo(req);
      if (res?.status === 200) {
        setLoading(false);
        setShowAppearanceModal(false);
        getalldetails();
        toast.info(res?.message || "updation success");
      } else {
        setLoading(false);
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
        setShowAppearanceModal(false);
      }
    } catch (e) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  const handleClose = () => {
    setShowAppearanceModal(false);
  };
  const validateSchema = Yup.object().shape({
    // height: Yup.string().required("field is required")
  });
  return (
    <div>
      <Formik
        initialValues={apperanceList}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="vertical-checkbox">
            <div className="flex-section">
              <div className="field-wrapper">
                <label className="subheading" htmlFor="height">
                  Heights
                </label>
                <select
                  name="height"
                  value={values.height}
                  onChange={handleChange}
                  className="select-style"
                >
                  {heightArray.map((list) => {
                    return (
                      <option
                        value={list.cm}
                        key={list?.cm}
                        selected={values.height === list.cm}
                      >
                        {list.height}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="field-wrapper">
                <label className="subheading" htmlFor="bodyType">
                  BodyType
                </label>
                <RadioBoxGroup
                  options={bodyType}
                  name="bodyType"
                  value={values.bodyType}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex-section">
              <div className="field-wrapper">
                <label className="subheading" htmlFor="exercise">
                  Exercise
                </label>
                <RadioBoxGroup
                  options={excercise}
                  name="exercise"
                  value={values.exercise}
                  onChange={handleChange}
                />
              </div>
              <div className="field-wrapper">
                <label className="subheading" htmlFor="drink">
                  Drink
                </label>
                <RadioBoxGroup
                  options={drink}
                  name="drink"
                  value={values.drink}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex-section">
              <div className="field-wrapper">
                <label className="subheading" htmlFor="smoker">
                  Smoker
                </label>
                <RadioBoxGroup
                  options={drink}
                  name="smoker"
                  value={values.smoker}
                  onChange={handleChange}
                />
              </div>
              <div className="field-wrapper">
                <label className="subheading" htmlFor="marijuana">
                  Marijuana
                </label>
                <RadioBoxGroup
                  options={drink}
                  name="marijuana"
                  value={values.marijuana}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-info">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                  }}
                >
                  <Spin />
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AppearanceAndHabit;

AppearanceAndHabit.propTypes = {
  apperanceList: PropTypes.any,
  setShowAppearanceModal: PropTypes.func,
  getalldetails: PropTypes.func,
  id: PropTypes.any,
};

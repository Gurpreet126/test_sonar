import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CheckboxGroup from "Component/checkbox";
import { Spin } from "antd";
import RadioBoxGroup from "Component/radioButton";
import {
  lookingFor,
  pets,
  interest,
  children,
  education,
  religion,
  astrologySign,
  marriage,
} from "./data";
import { updateBasicPersonalInfo } from "Services/Collection";
import PropTypes from "prop-types";

const PersonalInfo = (props) => {
  const { personalInfo, getalldetails, setPersonaledit, id } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    if (values?.interest.length > 5) {
      toast.error("You can select only upto 5 Interests ");
      setLoading(false);
    } else {
      setLoading(true);
      let req = {
        Education: values?.Education !== "None" ? values?.Education : "",
        astrologicalSign:
          values?.astrologicalSign !== "None" ? values?.astrologicalSign : "",
        childrens: values?.childrens !== "None" ? values?.childrens : "",
        interest: values?.interest,
        lookingFor: values?.lookingFor,
        pets: values?.pets,
        religion: values?.religion !== "None" ? values?.religion : "",
        id: id,
        marriage: values?.marriage,
      };

      try {
        let res = await updateBasicPersonalInfo(req);
        if (res?.status === 200) {
          toast.info(res?.message || "update successfully");
          setLoading(false);
          setPersonaledit(false);
          getalldetails();
        } else {
          toast.error(
            res.response.data.message ||
              res.error ||
              res.message ||
              "Something went wrong"
          );
          setPersonaledit(false);
          setLoading(false);
        }
      } catch (e) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setPersonaledit(false);
  };
  const validateSchema = Yup.object().shape({});
  return (
    <>
      <Formik
        initialValues={personalInfo}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="vertical-checkbox">
            <div className="modal-cheakbox">
              <div className="left-box">
                <label className="subheading" htmlFor="lookingFor">Looking For</label>

                <Field name="lookingFor">
                  {({ field }) => (
                    <CheckboxGroup
                      options={lookingFor}
                      name="lookingFor"
                      defaultValue={values?.lookingFor}
                      {...field}
                      onChange={(value) => {
                        let valueDetail = field.onChange({
                          target: { name: field.name, value: value },
                        });
                        handleChange(valueDetail);
                      }}
                    />
                  )}
                </Field>
              </div>
              <div className="right-box">
                <label className="subheading" htmlFor="pets">Pets</label>
                <Field name="pets">
                  {({ field }) => (
                    <CheckboxGroup
                      options={pets}
                      name="pets"
                      defaultValue={values.pets}
                      {...field}
                      onChange={(value) => {
                        let valueDetail = field.onChange({
                          target: { name: field.name, value: value },
                        });
                        handleChange(valueDetail);
                      }}
                    />
                  )}
                </Field>
              </div>
              <div className="right-box">
                <label className="subheading" htmlFor="marriage">Marriage History</label>
                <RadioBoxGroup
                  options={marriage}
                  name="marriage"
                  value={values.marriage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-cheakbox">
              <div className="left-box">
                <label className="subheading" htmlFor="interest">Interests</label>
                <Field name="interest">
                  {({ field }) => (
                    <CheckboxGroup
                      options={interest}
                      name="interest"
                      defaultValue={values.interest}
                      {...field}
                      onChange={(value) => {
                        let valueDetail = field.onChange({
                          target: { name: field.name, value: value },
                        });
                        handleChange(valueDetail);
                      }}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className="modal-cheakbox">
              <div className="right-box">
                <label className="subheading" htmlFor="childrens">Children</label>
                <RadioBoxGroup
                  options={children}
                  name="childrens"
                  value={values.childrens}
                  onChange={handleChange}
                />
              </div>
              <div className="left-box">
                <label className="subheading" htmlFor="Education">Education</label>
                <RadioBoxGroup
                  options={education}
                  name="Education"
                  value={values.Education}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-cheakbox">
              <div className="right-box">
                <label className="subheading" htmlFor="religion">Religion</label>
                <RadioBoxGroup
                  options={religion}
                  name="religion"
                  value={values.religion}
                  onChange={handleChange}
                />
              </div>
              <div className="left-box">
                <label className="subheading" htmlFor="astrologicalSign">Astrology sign</label>
                <RadioBoxGroup
                  options={astrologySign}
                  name="astrologicalSign"
                  value={values.astrologicalSign}
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
                    paddingLeft: "10px",
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
    </>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  personalInfo: PropTypes.any,
  getalldetails: PropTypes.func,
  setPersonaledit: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

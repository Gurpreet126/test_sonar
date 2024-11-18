import React, { useMemo, useState } from "react";
import { updateBasicPersonalInfo } from "Services/Collection";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { countries } from "Component/contactData/country";
import moment from "moment";
import { lang } from "Component/contactData/Language";
import { Select, Spin } from "antd";
import PropTypes from "prop-types";

const UserBasicInfo = (props) => {
  const { setOpen, getalldetails, personlDetail, id } = props;
  const iduser = id;
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(personlDetail?.lang);

  const options = lang.map((list) => ({
    label: list.name,
    value: list.name,
  }));
  const initialValues = useMemo(() => {
    if (personlDetail) {
      return {
        dob: moment(personlDetail?.dob).format("YYYY-MM-DD"),
        gender: personlDetail?.gender === 0 ? "male" : "female",
        about_me: personlDetail?.aboutMe,
        current_work: personlDetail?.currentWork,
        school: personlDetail?.school,
        city: personlDetail?.originCity,
        state: personlDetail?.originState,
        lang: personlDetail?.lang,
        roots_one: personlDetail?.country_1,
        roots_two: personlDetail?.country_2,
        country: personlDetail?.country,
        latitude: personlDetail?.location?.coordinates[1],
        longitude: personlDetail?.location?.coordinates[0],
      };
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    if (language.length > 3) {
      toast.error("maximum 3 languages should be selected");
    } else {
      let dob = moment(values.dob).unix() * 1000;
      const id = iduser;

      const getyear = (dob) => {
        if (dob) {
          let date = dob / 1000;
          let birthyear = moment.unix(date).format("YYYY");
          let currentyear = moment().format("YYYY");
          let age = currentyear - birthyear;
          return age;
        } else {
          return 0;
        }
      };

      let req = {
        id: id,
        aboutMe: values.about_me,
        city: values.city,
        country: values.country,
        lang: language,
        currentWork: values.current_work,
        gender: values.gender,
        latitude: values.latitude,
        longitude: values.longitude,
        roots_one: values.roots_one,
        roots_two: values.roots_two,
        school: values.school,
        state: values.state,
        dob: dob,
        age: getyear(dob),
      };

      if (values.gender == "male") {
        req.gender = 0;
      }
      if (values.gender == "female") {
        req.gender = 1;
      }
      try {
        let res = await updateBasicPersonalInfo(req);
        if (res?.status === 200) {
          toast.info(res?.message || "update successfully");
          setOpen(false);
          setLoading(false);
          getalldetails();
        } else {
          toast.error(
            res.response.data.message ||
              res.error ||
              res.message ||
              "Something went wrong"
          );
          setLoading(false);
        }
      } catch (e) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  const validateSchema = Yup.object().shape({
    dob: Yup.string()
      .test("DOB", "You must be at least 18 years", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      })
      .required("Required*"),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-info">
            <label className="subheading" htmlFor="dob">
              Birthday
            </label>
            <br />
            <input
              type="date"
              id="birthday"
              name="dob"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dob}
            />
            {errors.dob && touched.dob && (
              <span className="error">{errors.dob}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="gender">
              Gender
            </label>
            <br />
            <select
              name="gender"
              defaultValue={values.gender == "male" ? 0 : 1}
              onChange={handleChange}
            >
              <option hidden selected>
                Select
              </option>
              <option value={0}> Male</option>
              <option value={1}> Female</option>
            </select>
            {errors.gender && touched.gender && (
              <span className="error">{errors.gender}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="about_me">
              About me
            </label>
            <br />
            <textarea
              id="about_me"
              name="about_me"
              value={values.about_me}
              onChange={handleChange}
            />
            {errors.about_me && (
              <span className="error">{errors.about_me}</span>
            )}
          </div>

          <div className="modal-info">
            <label className="subheading" htmlFor="language">
              language
            </label>
            <br />
            <Select
              mode="multiple"
              size="middle"
              name="language"
              className="abcd"
              placeholder="Please select"
              onChange={(value) => setLanguage(value)}
              style={{
                width: "100%",
                color: "white",
              }}
              defaultValue={values?.lang}
              options={options}
            />

            {errors.language && touched.language && (
              <span className="error">{errors.lang}</span>
            )}
          </div>

          <div className="modal-info">
            <label className="subheading" htmlFor="current_work">
              Current Work
            </label>
            <br />
            <input
              type="text"
              name="current_work"
              value={values.current_work}
              onChange={handleChange}
            />
            {errors.current_work && touched.current_work && (
              <span className="error">{errors.current_work}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="school">
              School
            </label>
            <br />
            <input
              type="text"
              name="school"
              value={values.school}
              onChange={handleChange}
            />
            {errors.school && touched.school && (
              <span className="error">{errors.school}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="city">
              City
            </label>
            <br />
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
            />
            {errors.city && touched.city && (
              <span className="error">{errors.city}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="state">
              State
            </label>
            <br />
            <input
              type="text"
              name="state"
              value={values.state}
              onChange={handleChange}
            />
            {errors.state && touched.state && (
              <span className="error">{errors.state}</span>
            )}
          </div>
          <div className="modal-info">
            <label className="subheading" htmlFor="country">
              Country
            </label>
            <br />
            <input
              type="text"
              name="country"
              value={values.country}
              onChange={handleChange}
            />
            {errors.country && touched.country && (
              <span className="error">{errors.country}</span>
            )}
          </div>
          {/* Roots */}

          <div className="modal-info">
            <label className="subheading" htmlFor="roots_one">
              Roots
            </label>
            <hr />
          </div>

          <div className="flex-section">
            <div className="field-wrapper">
              <select
                name="roots_one"
                value={values.roots_one}
                onChange={handleChange}
              >
                {countries?.map((list) => {
                  return (
                    <option
                      value={list?.name != "None" ? list?.name : ""}
                      key={list?.code}
                      selected={values?.roots_one === list?.name}
                    >
                      {list?.name}
                    </option>
                  );
                })}
              </select>
              {errors.roots_one && touched.roots_one && (
                <span className="error">{errors.roots_one}</span>
              )}
            </div>
            <div className="field-wrapper">
              <select
                name="roots_two"
                value={values.roots_two}
                onChange={handleChange}
              >
                {countries?.map((list, index) => {
                  return (
                    <option
                      value={list?.name != "None" ? list?.name : ""}
                      key={list?.code}
                      selected={values.roots_two === list?.name}
                    >
                      {list?.name}
                    </option>
                  );
                })}
              </select>
              {errors.roots_two && touched.roots_two && (
                <span className="error">{errors.roots_two}</span>
              )}
            </div>
          </div>

          <div className="flex-section">
            <div className="field-wrapper">
              <label className="subheading" htmlFor="latitude">
                Lat
              </label>
              <input
                type="text"
                name="latitude"
                value={values.latitude}
                onChange={handleChange}
              />
              {errors.latitude && touched.latitude && (
                <span className="error">{errors.latitude}</span>
              )}
            </div>
            <div className="field-wrapper">
              <label className="subheading" htmlFor="longitude">
                Long
              </label>
              <input
                type="text"
                name="longitude"
                value={values.longitude}
                onChange={handleChange}
              />
              {errors.longitude && touched.longitude && (
                <span className="error">{errors.longitude}</span>
              )}
            </div>
          </div>
          <div className="modal-info">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
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
  );
};
export default UserBasicInfo;

UserBasicInfo.propTypes = {
  setOpen: PropTypes.func,
  getalldetails: PropTypes.func,
  personlDetail: PropTypes.shape({
    lang: PropTypes.any,
    dob: PropTypes.any,
    gender: PropTypes.any,
    aboutMe: PropTypes.any,
    currentWork: PropTypes.any,
    school: PropTypes.any,
    originCity: PropTypes.any,
    originState: PropTypes.any,
    country_1: PropTypes.any,
    country_2: PropTypes.any,
    country: PropTypes.any,
    location: PropTypes.shape({
      coordinates: PropTypes.any,
    }),
  }),
  id: PropTypes.any,
};

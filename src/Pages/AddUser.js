import React, { useState } from "react";
import { Mainheading, Mainwrapper, Validationbox } from "./Stylepage";
import { RightOutlined, UserAddOutlined } from "@ant-design/icons";
import { Formik, Field, Form } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { Spin } from "antd";
import { addUserByAdmin } from "Services/Collection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { countries } from "Component/contactData/country";
import { Formdata, Formdatainner } from "StyledComponents";

export default function AddUser() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [country2, setCountry2] = useState("");

  const handlesubmit = async (values) => {
    if (image.length > 6) toast.error("You can upload maximum 6 photos");
    else {
      setLoading(true);
      let dob = moment(values.date).unix() * 1000;
      let data = new FormData();
      data.append("phoneNumber", values.contactNumber);
      data.append("email", values.email);
      data.append("firstName", values.firstname);
      data.append("dob", dob);
      data.append("gender", values.gender ? 0 : 1);
      data.append("country_1", country);
      data.append("country_2", country2);
      data.append("lat", values?.long);
      data.append("long", values?.lat);
      data.append("dialingCode", values.countryCode);
      for (const img of image) {
        data.append("photo", img, img.name);
      }

      let res = await addUserByAdmin(data);
      if (res.status === 200) {
        setLoading(false);
        navigate(-1);
        toast.success(res?.response?.data?.message || res.error, {
          theme: "colored",
        });
      } else {
        setLoading(false);
        toast.error(res?.response?.data?.message || res.error || res.message, {
          theme: "colored",
        });
      }
    }
  };
  const validation = Yup.object().shape({
    firstname: Yup.string().trim().required("Required*"),
    email: Yup.string().trim().email("Invalid email").required("Required*"),
    gender: Yup.string().trim().required("Required*"),
    date: Yup.string()
      .test("DOB", "You must be at least 18 years", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      })
      .required("Required*"),
    lat: Yup.number()
      .min(0.1)
      .max(99, "Maximum digit should be less than 99")
      .required("Required*"),
    long: Yup.number()
      .min(0.1)
      .max(99, "Maximum digit should be less than 99")
      .required("Required*"),
    contactNumber: Yup.string().trim().required("Required*"),
    myfile: Yup.mixed().required("Required*"),
  });

  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Add User</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined className="right-icon" />
            <span className="current-page">Add User</span>
          </p>
        </div>
      </Mainheading>
      <Formdata>
        <Formdatainner>
          <div className="personal-info">
            <UserAddOutlined />
            <p>Personal Info</p>
          </div>
          <Formik
            initialValues={{
              firstname: "",
              email: "",
              gender: "",
              date: "",
              lat: "",
              long: "",
              countryCode: "",
              contactNumber: "",
              myfile: "",
            }}
            onSubmit={handlesubmit}
            validationSchema={validation}
            render={({ touched, errors, values, setFieldValue }) => (
              <Form>
                <div className="form-data">
                  <div className="form-details">
                    <div className="form-input">
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <br />
                        <Field id="firstname" name="firstname" />
                        <Validationbox>
                          {errors.firstname && touched.firstname ? (
                            <p className="error-text">{errors.firstname}</p>
                          ) : null}
                        </Validationbox>
                      </div>
                      <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <Field id="email" name="email" />
                        <Validationbox>
                          {errors.email && touched.email ? (
                            <p className="error-text">{errors.email}</p>
                          ) : null}{" "}
                        </Validationbox>
                      </div>
                    </div>

                    <div className="form-input">
                      <div>
                        <label htmlFor="cars">Gender</label>
                        <br />
                        <Field as="select" name="gender">
                          <option selected hidden>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                        <Validationbox>
                          {errors.gender && touched.gender ? (
                            <p className="error-text">{errors.gender}</p>
                          ) : null}
                        </Validationbox>
                      </div>
                      <div>
                        <label htmlFor="date">Date of Birth</label>
                        <br />
                        <Field name="date" type="date" />
                        <Validationbox>
                          {errors.date && touched.date ? (
                            <p className="error-text">{errors.date}</p>
                          ) : null}
                        </Validationbox>
                      </div>
                    </div>
                    <div className="form-input">
                      <div>
                        <label htmlFor="lat">Lat</label>
                        <br />
                        <Field id="lat" type="number" name="lat" />
                        <Validationbox>
                          {errors.lat && touched.lat ? (
                            <p className="error-text">{errors.lat}</p>
                          ) : null}
                        </Validationbox>
                      </div>
                      <div>
                        <label htmlFor="long">Long</label>
                        <br />
                        <Field id="long" name="long" type="number" />
                        <Validationbox>
                          {errors.long && touched.long ? (
                            <p className="error-text">{errors.long}</p>
                          ) : null}
                        </Validationbox>
                      </div>
                    </div>
                    <div className="phone-input">
                      <label htmlFor="phone">Phone</label>
                      <br />
                      <PhoneInput
                        name="contactNumber"
                        country="us"
                        value={values?.countryCode + values?.contactNumber}
                        onChange={(value, data) => {
                          setFieldValue("countryCode", "+" + data.dialCode);
                          setFieldValue(
                            "contactNumber",
                            value.substring(data.dialCode.length, 20)
                          );
                        }}
                      />
                      <Validationbox>
                        {errors.contactNumber && touched.contactNumber ? (
                          <p className="error-text">{errors.contactNumber}</p>
                        ) : null}
                      </Validationbox>
                    </div>

                    <div className="personal-info">
                      <UserAddOutlined />
                      <p>Roots</p>
                    </div>
                    <div className="form-input">
                      <div>country 1</div>

                      <select
                        name="roots_one"
                        value={values.roots_one}
                        onChange={(e) => setCountry(e.target.value)}
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
                    </div>
                    <div className="form-input">
                      <div>country 2</div>
                      <select
                        name="roots_two"
                        value={values.roots_two}
                        onChange={(e) => setCountry2(e.target.value)}
                      >
                        {countries?.map((list, index) => {
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
                    </div>

                    <div className="personal-info">
                      <UserAddOutlined />
                      <p>Add Photos</p>
                    </div>
                    <div>
                      <input
                        multiple
                        type="file"
                        name="myfile"
                        onChange={(e) => {
                          setImage(e.target.files);
                          setFieldValue("myfile", e.target.files);
                        }}
                        accept="image/*"
                      />
                      <Validationbox>
                        {errors.myfile && touched.myfile && (
                          <p className="error-text">{errors.myfile}</p>
                        )}
                      </Validationbox>
                    </div>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "15px",
                          paddingTop: "5px",
                        }}
                      >
                        <Spin />
                      </div>
                    ) : (
                      <div className="add-box">
                        <button className="add-btn">Add</button>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          />
        </Formdatainner>
      </Formdata>{" "}
    </Mainwrapper>
  );
}

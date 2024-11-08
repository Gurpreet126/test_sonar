// import React, { useState } from "react";
// import Header from "../Component/Header";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form } from "formik";
// import { loginAuth, updatePassword } from "../Services/Collection";
// import { useDispatch } from "react-redux";
// import { authlogin } from "../Store/Authlogin";
// import { toast } from "react-toastify";
// import { getAuth, signInAnonymously } from "firebase/auth";
// import { Spin } from "antd";
// import * as Yup from "yup";
// import {
//   AuthLoaderWrapper,
//   Loginform,
//   Loginheading,
//   LoginPagedetails,
//   Loginwrapper,
// } from "StyledComponents";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setloading] = useState(false);
//   const [isAdminFirstTime, setIsAdminFirstTime] = useState(true);

//   const createUserOnFirebase = async () => {
//     const auth = getAuth();
//     signInAnonymously(auth)
//       .then(() => {
//         // Signed in..
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         toast.error(errorMessage);
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     oldPassword: Yup.string().required("Old Password required"),
//     newPassword: Yup.string().required("New Password required"),
//     confirmPassword: Yup.string()
//       .required("Password is required")
//       .oneOf([Yup.ref("newPassword")], "Passwords must match"),
//   });

//   const initialValues = {
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   };

//   const handleSubmit = async (values) => {
//     try {
//       setloading(true);
//       let req = {
//         email: values.email.toLowerCase(),
//         password: values.password,
//       };
//       let res = await loginAuth(req);

//       if (res.status === 200) {
//         setloading(false);
//         dispatch(authlogin(res.data));
//         createUserOnFirebase();
//         navigate("/dashboard/dashboardinfo");
//       } else {
//         setloading(false);
//         dispatch(authlogin(res?.response?.data));
//         setIsAdminFirstTime(
//           res?.response?.data?.data?.firstTimeChangedPasswordStatus
//         );
//         toast.error(res?.response?.data?.message || res.error || res.message, {
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       setloading(false);
//       toast.error(error?.message || error, {
//         theme: "colored",
//       });
//     }
//   };
//   const validation = Yup.object().shape({
//     email: Yup.string().trim().email("Invalid email").required("Required*"),
//     password: Yup.string().trim().required("Required*"),
//   });

//   const handleSubmitNewPass = async (values) => {
//     setloading(true);
//     let req = {
//       oldPassword: values.oldPassword,
//       newPassword: values.newPassword,
//     };
//     let res = await updatePassword(req);
//     if (res.status === 200) {
//       setloading(false);
//       toast.success(res.message);
//       setIsAdminFirstTime(true);
//     } else {
//       setloading(false);
//       toast.error(
//         res.response.data.message ||
//           res.error ||
//           res.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   return (
//     <Loginwrapper>
//       <Header />
//       <Loginheading>
//         <h1>Sign in to iBeor admin</h1>
//       </Loginheading>
//       <Loginform>
//         <div className="form-heading">
//           <h6>Login</h6>
//         </div>
//         <LoginPagedetails>
//           {isAdminFirstTime == false ? (
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmitNewPass}
//             >
//               {({ errors, touched }) => (
//                 <Form>
//                   <div className="login-wrapper">
//                     <div className="email-section">
//                       <div
//                         className="email-label"
//                         style={{ width: "max-content" }}
//                       >
//                         <label style={{ whiteSpace: "nowrap" }}>
//                           Old Password:
//                         </label>
//                       </div>
//                       <div>
//                         <Field
//                           name="oldPassword"
//                           type="password"
//                           className="form-input"
//                         ></Field>
//                         {errors.oldPassword && touched.oldPassword ? (
//                           <div className="error-box">{errors.oldPassword}</div>
//                         ) : null}
//                       </div>
//                     </div>
//                     <div className="email-section">
//                       <label>New Password:</label>
//                       <div>
//                         <Field
//                           name="newPassword"
//                           type="password"
//                           className="form-input"
//                         ></Field>
//                         {errors.newPassword && touched.newPassword ? (
//                           <div className="error-box">{errors.newPassword}</div>
//                         ) : null}
//                       </div>
//                     </div>
//                     <div className="email-section">
//                       <label>Confirm Password:</label>
//                       <div>
//                         <Field
//                           name="confirmPassword"
//                           type="password"
//                           className="form-input"
//                         ></Field>
//                         {errors.confirmPassword && touched.confirmPassword ? (
//                           <div className="error-box">
//                             {errors.confirmPassword}
//                           </div>
//                         ) : null}
//                       </div>
//                     </div>
//                     <div className="login">
//                       {loading ? (
//                         <AuthLoaderWrapper>
//                           <Spin size="large" />
//                         </AuthLoaderWrapper>
//                       ) : (
//                         <div className="login-section">
//                           <button className="login-btn" type="submit">
//                             Update
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           ) : (
//             <Formik
//               initialValues={{ email: "", password: "" }}
//               onSubmit={handleSubmit}
//               validationSchema={validation}
//             >
//               {({ errors, touched }) => (
//                 <Form>
//                   <div className="login-wrapper">
//                     <div className="email-section">
//                       <div className="email-label">
//                         <label>Email:</label>
//                       </div>
//                       <div>
//                         <Field
//                           name="email"
//                           type="text"
//                           className="form-input"
//                         ></Field>
//                         {errors.email && touched.email ? (
//                           <div className="error-box">{errors.email}</div>
//                         ) : null}
//                       </div>
//                     </div>
//                     <div className="email-section">
//                       <label>Password:</label>
//                       <div>
//                         <Field
//                           name="password"
//                           type="password"
//                           className="form-input"
//                         ></Field>
//                         {errors.password && touched.password ? (
//                           <div className="error-box">{errors.email}</div>
//                         ) : null}
//                       </div>

//                       <p onClick={() => navigate("/Forgetpassword")}>
//                         Forget password?
//                       </p>
//                     </div>
//                     <div className="login">
//                       {loading ? (
//                         <AuthLoaderWrapper>
//                           <Spin size="large" />
//                         </AuthLoaderWrapper>
//                       ) : (
//                         <div className="login-section">
//                           <button className="login-btn" type="submit">
//                             Login
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </LoginPagedetails>
//       </Loginform>
//     </Loginwrapper>
//   );
// }

import React, { useState } from "react";
import Header from "../Component/Header";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { loginAuth, updatePassword } from "../Services/Collection";
import { useDispatch } from "react-redux";
import { authlogin } from "../Store/Authlogin";
import { toast } from "react-toastify";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Spin } from "antd";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  AuthLoaderWrapper,
  Loginform,
  Loginheading,
  LoginPagedetails,
  Loginwrapper,
} from "StyledComponents";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [isAdminFirstTime, setIsAdminFirstTime] = useState(true);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const createUserOnFirebase = async () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password required"),
    newPassword: Yup.string().required("New Password required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      setloading(true);
      let req = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      let res = await loginAuth(req);

      if (res.status === 200) {
        setloading(false);
        dispatch(authlogin(res.data));
        createUserOnFirebase();
        navigate("/dashboard/dashboardinfo");
      } else {
        setloading(false);
        dispatch(authlogin(res?.response?.data));
        setIsAdminFirstTime(
          res?.response?.data?.data?.firstTimeChangedPasswordStatus
        );
        toast.error(res?.response?.data?.message || res.error || res.message, {
          theme: "colored",
        });
      }
    } catch (error) {
      setloading(false);
      toast.error(error?.message || error, {
        theme: "colored",
      });
    }
  };
  const validation = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").required("Required*"),
    password: Yup.string().trim().required("Required*"),
  });

  const handleSubmitNewPass = async (values) => {
    setloading(true);
    let req = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    let res = await updatePassword(req);
    if (res.status === 200) {
      setloading(false);
      toast.success(res.message);
      setIsAdminFirstTime(true);
    } else {
      setloading(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <Loginwrapper>
      <Header />
      <Loginheading>
        <h1>Sign in to iBeor admin</h1>
      </Loginheading>
      <Loginform>
        <div className="form-heading">
          <h6>Login</h6>
        </div>
        <LoginPagedetails>
          {isAdminFirstTime == false ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmitNewPass}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="login-wrapper">
                    <div className="email-section">
                      <label htmlFor="oldPassword">Old Password:</label>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          className="form-input"
                        />
                        {errors.oldPassword && touched.oldPassword ? (
                          <div className="error-box">{errors.oldPassword}</div>
                        ) : null}
                        <span
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="eye-icon"
                          role="button"
                          tabIndex={0}
                          aria-label="Toggle password visibility"
                        >
                          {showOldPassword ? (
                            <EyeTwoTone />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="email-section">
                      <label htmlFor="newPassword">New Password:</label>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className="form-input"
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <div className="error-box">{errors.newPassword}</div>
                        ) : null}
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="eye-icon"
                          role="button"
                          tabIndex={0}
                        >
                          {showNewPassword ? (
                            <EyeTwoTone />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="email-section">
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-input"
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <div className="error-box">
                            {errors.confirmPassword}
                          </div>
                        ) : null}
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="eye-icon"
                          role="button"
                          tabIndex={0}
                        >
                          {showConfirmPassword ? (
                            <EyeTwoTone />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="login">
                      {loading ? (
                        <AuthLoaderWrapper>
                          <Spin size="large" />
                        </AuthLoaderWrapper>
                      ) : (
                        <div className="login-section">
                          <button className="login-btn" type="submit">
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={validation}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="login-wrapper">
                    <div className="email-section">
                      <label htmlFor="email">Email:</label>
                      <Field name="email" type="text" className="form-input" />
                      {errors.email && touched.email ? (
                        <div className="error-box">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="email-section">
                      <label htmlFor="password">Password:</label>
                      <div style={{ position: "relative" }}>
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="form-input"
                          style={{ paddingRight: "25px" }}
                        />
                        {errors.password && touched.password ? (
                          <div className="error-box">{errors.password}</div>
                        ) : null}
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="eye-icon"
                          role="button"
                          tabIndex={0}
                          style={{
                            position: "absolute",
                            right: "25px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <EyeTwoTone />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </span>
                      </div>
                      <p
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate("/Forgetpassword")}
                      >
                        Forget password?
                      </p>
                    </div>
                    <div className="login">
                      {loading ? (
                        <AuthLoaderWrapper>
                          <Spin size="large" />
                        </AuthLoaderWrapper>
                      ) : (
                        <div className="login-section">
                          <button className="login-btn" type="submit">
                            Login
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </LoginPagedetails>
      </Loginform>
    </Loginwrapper>
  );
}

import React, { useState } from "react";
import { Mainwrapper, Mainheading, Submitbtn } from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { profileupdate } from "Services/Collection";
import { toast } from "react-toastify";

export default function Updateprofile() {
  const [image, setImage] = useState(null);

  const handlesubmit = async (values) => {
    let data = new FormData();
    data.append("status", values.status);
    data.append("photos", image?.[0], image?.[0].name);

    let res = await profileupdate(data);
    if (res.status === 200) {
      toast.success("Record Updated Successfully");
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong",
        { theme: "colored" }
      );
    }
  };
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Update Profile</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined className="right-icon" />
            <span className="current-page">Update Profile</span>
          </p>
        </div>
      </Mainheading>
      <Updateprofilebox>
        <Updateprofileinfo>
          <Formik
            initialValues={{
              status: "0",
              myfile: "",
            }}
            onSubmit={handlesubmit}
          >
            <Form>
              <div>
                <label htmlFor="status">Status</label>
                <Field as="select" name="status">
                  <option value="0">Away</option>
                  <option value="1">Busy</option>
                  <option value="2">Online</option>
                </Field>
              </div>
              <div>
                <label htmlFor="myfile">Profile</label>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => setImage(e.target.files)}
                />
              </div>
              <div>
                <Submitbtn type="submit">Submit</Submitbtn>
              </div>
            </Form>
          </Formik>
        </Updateprofileinfo>
      </Updateprofilebox>
    </Mainwrapper>
  );
}

const Updateprofilebox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Updateprofileinfo = styled.div`
width:70%;
padding:20px;

margin:20px 0px;
border:1px solid #484748;
border-radius:10px;
background:#212121;
@media(max-width:786px){
    width:100%;

}
div{
    padding:20px;
    display: flex;
    justify-content: center;
}
label{
    display: flex;
    align-items: center;
    color:white;
}
}
select{
    width:70%;
    height:40px;
    margin-left:20px;
    background:#212121;
    color:white;
}
input{
    
    width:70%;
   height:40px;
   margin-left:20px;
   background:#212121;
   border:1px solid rgb(118, 118, 118);
}

`;

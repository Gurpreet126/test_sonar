import { LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { updateBasicPersonalInfo } from "Services/Collection";
import { Spin } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";

export default function PromptsAndInspiration(props) {
  const { setshowPrompts, getalldetails, id, personlDetail } = props;
  const [inspiration, setinspiration] = useState(true);
  const [loading, setLoading] = useState(false);

  const iduser = id;

  const handleClose = () => {
    setshowPrompts(false);
  };
  const validation = Yup.object().shape({
    Owninspiration: Yup.string().min(2, "Too Short!").max(180, "Too Long!"),
    answer: Yup.string().when("Prompts", (Prompts, schema) => {
      if (Prompts != "") return schema.required("Must enter Message");
      return schema;
    }),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const id = iduser;

    let req = {
      id: id,
      promptQuestion: values.Prompts,
      promptAnswer: values?.answer,
      inspiration:
        values.Owninspiration === ""
          ? values.inspiration
          : values.Owninspiration,
    };
    let res = await updateBasicPersonalInfo(req);
    if (res?.status === 200) {
      toast.info(res?.message || "update successfully");
      setshowPrompts(false);
      setLoading(false);
      getalldetails();
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
      setshowPrompts(false);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        Prompts: personlDetail?.promptQuestion
          ? personlDetail?.promptQuestion
          : "",
        inspiration: personlDetail?.inspiration
          ? personlDetail?.inspiration
          : "",
        Owninspiration: "",
        answer: personlDetail?.promptAnswer ? personlDetail?.promptAnswer : "",
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="modal-info">
            <label className="subheading">Prompts</label>
            <br />
            <Field as="select" name="Prompts" id="Prompts">
              <option hidden selected>
                Select
              </option>
              <option value="">None</option>
              <option value="I Promise">I Promise</option>
              <option value="My love language is/are">
                My love language is/are
              </option>
              <option value="Swipe left if">Swipe left if</option>
              <option value="My life motto, or words I live by is/are">
                My life motto, or words I live by is/are{" "}
              </option>
              <option value="My favorite childhood memory">
                My favorite childhood memory
              </option>
              <option value="This year">This year</option>
              <option value="I am comfortable when">
                I am comfortable when
              </option>
              <option value="Two truths and a lie">Two truths and a lie</option>
              <option value="If I could talk to my teenage self, the one thing I would say is">
                If I could talk to my teenage self,the one thing I would say is
              </option>
              <option value="We'll get along if">
                We&apos;ll get along if
              </option>
              <option value="A green flag">A green flag</option>
              <option value="A red flag">A red flag</option>
              <option value="The Key to my heart is">
                {" "}
                The Key to my heart is
              </option>

              <option value="Swipe right if">Swipe right if</option>
              <option value="Dating me is like">Dating me is like</option>
              <option value="The best way to ask me out is by">
                The best way to ask me out is by
              </option>
              <option value="I'm convinced that...">
                I&#39;m convinced that...r
              </option>
              <option value="Biggest risk I've taken...">
                Biggest risk I&apos;ve taken...
              </option>
              <option value="Together, we could...">
                Together, we could...
              </option>
              <option value="You should *not* go out with me if...">
                You should *not* go out with me if...
              </option>
            </Field>
          </div>
          <div>
            <label>Answer</label>
            <Field as="textarea" name="answer" />

            <div style={{ color: "red" }}>
              <ErrorMessage name="answer" />
            </div>
          </div>
          {inspiration ? (
            <div className="modal-info">
              <label className="subheading">Inspiration </label>
              <PlusCircleOutlined
                className="add-inspiration"
                onClick={() => setinspiration(false)}
              />
              <br />
              <Field as="select" name="inspiration" id="inspiration">
                <option hidden selected>
                  Select
                </option>
                <option value="">None</option>
                <option value="Dream big and dare to fail">
                  Dream big and dare to fail
                </option>
                <option value="Impossible is just an opinion">
                  Impossible is just an opinion
                </option>
                <option value="Everything comes to him who hustles while he waits">
                  Everything comes to him who hustles while he waits
                </option>
                <option value="The bad news is time flies. The good news is you're the pilot">
                  The bad news is time flies. The good news is you&apos;re the
                  pilot
                </option>
                <option value="Every successful person in the world is a hustler one way or another">
                  Every successful person in the world is a hustler one way or
                  another
                </option>
                <option value="The hard days are what make you stronger">
                  The hard days are what make you stronger
                </option>
                <option value="Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers">
                  Smart people learn from everything and everyone, average
                  people from their experiences, stupid people already have all
                  the answers
                </option>
                <option value="The same boiling water that softens the potato hardens the egg. It’s what you’re made of. Not the circumstances">
                  The same boiling water that softens the potato hardens the
                  egg. It’s what you’re made of. Not the circumstances
                </option>
                <option value="He Who is Not Courageous Enough to Take Risks Will Accomplish Nothing in Life">
                  He Who is Not Courageous Enough to Take Risks Will Accomplish
                  Nothing in Life
                </option>
                <option value="Don't Wait for Opportunity, Create it">
                  Don&apos;t Wait for Opportunity, Create it
                </option>

                <option value="Success is Walking from Failure to Failure">
                  Success is Walking from Failure to Failure
                </option>
                <option
                  value="When You Feel Like Quitting, Remember Why
                You Started"
                >
                  When You Feel Like Quitting, Remember Why You Started
                </option>
                <option
                  value="Great Things Never Come from Comfort
                Zones"
                >
                  Great Things Never Come from Comfort Zones
                </option>
                <option
                  value="In the End We Only Regret the Chances We
                Didn't Take"
                >
                  In the End We Only Regret the Chances We Didn&apos;t Take
                </option>
                <option
                  value="Think like a queen. A queen is not afraid to
                fail. Failure is another stepping stone to
                greatness"
                >
                  Think like a queen. A queen is not afraid to fail. Failure is
                  another stepping stone to greatness
                </option>
                <option
                  value="Women challenge the status quo because we
                are never it"
                >
                  Women challenge the status quo because we are never it
                </option>
                <option
                  value="
                  Get a good idea and stay with it. Dog it, and
                  work at it until it's done right
                "
                >
                  Get a good idea and stay with it. Dog it, and work at it until
                  it&apos;s done right
                </option>
              </Field>
            </div>
          ) : (
            <div className="modal-info">
              <label className="subheading">My own inspiration </label>
              <LeftOutlined
                className="add-inspiration"
                onClick={() => setinspiration(true)}
              />
              <br />
              <Field name="Owninspiration" />
              {errors.Owninspiration && touched.Owninspiration ? (
                <div style={{ color: "red" }}>{errors.Owninspiration}</div>
              ) : null}
            </div>
          )}

          <div className="modal-info">
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
        </Form>
      )}
    </Formik>
  );
}

PromptsAndInspiration.propTypes = {
  setshowPrompts: PropTypes.func,
  getalldetails: PropTypes.func,
  id: PropTypes.any,
  personlDetail: PropTypes.shape({
    promptQuestion: PropTypes.any,
    inspiration: PropTypes.any,
    promptAnswer: PropTypes.any,
  }),
};

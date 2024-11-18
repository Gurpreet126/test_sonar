import { sendMailbox } from "Services/Collection";
import { deleteIcons, docIcons, replyIcons } from "Utils/Image";
import { Avatar } from "antd";
import { encode } from "base64-arraybuffer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EmailButtons,
  EmailWrapper,
  InnerContainer,
  MessageWrapper,
  TextAreaWrapper,
} from "models/EmailThreadStyle";
import PropTypes from "prop-types";

const DomTest = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.html,
      }}
    />
  );
};

const ConvertArrayBufferToBase64 = ({ data }) => {
  let finalData = data[0]?.content.data;
  const base64Code = encode(finalData);

  let objbuilder = "";
  const view = (data, type) => {
    objbuilder = `<iframe width="100%" height="100%" src="data:${type};base64,${data}" type="text/html" class="internal">
        <embed src="text/html;base64,${data}" type="${type}" />
    </iframe>

    `;

    const win = window.open(
      "",
      "_blank",
      "titlebar=yes,width = 800, height = 600"
    );
    if (win) {
      const document = `<html>
                    <head>
                  
                      <link href="core/css/bootstrap.min.css" rel="stylesheet">
                      <link href="core/css/bell.css" rel="stylesheet">
                      <link href="core/css/global-connector.css" rel="stylesheet">
                    </head>
                    <body>
                      <div style="background-color:#fff">
                        <br />
                        ${objbuilder}
                      </div>
                    </body>
                  </html>`;
      win.document.write(document);
    }
  };

  return (
    <div className="attachments">
      <header>Attachment File</header>
      <div
        className="attachmentFile"
        role="button"
        tabIndex={0}
        onClick={() => view(base64Code, data[0]?.contentType)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent default behavior (e.g., scrolling for space)
            view(base64Code, data[0]?.contentType);
          }
        }}
        aria-label="View attachment"
      >
        <img alt="docIcons" src={docIcons} />
      </div>
    </div>
  );
};

export const EmailThread = () => {
  const profile_Image = useSelector((e) => e?.Authlogin?.data?.profileImage[0]);
  const [openMessage, setOpenMessage] = useState(false);
  const [viewBox, setViewBox] = useState([]);
  console.log(viewBox, "viewbox");
  const selectedData = useLocation()?.state;

  const structuringData = (data) => {
    let storedValue = [];
    for (let i = 0; i < data?.threads.length; i++) {
      const object = data?.threads[i];
      storedValue.push(object);
      // Check if the current object has nested "threads"
      if (object.threads && object.threads.length > 0) {
        structuringData(object.threads); // Recursively call the function for nested "threads"
      }
    }
    storedValue.push(data);
    setViewBox(storedValue);
  };

  const [loading, setLoading] = useState(false);
  const [getWord, setGetWord] = useState("");
  const navigate = useNavigate();

  const sendingMail = async (to, subject) => {
    setLoading(true);
    let req = {
      toEmail: to,
      subject: subject,
      emailBody: getWord,
    };
    try {
      let res = await sendMailbox(req);
      if (res.status === 200) {
        setLoading(false);
        navigate(-1);
      } else {
        toast.error(
          res?.response?.data?.message ||
            res?.message ||
            res?.error ||
            "Something went wrong"
        );
        setLoading(false);
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    structuringData(selectedData);
  }, [selectedData]);

  return (
    <EmailWrapper>
      <div className="email-title">
        <h2>{selectedData?.subject}</h2>
      </div>

      {viewBox.length > 0 &&
        viewBox?.map((el, idx) => (
          <InnerContainer key={idx}>
            <div className="email-subject">
              <h4>Testing</h4>
            </div>

            <div className="email-thread">
              <div className="avatarWrapper">
                <Avatar
                  size={50}
                  src={process.env.REACT_APP_BASEURL_IMAGE + profile_Image}
                />
              </div>
              <div className="NameWrapper">
                <p>{el?.from?.value[0]?.name}</p>
                <p className="senderName">to {el?.to?.value[0]?.address}</p>

                <div className="content-Wrapper">
                  <DomTest data={el} />
                </div>

                {el?.attachments.length > 0 && (
                  <ConvertArrayBufferToBase64 data={el?.attachments} />
                )}

                {idx === viewBox.length - 1 && (
                  <div className="reply-forward-box">
                    {!openMessage && (
                      <EmailButtons onClick={() => setOpenMessage(true)}>
                        Reply
                      </EmailButtons>
                    )}
                  </div>
                )}
              </div>
            </div>

            {openMessage && idx === viewBox.length - 1 && (
              <MessageWrapper>
                <div>
                  <Avatar
                    size={50}
                    src={process.env.REACT_APP_BASEURL_IMAGE + profile_Image}
                  />
                </div>

                <TextAreaWrapper>
                  <div>
                    <img src={replyIcons} alt="reply" />
                    <span>
                      {el?.from?.value[0]?.name}{" "}
                      <label>`{el?.from?.value[0]?.address}`</label>
                    </span>
                  </div>
                  <textarea onChange={(e) => setGetWord(e.target.value)} />
                  <div>
                    {loading ? (
                      <EmailButtons>Loading...</EmailButtons>
                    ) : (
                      <EmailButtons
                        onClick={() =>
                          sendingMail(el?.name || el?.From, el?.subject)
                        }
                      >
                        Send
                      </EmailButtons>
                    )}
                    <img
                      alt=""
                      src={deleteIcons}
                      className="deleteIcon"
                      tabIndex={0}
                      role="button"
                      onClick={() => setOpenMessage(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenMessage(false);
                        }
                      }}
                      aria-label="Delete"
                    />
                  </div>
                </TextAreaWrapper>
              </MessageWrapper>
            )}
          </InnerContainer>
        ))}
    </EmailWrapper>
  );
};

EmailThread.propTypes = {
  data: PropTypes.any,
};
DomTest.propTypes = {
  data: PropTypes.any,
};

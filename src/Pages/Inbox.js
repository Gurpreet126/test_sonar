import React, { useEffect, useState } from "react";
import { Mainwrapper, Mainheading } from "./Stylepage";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { toast } from "react-toastify";
import { feedbackListing } from "Services/Collection";
import { Spin } from "antd";
import { LoaderWrapper } from "Styles/Globalstyle";

export default function Inbox() {
  const [loading, setLoading] = useState(false);
  const [feedbackUserListing, setFeedbackUserListing] = useState([]);

  const getInboxListing = async () => {
    setLoading(true);
    let params = new URLSearchParams();
    params.append("pageNumber", 1);
    let res = await feedbackListing(params.toString());
    if (res.status === 200) {
      setFeedbackUserListing(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      );
    }

    if (feedbackUserListing?.length > 0) {
      return <Tabledata>data</Tabledata>;
    }

    return <NoDataFound>NO DATA FOUND</NoDataFound>;
  };

  useEffect(() => {
    getInboxListing();
  }, []);
  return (
    <Mainwrapper>
      <Mainheading>
        <div>
          <p>Inbox</p>
        </div>
        <div className="page-info">
          <p>
            Dashboard
            <RightOutlined style={{ fontSize: "15px" }} />
            Inbox
          </p>
        </div>
      </Mainheading>
      {renderContent()}
    </Mainwrapper>
  );
}

const NoDataFound = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
const Tabledata = styled.div`
  padding: 30px;
`;

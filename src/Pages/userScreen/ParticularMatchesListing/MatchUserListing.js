import { SortAscendingOutlined, SwapOutlined } from "@ant-design/icons";
import { Space, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getParticularUserMatches } from "Services/Collection";
import moment from "moment";
import {
  Buttonactive,
  LoaderWrapper,
  Tabledata,
  TableMessageButton,
  TableRealFakeUser,
  Title,
} from "models/ParticularMatchStyle";
import PropTypes from "prop-types";

export default function MatchUserListing({ user_id }) {
  const [tableinfo, settableinfo] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getDate = (date) => {
    let newDate = moment(date).format("MM-DD-YYYY");
    return newDate;
  };
  const getTime = (time) => {
    let newTime = moment(time).format("HH:mm");
    return newTime;
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    {
      title: (
        <Title>
          COUNTRY
          <SortAscendingOutlined
            style={{
              fontSize: "16px",
              width: "24px",
            }}
          />
        </Title>
      ),
      dataIndex: "country",
    },
    {
      title: (
        <Title>
          USER
          <SwapOutlined rotate={90} />
        </Title>
      ),
      dataIndex: "user",
    },
    {
      title: (
        <Title>
          PHONE#
          <SwapOutlined rotate={90} />
        </Title>
      ),
      dataIndex: "phone",
    },
    {
      title: "STATUS",
      key: "action",
      render: () => (
        <Space size="middle">
          <Buttonactive>Active</Buttonactive>
        </Space>
      ),
    },
    {
      title: "MESSAGE",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <TableMessageButton
            onClick={() =>
              navigate(`/dashboard/messanger/chat/${data.id}`, {
                state: data,
              })
            }
          >
            Chat
          </TableMessageButton>
        </Space>
      ),
    },
    {
      title: "ACCOUNT TYPE",
      key: "match",

      render: (_, data) => (
        <Space size="middle">
          {data?.accountType ? (
            <TableRealFakeUser style={{ background: "red" }}>
              Fake
            </TableRealFakeUser>
          ) : (
            <TableRealFakeUser style={{ background: "green" }}>
              Real
            </TableRealFakeUser>
          )}
        </Space>
      ),
    },
    {
      title: "GENDER",
      dataIndex: "gender",
    },
  ];

  const getAllData = async () => {
    let res = await getParticularUserMatches(user_id);
    if (res.status === 200) {
      settableinfo(
        res?.data?.map((item, index) => ({
          key: index + 1,
          id: item?._id,
          country: item?.country === "" ? "N/A" : item?.country,
          user: item?.firstName,
          email: item?.email,
          phone: item?.phoneNumber === "" ? "N/A" : item?.phoneNumber,
          date: getDate(item?.matchDate),
          time: getTime(item?.matchDate),
          accountType: item?.createdByAdmin,
          platform: item?.deviceType,
          gender: item?.gender === 0 ? "Male" : "Female",
        }))
      );
      setLoading(false);
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <Tabledata>
      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : (
        <Table
          className="recent-users-table"
          scroll={{ x: true, y: 300 }}
          columns={columns}
          dataSource={tableinfo}
          pagination={false}
        />
      )}
    </Tabledata>
  );
}

MatchUserListing.propTypes = {
  user_id: PropTypes.any,
};

import React, { useEffect, useState } from "react";
import { Mainwrapper, Mainheading, DashboardLink } from "../../Pages/Stylepage";
import { RightOutlined, WarningOutlined } from "@ant-design/icons";
import {
  AddAccount,
  ContactName,
  add,
  alert,
  email,
  password,
  pencil,
} from "Utils/Image";
import { Button, Modal, Spin, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { addCountry, getcountrylisting } from "Services/Collection";
import { toast } from "react-toastify";
import { countryListing } from "Utils/Country";
import {
  Modalbox,
  SuperAdminWrapper,
  Updateprofilebox,
} from "models/SuperAdminStyle";

export default function SuperAdminAction() {
  const navigate = useNavigate();
  const [isopen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [listingLoader, setListingLoader] = useState(false);
  const adminDetails = useSelector((state) => state?.Authlogin?.data);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  console.log(filteredData, "filteredData");
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [changeCountryLoading, setChangeCountryLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
    if (e.target.value) {
      let filteredData = countryListing?.filter((item) => {
        return item?.countryName
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  };

  const handleUpdateCountrySetting = async () => {
    setChangeCountryLoading(true);
    if (selectedRowsData?.length > 0) {
      let newArr = selectedRowsData.map((el) => el?.countryName);
      let req = {
        countryNameList: newArr,
      };
      let res = await addCountry(req);
      if (res.status === 200) {
        setChangeCountryLoading(false);
        toast.success(res.message);
        handleGetCountryListing();
      } else {
        setChangeCountryLoading(false);
        toast.error(
          res.response.data.message ||
            res.error ||
            res.message ||
            "Something went wrong"
        );
      }
    } else {
      toast.warning("Please select atleast one country");
    }
  };

  const handleConfirmModal = (e) => {
    if (e === true) {
      setIsModalOpen(true);
    } else {
      setOpen(e);
      disableOrders(e);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(true);
    setIsModalOpen(false);
    disableOrders(true);
  };

  const getEmergencyToggle = async () => {
    setLoading(true);
    try {
      let res = await getDoc(doc(db, "EmergencyToggle", "toggle"));
      let data = res.data();
      setLoading(false);
      setOpen(data?.EmergencyToggle);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetCountryListing = async () => {
    setListingLoader(true);
    let res = await getcountrylisting();
    if (res.status === 200) {
      setListingLoader(false);
      setSelectedRowsData(res?.extraData);
    } else {
      setListingLoader(false);
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const disableOrders = async (event) => {
    try {
      await updateDoc(doc(db, "EmergencyToggle", "toggle"), {
        EmergencyToggle: event,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddRem = (obj, type, all) => {
    if (!all) {
      if (type) {
        if (selectedRowsData?.length > 0) {
          if (Array.isArray(selectedRowsData)) {
            if (
              selectedRowsData.find(
                (el) => el?.countryName === obj?.countryName
              )
            ) {
              return selectedRowsData?.forEach((el) => {
                if (el.countryName === obj.countryName) {
                  setSelectedRowsData(obj);
                }
                setSelectedRowsData(el);
              });
            } else {
              setSelectedRowsData([...selectedRowsData, obj]);
            }
          } else {
            setSelectedRowsData([obj]);
          }
        } else {
          setSelectedRowsData([obj]);
        }
      } else {
        let arr = selectedRowsData.filter(
          (el) =>
            el?.countryName.toUpperCase() !== obj?.countryName.toUpperCase()
        );
        setSelectedRowsData(arr);
      }
    } else {
      if (type) {
        setSelectedRowsData(countryListing);
      } else {
        setSelectedRowsData([]);
      }
    }
  };

  useEffect(() => {
    getEmergencyToggle();
    handleGetCountryListing();
  }, []);
  return (
    <Mainwrapper>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <>
            <Button key="submit" type="primary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" danger onClick={() => handleToggle()}>
              Confirm
            </Button>
          </>,
        ]}
        okText="Delete"
      >
        <Modalbox>
          <WarningOutlined />
          <h1>Are you Sure!</h1>
        </Modalbox>
      </Modal>
      <Mainheading>
        <div>
          <p>Account Settings</p>
        </div>
        <div className="page-info">
          <p>
            <DashboardLink href="/dashboard/dashboardinfo">
              Dashboard
            </DashboardLink>
            <RightOutlined className="right-icon" />
            <span className="current-page">Update Profile</span>
          </p>
        </div>
      </Mainheading>
      <Updateprofilebox>
        <SuperAdminWrapper>
          <div className="">
            <div>
              <h4>iBeor Admin Profile</h4>
              <p>Manage your profile, security and status preferences.</p>
            </div>
            <div className="admin-actions">
              <div className="actions">
                <img src={ContactName} alt="" />
                <div>
                  <h3>Contact Name</h3>
                  <span>{adminDetails?.firstName}</span>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate("/dashboard/editcontact")}
                className="edit-icon"
              >
                <img src={pencil} alt="" />
              </div>
            </div>
            <div className="admin-actions">
              <div className="actions">
                <img src={email} alt="" />
                <div>
                  <h3>Email Address</h3>
                  <span>{adminDetails?.email}</span>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate("/dashboard/editemail")}
                className="edit-icon"
              >
                <img src={pencil} alt="" />
              </div>
            </div>

            <div className="admin-actions">
              <div className="actions">
                <img src={password} alt="" />
                <div>
                  <h3>Password</h3>
                  <span>***********</span>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate("/dashboard/changepassword")}
                className="edit-icon"
              >
                <img src={pencil} alt="" />
              </div>
            </div>

            {adminDetails?.role == "2" || adminDetails?.role == "3" ? (
              <>
                <div className="admin-actions">
                  <div className="actions">
                    <img src={AddAccount} alt="" />
                    <div>
                      <h3>Add Account</h3>
                    </div>
                  </div>

                  <img
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    onClick={() => navigate("/dashboard/addadmin")}
                    src={add}
                    alt=""
                    tabIndex={0}
                    aria-label="Add admin"
                  />
                </div>
              </>
            ) : null}

            {adminDetails?.isSuperAdmin == "Yes" && (
              <div className="admin-actions">
                <div className="actions">
                  <img src={alert} alt="" />
                  <div>
                    <h3>Emergency Toggle</h3>
                  </div>
                </div>
                <div>
                  <Switch
                    checked={isopen}
                    loading={loading}
                    disabled={isModalOpen}
                    onChange={(e) => handleConfirmModal(e)}
                  />
                </div>
              </div>
            )}
          </div>
        </SuperAdminWrapper>
        <SuperAdminWrapper listingLoader={listingLoader}>
          {listingLoader ? (
            <Spin />
          ) : (
            <div className="select-country">
              <div className="country-header">
                <h3 className="country-heading">Select Country</h3>
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="grid-div">
                {searchQuery == "" ? (
                  countryListing?.length > 0 &&
                  countryListing?.map((val) => {
                    return (
                      <div key={val?.code}>
                        <p>
                          <input
                            type="checkbox"
                            checked={selectedRowsData?.some(
                              (el) =>
                                el?.countryName.toUpperCase() ==
                                val?.countryName.toUpperCase()
                            )}
                            onChange={(e) => {
                              handleAddRem(val, e.target.checked);
                            }}
                          />
                          {val?.countryName}
                        </p>
                      </div>
                    );
                  })
                ) : filteredData?.length > 0 ? (
                  filteredData?.map((val) => {
                    return (
                      <div key="">
                        <p>
                          <input
                            type="checkbox"
                            checked={selectedRowsData?.some(
                              (el) =>
                                el?.countryName.toUpperCase() ==
                                val?.countryName.toUpperCase()
                            )}
                            onChange={(e) => {
                              handleAddRem(val, e.target.checked);
                            }}
                          />
                          {val?.countryName}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <h2 className="no-data">No Data</h2>
                )}
              </div>
              <div className="btns-div">
                <div className="only-btns">
                  <button
                    className="update-setting"
                    onClick={() => handleUpdateCountrySetting()}
                  >
                    {changeCountryLoading ? "Loading..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </SuperAdminWrapper>
      </Updateprofilebox>
    </Mainwrapper>
  );
}

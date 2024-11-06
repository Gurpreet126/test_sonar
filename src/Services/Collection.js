import { postApi, getApi, deleteApi, putApi } from "./Methods";

const LOGIN = "admin/adminLoginWithEmailAndPassword";

const Userlisting = "admin/getUserListing";

const Searchbyname = "admin/searchByName";

const Managenotification = "admin/notification/list";

const createNot = "/admin/create/notification";

const deletenNot = "/admin/deleteNotification";

const editnot = "/admin/editNotification/";

const dashboardDetail = "/admin/getdashBoardDetails";

const userPersonalDetail = "/admin/userPersonalDetail";

const deleteuser = "/admin/allDeletedUsersList";

const blockuser = "/admin/listBlockUserByAdmin";

const fakeuser = "admin/pauseAllFakeAccounts";

const exportData = "admin/exportIndividualUser?id=";

const deleteUser = "admin/deleteMyAccount";

const suspendUser = "admin/blockUserByAdmin";

const basicPersonalInfo = "admin/addBasicPersonalInfo";

const adminlist = "admin/get/adminlist";

const deleteadmin = "admin/delete/admin";

const adminStatus = "/admin/update/changeAdminStatus";

const admins = "admin/search/admins";

const forget_password = "/admin/forgetPassword";

const change_password = "admin/changePassword";

const updateProfile = "admin/update/profile";

const export_workbook = "admin/workbookCreate";

const create_admin = "admin/create/Admin";

const edit_admin = "admin/update/profileBySuperAdmin";

const adduser = "admin/addUserByAdmin";

const usauser = "users_from_america";

const feedback = "/admin/allContactus/feedbacks";

const setting_update = "admin/updateUserNameAndPhoneNumber";

const realUser_count = "admin/realUsersCount";

const verification = "admin/updateVerification";

const pause = "admin/pauseUserAccount";

const swipeMatch = "admin/swipesInfo";

const newlike = "admin/newLikeDislike";

const draganddrop = "admin/dragAndDropImages";

const delteimage = "admin/deleteMedia/";

const deletepersonal = "admin/deletedPersonalDetail";

const GET_MATCHUSER_LISTING_FOR_CHAT = "admin/matchUserList";

const searchForMatchUserListing = "admin/searchMatchUserList";

const addPhotos = "admin/addImage";

const Send_Notification_For_WebChat = "admin/sendNotificationForWebChat";

const emaillisting = "admin/contactUsListing";

const searchMail = "admin/searchFromContactUsListing";

const deleteemaillisting = "admin/deleteFromContactUsListing";

const createAuthadmin = "admin/createAuthAdminUser";

const Authenticationadmin = "admin/authenticateViaAuthAdmin";

const mailreply = "admin/replyToEmailFromAdmin";

const memberlisting = "admin/authAdminUserListing";

const deleteauthadmin = "admin/deleteAuthAdminUser";

const UNSUSPEND_USER = "admin/unBlockUserByAdmin";

const BLOCK_USER_BY_ADMIN = "admin/blockUserAtAdmin";

const UNMATCH_USER_BY_ADMIN = "admin/unmatchUserAtAdmin";

const UserSubscriptionStatus = "admin/getUserSubscriptionStatus";

const USER_REMOVE_ADMIN = "/admin/temporaryRemoveAccount";

const GET_REPORTED_USER = "/admin/reportedUserListing";

const SEARCH_REPORTED_USER = "/admin/searchReportedUser";

const GET_PRE_REG_USER = "/admin/preRegisterUserList";

const SEARCH_PRE_REG_USER = "/admin/searchPreRegUser";

const APPROVE_PRE_REG_USER = "/admin/approveUser";

const PARTICULAR_MATCHES_LIST = "/admin/MatchList";

const DELETE_REPORT = "/admin/deleteReport";

const VIEW_MAIL_BOX = "/admin/Viewmailbox";

const SEND_MAIL_BOX = "/admin/replyToEmailFromAdmin";

const BAN_USER_LISTING = "admin/shadowBannedUserList";

const BAN_USER = "admin/updateStatusForShadowBannedUser";

const deleteusersearch = "/admin/searchDeletedUsersList";

const suspendusersearch = "/admin/searchBlockUserByAdmin";

const completeduser = "/admin/markAsCompleteStatus";

const recomendedversion = "/admin/pushRecommendation";

const HEART_LIKE_INFO = "admin/heartLikeInfo";

const ADD_COUNTRY = "admin/addCountry";

const GET_COUNTRY_LISTING = "admin/countryListing";

const DELETE_COUNTRY = "admin/deleteCountry";

const EDIT_COUNTRY = "admin/editCountry";

const GET_HIDE_USER_LIST = "admin/hideUserList";

const UPDATE_HIDE_USER_STATUS = "admin/updateStatusForHiddedUser";

export const loginAuth = (payload) => {
  return postApi(LOGIN, payload);
};

export const getUserListing = (params, payload) => {
  return postApi(`${Userlisting}?${params}`, payload);
};
export const Search = (payload) => {
  return postApi(Searchbyname, payload);
};
export const notificationlist = (currentpage, pagesize) => {
  return getApi(
    `${Managenotification}?pageNumber=${currentpage}&perPage=${pagesize}`
  );
};
export const createNotification = (payload) => {
  return postApi(createNot, payload);
};
export const deleteNotification = (payload) => {
  return deleteApi(`${deletenNot}?notification_id=${payload}`);
};
export const editNotification = (payload) => {
  return postApi(editnot, payload);
};

export const getRecentUserList = (currentpage, pagesize) => {
  return getApi(
    `${dashboardDetail}?pageNumber=${currentpage}&perPage=${pagesize}`
  );
};

export const getParticularUserInfo = (id) => {
  return postApi(userPersonalDetail, { id: id });
};

const dailyOnlineStatusUser = "/admin/activeUsers/stats";
export const getDailyOnlineStatus = (payload) => {
  return postApi(dailyOnlineStatusUser, payload);
};
export const getExportData = (id) => {
  return postApi(`${exportData}${id}`);
};

export const deleteUserData = (id) => {
  return deleteApi(`${deleteUser}?id=${id}`);
};

export const suspendUserByAdmin = (id) => {
  return putApi(`${suspendUser}`, { userId: id });
};

export const updateBasicPersonalInfo = (data) => {
  return putApi(basicPersonalInfo, data);
};

export const allDeletedUsersList = (payload) => {
  return getApi(`${deleteuser}?${payload}`);
};
export const listblockuser = (pageNumber, perPage) => {
  return getApi(`${blockuser}?pageNumber=${pageNumber}&perPage=${perPage}`);
};
export const pauseAllfakeAccounts = (payload) => {
  return putApi(fakeuser, payload);
};
export const alladminlist = (payload) => {
  return getApi(
    `${adminlist}?pageNumber=${payload?.pageNumber}&perPage=${payload?.perPage}`
  );
};
export const deleteadminlist = (payload) => {
  return deleteApi(`${deleteadmin}?id=${payload}`);
};
export const changeAdminStatus = (payload) => {
  return putApi(adminStatus, payload);
};
export const adminsearchlist = (payload) => {
  return postApi(admins, payload);
};

export const feedbackListing = () => {
  return getApi(`${feedback}?query`);
};

export const reset_forgetPassword = (payload) => {
  return postApi(forget_password, payload);
};
export const updatePassword = (payload) => {
  return putApi(change_password, payload);
};
export const profileupdate = (payload) => {
  return putApi(updateProfile, payload);
};

export const settingUpdate = (payload) => {
  return putApi(setting_update, payload);
};
export const exportdata = (payload) => {
  return postApi(export_workbook, payload);
};
export const createadmin = (payload) => {
  return postApi(create_admin, payload);
};

export const editadminprofile = (payload) => {
  return putApi(edit_admin, payload);
};
export const addUserByAdmin = (payload) => {
  return putApi(adduser, payload);
};
export const getRealUserCount = () => {
  return getApi(realUser_count);
};
export const usersFromUsa = (payload) => {
  return getApi(usauser, payload);
};

export const userverification = (payload) => {
  return putApi(verification, payload);
};
export const useraccountPause = (payload) => {
  return putApi(pause, payload);
};

export const matchUser = (payload) => {
  return putApi(newlike, payload);
};

export const dragAndDropImages = (payload) => {
  return postApi(draganddrop, payload);
};
export const userSwipeMatchinfo = (userId) => {
  return getApi(`${swipeMatch}?userId=${userId}`);
};
export const Deleteimages = (payload) => {
  return deleteApi(`${delteimage}${payload}`);
};
export const deletedPersonalDetail = (payload) => {
  return postApi(deletepersonal, payload);
};

export const getAllMessagerListing = (payload) => {
  return getApi(`${GET_MATCHUSER_LISTING_FOR_CHAT}?${payload}`);
};

export const searchMatch = (payload) => {
  return getApi(`${searchForMatchUserListing}?${payload}`);
};

export const UploadImage = (payload) => {
  return putApi(addPhotos, payload);
};

export const sendNotificationForWebChat = (payload) => {
  return postApi(Send_Notification_For_WebChat, payload);
};

export const Allmails = (perPage, pageNumber) => {
  return getApi(`${emaillisting}?perPage=${perPage}&pageNumber=${pageNumber}`);
};

export const searchAllmails = (payload) => {
  return getApi(`${searchMail}?search=${payload}`);
};

export const deleteemail = (payload) => {
  return deleteApi(deleteemaillisting, payload);
};

export const createAuthadminUser = (payload) => {
  return postApi(createAuthadmin, payload);
};

export const authenticateViaAuthAdmin = (payload) => {
  return postApi(Authenticationadmin, payload);
};

export const replytomail = (payload) => {
  return postApi(mailreply, payload);
};

export const allmemberlisting = (perPage, pageSize) => {
  return getApi(`${memberlisting}?pageNumber=${perPage}&perPage=${pageSize}`);
};

export const deleteAuthadminuser = (userid) => {
  return deleteApi(`${deleteauthadmin}?authAdminUserId=${userid}`);
};

const updateIsImportant = "/admin/updateIsImportantStatus";
export const updateIsImportantStatus = (payload) => {
  return putApi(updateIsImportant, payload);
};

export const updateUnsuspendUser = (payload) => {
  return putApi(UNSUSPEND_USER, payload);
};

export const blockUserByAdmin = (payload) => {
  return postApi(BLOCK_USER_BY_ADMIN, payload);
};

export const unMatchUserByAmin = (payload) => {
  return postApi(UNMATCH_USER_BY_ADMIN, payload);
};

export const getSubscriptionUserStatus = (id) => {
  return getApi(`${UserSubscriptionStatus}?userId=${id}`);
};

export const removeUserFromAdmin = (payload) => {
  return putApi(USER_REMOVE_ADMIN, payload);
};

export const getReportedUserListing = (params) => {
  return getApi(`${GET_REPORTED_USER}?${params}`);
};

export const getSearchReportedUserData = (params) => {
  return getApi(
    `${SEARCH_REPORTED_USER}?search=${params?.search}&pageNumber=${params?.pageNumber}&limit=${params?.perPage}`
  );
};

export const getPreRegUsersListing = (params) => {
  return getApi(`${GET_PRE_REG_USER}?${params}`);
};

export const getSearchPreRegUserData = (params) => {
  return getApi(
    `${SEARCH_PRE_REG_USER}?search=${params?.search}&pageNumber=${params?.pageNumber}&perPage=${params?.perPage}`
  );
};

export const approvePreRegUser = (payload) => {
  return putApi(APPROVE_PRE_REG_USER, payload);
};

export const getParticularUserMatches = (id) => {
  return getApi(`${PARTICULAR_MATCHES_LIST}?user_id=${id}`);
};

export const deleteReport = (id) => {
  return deleteApi(`${DELETE_REPORT}?report_id=${id}`);
};

export const viewMailbox = (payload) => {
  // return getApi(
  //   `${VIEW_MAIL_BOX}?username=${payload.username}&password=${payload.password}`
  // );
  return postApi(VIEW_MAIL_BOX, payload);
};

export const sendMailbox = (payload) => {
  return postApi(SEND_MAIL_BOX, payload);
};

export const banUserListing = (perPage, pageSize) => {
  return getApi(
    `${BAN_USER_LISTING}?pageNumber=${perPage}&perPage=${pageSize}`
  );
};

export const banUser = (payload) => {
  return putApi(BAN_USER, payload);
};

export const deletesearchapi = (params) => {
  return getApi(
    `${deleteusersearch}?search=${params?.search}&pageNumber=${params?.pageNumber}&perPage=${params?.perPage}`
  );
};

export const Suspendedusersearchapi = (params) => {
  return getApi(
    `${suspendusersearch}?search=${params?.search}&pageNumber=${params?.pageNumber}&perPage=${params?.perPage}`
  );
};

export const Markascompleteduserapi = (payload) => {
  return putApi(completeduser, payload);
};

export const pushrecomendedversionapi = (payload) => {
  return postApi(recomendedversion, payload);
};

export const heartlikeinfo = (userId) => {
  return getApi(`${HEART_LIKE_INFO}?userId=${userId}`);
};

export const addCountry = (payload) => {
  return postApi(ADD_COUNTRY, payload);
};

export const getcountrylisting = () => {
  return getApi(`${GET_COUNTRY_LISTING}?perPage=${10}&pageNumber=${1}`);
};

export const deletecountry = (payload) => {
  return deleteApi(DELETE_COUNTRY, payload);
};

export const editcountry = (payload) => {
  return putApi(EDIT_COUNTRY, payload);
};

export const gethideuserlist = (perPage, pageNumber) => {
  return getApi(
    `${GET_HIDE_USER_LIST}?perPage=${perPage}&pageNumber=${pageNumber}`
  );
};

export const updatehideuserstatus = (payload) => {
  return putApi(UPDATE_HIDE_USER_STATUS, payload);
};

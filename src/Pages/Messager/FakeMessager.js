import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  ChatContainer,
  Conversation,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { db } from "../../Firebase/firebaseConfig";
import { Mainheading, Mainwrapper } from "Pages/Stylepage";
import {
  AllConversations,
  ChatSectionLayout,
  LoaderWrapper,
  MessageWrapper,
  NoConversationSelected,
  NoMessageYet,
  SelectedInbox,
} from "Styles/Globalstyle";
import { MessageIcon, emojiBtn } from "Utils/Image";
import { messanger } from "Utils/Logo";
import { Spin } from "antd";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { HeartIcon } from "Utils/Icons";
import moment from "moment";
import {
  blockUserByAdmin,
  matchUser,
  sendNotificationForWebChat,
  unMatchUserByAmin,
  getSubscriptionUserStatus,
} from "Services/Collection";
import { useDispatch, useSelector } from "react-redux";
import {
  allChatData,
  allReadChatData,
  allUnreadChatData,
  notificationBell,
  privateChatData,
  updateUnreadChat,
  womensChatData,
} from "Store/userStore";
import Picker from "emoji-picker-react";
import InfiniteScroll from "react-infinite-scroll-component";
import GifyRender from "Component/Gify";
import { toast } from "react-toastify";
import ClickAwayListener from "react-click-away-listener";
import { authlogout } from "Store/Authlogin";
import { useMediaQuery } from "react-responsive";
import { DoubleTickIcon } from "Assests/logo/svgfile";
import FindWidth from "CustomHooks/FindWith";
import WaveCreator from "./WaveCreator";
import {
  AvatarUsernameWrapper,
  ConversationHeaderRightSection,
  ConversationWrapper,
  MessageInfo,
  MessageStatus,
  ProfileLink,
  ReceiverName,
  SenderName,
  SettingOption,
} from "models/MessagerStyle";
import PropTypes from "prop-types";

export default function FakeMessager() {
  const [allConversationLoading, setAllConversationLoading] = useState(true);
  const getAllUnreadChat = useSelector(
    (state) => state?.UserCounts?.filterUnreadChat
  );
  const getAllUnreadChatData = useSelector(
    (state) => state?.UserCounts?.allUnreadChat
  );
  const allChat = useSelector((state) => state?.UserCounts?.allChat);
  const privateChat = useSelector((state) => state?.UserCounts?.allPrivateChat);
  const allReadChat = useSelector((state) => state?.UserCounts?.allReadChat);
  const allWomensChat = useSelector(
    (state) => state?.UserCounts?.allWomensChat
  );

  const [chatMember, setChatMember] = useState([]);
  const [selectedUserHandle, setSelectedUserHandle] = useState(false);
  const [selectedChatLoading, setSelectedChatLoading] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);

  const scrollPosition = useRef(0);
  const [currentUserUser, setCurrentUserUser] = useState([]);
  const isIOS = /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [showSelectedChatId, setShowSelectedChatId] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const dispatch = useDispatch();
  const [width] = FindWidth();
  const [btnLoader, setBtnLoader] = useState(null);
  const [selectedChatDetails, setSelectedChatDetails] = useState(null);
  const [savalastdata, setsavelastdata] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1);
  const [fakeUserLocation, setFakeUserLocation] = useState(null);
  const [filterchattype, setFilterchattype] = useState();
  const [FilterChatLastData, setFilterChatLastData] = useState(null);
  const [privateChatLastVisible, setPrivateChatLastVisible] = useState(null);
  const [womensChatLastVisible, setWomensChatLastVisible] = useState(null);
  const [unreadFilterChatLastData, setUnreadFilterChatLastData] =
    useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentId, setCurrentId] = useState(null);

  const handleLogout = (error) => {
    if (
      error.code === 401 ||
      error.code === 403 ||
      error.code.includes("permission-denied")
    )
      dispatch(authlogout());
    if (error.code.includes("resource-exhausted")) {
      toast.error("Exceed limit");
      setAllConversationLoading(false);
    }
    // else if (error.code===429) toast.error("Firebase limit exceed.")
  };

  const [isMessageRequestAccepted, SetIsMessageRequestAccepted] =
    useState(true);
  const [checkFirstSenderID, setCheckFirstSenderID] = useState(null);
  const [isSubscibed, setIsSubscibed] = useState(false);
  const chatContainer = useRef(null);
  const [showMemberConversation, setShowMemberConversation] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  // used to get current date used in conversation section
  let today_date = moment().format("dddd,DD MMMM YYYY");
  const dateDifference = [];
  // const base_url=`https://master.d1w6df1hjaiy2l.amplifyapp.com/dashboard/userdetails/`

  const showHideConversationScreen = () =>
    setShowMemberConversation((prev) => !prev);
  const handleBlockUser = async (receiverId, senderId) => {
    let req = {
      senderId: senderId,
      receiverId: receiverId,
    };

    let res = await blockUserByAdmin(req);
    if (res.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(res.response.data.message || res.error || res.message);
    }
  };

  const handleUnMatchUser = async (receiverId, senderId) => {
    let req = {
      senderId: senderId,
      receiverId: receiverId,
    };
    let res = await unMatchUserByAmin(req);
    if (res?.status === 200) {
      toast.success(res?.message);
    } else {
      toast.error(res.response.data.message || res.error || res.message);
    }
  };

  const handlePrivateMsgActions = async (type) => {
    setBtnLoader(type);
    let req;
    if (type == 1) {
      req = {
        receiverId: selectedUserInfo?.opponentID,
        isAdmin: true,
        _id: currentUserUser,
        type: 1,
        isPrivateMessage: true,
      };
    } else {
      req = {
        receiverId: selectedUserInfo?.opponentID,
        isAdmin: true,
        _id: currentUserUser,
        type: 1,
        isDislike: true,
      };
    }

    let res = await matchUser(req);
    if (res?.status === 200) {
      setBtnLoader(null);
      toast.success(res?.message);
      const {
        chatid,
        name,
        image,
        selectedId,
        currentUserId,
        chatMember,
        chatMemberData,
      } = selectedChatDetails;

      if (type == 1) {
        getSelectedCoversation(
          chatid,
          name,
          image,
          selectedId,
          currentUserId,
          { ...chatMember, isMessageRequestAccepted: type == 1 ? true : false },
          chatMemberData
        );
        handleSubscriptionUserStatus(currentUserUser);
      } else {
        window.location.reload();
      }
    } else {
      setBtnLoader(null);
      toast.error(res.response.data.message || res.error || res.message, {
        theme: "colored",
      });
    }
  };

  const handleSubscriptionUserStatus = async (id) => {
    try {
      let isSubscription = await getSubscriptionUserStatus(id);
      if (isSubscription.status === 200) {
        const status = isSubscription?.data?.subscriptionStatus;
        setIsSubscibed(status);
      } else {
        setIsSubscibed(false);
      }
    } catch (e) {
      setIsSubscibed(false);
    }
  };
  const MemberConversation = ({ chatMember, key }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    let userDetails = [
      {
        userType: chatMember?.userType?.[0],
        id: chatMember?.members?.[0],
      },
      {
        userType: chatMember?.userType?.[1],
        id: chatMember?.members?.[1],
      },
    ];
    let selectedUserInfo = userDetails?.filter((item) => {
      if (!item?.userType) return item;
    });
    let currentUserUserInfo = userDetails?.filter((item) => {
      if (item?.userType) return item;
    });

    const getUnReadCount = (payload) => {
      if (payload?.unreadMessageCount?.[currentUserUserInfo?.[0].id] > 0) {
        return (
          <span className="unreadCount">
            {payload?.unreadMessageCount[currentUserUserInfo?.[0].id]}
          </span>
        );
      }
      return;
    };
    const currentTimeStamp = Date.now();
    const msgTimeStamp = chatMember?.lastMessage?.messageTime * 1000;

    var difference = currentTimeStamp - msgTimeStamp;

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    const lastChatDate = moment
      .unix(chatMember?.lastMessage?.messageTime)
      .local()
      .format("MM/DD/yyyy");

    const time = daysDifference
      ? lastChatDate
      : hoursDifference
        ? `${hoursDifference} ${hoursDifference > 1 ? "hours" : "hour"} ago`
        : minutesDifference > 0
          ? `${minutesDifference} ${minutesDifference > 1 ? "mins" : "min"} ago`
          : !isNaN(msgTimeStamp)
            ? "Now"
            : "";

    const handleClickAway = () => {
      setIsPopupOpen(false);
    };
    return (
      chatMember[userDetails[0]?.id]?.name && (
        <ConversationWrapper key={key}>
          <Conversation
            style={{
              padding: "12px 5px",
              width: "90%",
              background:
                chatMember?.chatID == showSelectedChatId
                  ? "#e2dfdfed"
                  : "transparent",
            }}
            onClick={() => {
              setShowSelectedChatId(chatMember?.chatID);
              setFakeUserLocation(
                chatMember[currentUserUserInfo[0].id]?.fakeUserAddress ||
                  chatMember[selectedUserInfo[0].id]?.fakeUserAddress
              );

              getSelectedCoversation(
                chatMember?.chatID,
                chatMember[selectedUserInfo[0].id]?.name,
                chatMember[selectedUserInfo[0].id]?.image,
                selectedUserInfo?.[0].id,
                currentUserUserInfo?.[0].id,
                chatMember,
                chatMember[currentUserUserInfo[0].id]
              );

              setSelectedChatDetails({
                chatid: chatMember?.chatID,
                name: chatMember[selectedUserInfo[0].id]?.name,
                image: chatMember[selectedUserInfo[0].id]?.image,
                selectedId: selectedUserInfo?.[0].id,
                currentUserId: currentUserUserInfo?.[0].id,
                chatMember: chatMember,
                chatMemberData: chatMember[currentUserUserInfo[0].id],
              });
              handleSubscriptionUserStatus(currentUserUser);
            }}
          >
            <AvatarGroup size="md" max={2} activeIndex={1}>
              <Avatar
                src={
                  process.env.REACT_APP_BASEURL_IMAGE +
                  chatMember[userDetails[0]?.id]?.image
                }
                name={chatMember[userDetails[0]?.id]?.name}
              />
              <Avatar
                src={
                  process.env.REACT_APP_BASEURL_IMAGE +
                  chatMember[userDetails[1]?.id]?.image
                }
                name={chatMember[userDetails[1]?.id]?.name}
              />
            </AvatarGroup>

            <Conversation.Content style={{ marginRight: "5px" }}>
              <div style={{ display: "flex" }}>
                <AvatarUsernameWrapper>
                  <div style={{ width: "100%" }}>
                    <div>
                      {chatMember[userDetails[0]?.id]?.name} &{" "}
                      {chatMember[userDetails[1]?.id]?.name}
                    </div>
                    <div className="lastMessage">
                      <div className="message">
                        {chatMember?.lastMessage?.messageType == "3"
                          ? "Audio"
                          : chatMember?.lastMessage?.messageType === "2"
                            ? "Gif"
                            : chatMember?.lastMessage?.message}
                      </div>{" "}
                      <div className="messageTime">{time}</div>
                    </div>
                  </div>
                </AvatarUsernameWrapper>
              </div>
            </Conversation.Content>
          </Conversation>

          <ClickAwayListener onClickAway={handleClickAway}>
            <SettingOption>
              <div
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className="three-dot"
              >
                {" "}
                ...
              </div>
              {getUnReadCount(chatMember)}
              {isPopupOpen && (
                <div className="hiddenHeaderDiv">
                  <h4
                    onClick={() =>
                      handleUnMatchUser(
                        selectedUserInfo?.[0].id,
                        currentUserUserInfo?.[0].id
                      )
                    }
                    className="hiddenHead1"
                  >
                    Unmatch
                  </h4>
                  <hr className="hrTag" />
                  <h4
                    onClick={() =>
                      handleBlockUser(
                        selectedUserInfo?.[0].id,
                        currentUserUserInfo?.[0].id
                      )
                    }
                    className="hiddenHead2"
                  >
                    Block
                  </h4>
                </div>
              )}
            </SettingOption>
          </ClickAwayListener>
        </ConversationWrapper>
      )
    );
  };
  const [showPrivateMessageButton, setShowPrivateMessageButton] =
    useState(false);

  const getSelectedCoversation = async (
    chatID,
    name,
    profileImage,
    opponentID,
    currentUser,
    wholeChat,
    currentUserDetailInfo
  ) => {
    showHideConversationScreen();
    setSelectedUserHandle(true);
    setSelectedChatLoading(true);
    setShowPrivateMessageButton(wholeChat?.isPrivateMessage);
    SetIsMessageRequestAccepted(wholeChat?.isMessageRequestAccepted);
    setCurrentUserInfo(currentUserDetailInfo);
    setEmojis([]);
    chatContainer.current = wholeChat;
    let selectedInfo = {
      name: name,
      profileImage: profileImage,
      chatID: chatID,
      opponentID: opponentID,
    };
    if (wholeChat?.lastMessage && !wholeChat?.isMessageRequestAccepted) {
      setCheckFirstSenderID(wholeChat?.lastMessage?.senderID);
    }

    setSelectedUserInfo(selectedInfo);
    setCurrentUserUser(currentUser);
    setSelectedChat([]);
    try {
      const q = query(
        collection(db, "Chats", chatID, "Messages"),
        orderBy("messageTime", "asc")
      );

      onSnapshot(q, (querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ ...doc.data(), messageId: doc.id });
        });
        if (
          chatContainer.current?.members.includes(arr?.[0]?.senderID) &&
          chatContainer.current?.members.includes(arr?.[0]?.opponentID)
        ) {
          setSelectedChat(arr);

          UpdateMessageSeen(arr, chatID, currentUser, wholeChat);
        }
      });
      setSelectedChatLoading(false);
    } catch (error) {
      setSelectedChatLoading(false);
      handleLogout(error);
    }
  };

  const UpdateUnreadMessageCount = async (chatID, currentUser, wholeChat) => {
    try {
      let getunreadMessageCount = { ...wholeChat?.unreadMessageCount };
      let getunreadMessageCount2 = wholeChat?.adminUnreadCount;
      getunreadMessageCount2 = 0;
      getunreadMessageCount[currentUser] = 0;
      await updateDoc(doc(db, "Chats", chatID), {
        unreadMessageCount: getunreadMessageCount,
        adminUnreadCount: getunreadMessageCount2,
      });
    } catch (error) {
      handleLogout(error);
    }
  };

  const UpdateMessageSeen = async (arr, chatID, currentUser, wholeChat) => {
    try {
      const docRef = doc(db, "Chats", chatID);
      const docSnap = await getDoc(docRef);
      let getunreadMessageCount =
        await docSnap.data()?.unreadMessageCount[currentUser];
      for (let i = 1; i <= getunreadMessageCount; i++) {
        let index = arr?.length - i;
        updateDoc(doc(db, "Chats", chatID, "Messages", arr[index].messageId), {
          readStatus: true,
        });
      }
      UpdateUnreadMessageCount(chatID, currentUser, wholeChat);
    } catch (error) {
      handleLogout(error);
    }
  };

  const sendMessage = async (message) => {
    if (message.trim()) {
      setEmojis([]);
      setEmojiPicker(false);
      let timeStamp = moment().unix();
      let randomString = Math.random().toString(36).slice(2, 40);
      try {
        let newMessageObject = {
          heartLikeMessage: false,
          message: message.replaceAll("&nbsp;", " "),
          messageTime: timeStamp,
          messageType: 1,
          opponentID: selectedUserInfo?.opponentID,
          readStatus: false,
          senderID: currentUserUser,
        };
        await setDoc(
          doc(db, "Chats", selectedUserInfo?.chatID, "Messages", randomString),
          newMessageObject
        );
        IncreaseUnreadCount();
        UpdateLastMessage(newMessageObject);
        sendNotification(selectedUserInfo?.opponentID, message, "chat");

        await updateDoc(doc(db, "Chats", selectedUserInfo?.chatID), {
          updatedAt: timeStamp,
        });
      } catch (error) {
        handleLogout(error);
      }
    }
  };

  const sendNotification = async (id, message, type) => {
    let req = {
      userId: id,
      message: message.replaceAll("&nbsp;", " "),
      notificationType: type,
    };

    await sendNotificationForWebChat(req);
  };

  const UpdateLastMessage = async (newMessageObject) => {
    try {
      await updateDoc(doc(db, "Chats", selectedUserInfo?.chatID), {
        lastMessage: newMessageObject,
        updatedAt: newMessageObject?.messageTime,
      });
    } catch (error) {
      handleLogout(error);
    }
  };

  const LikeMessage = async (item) => {
    if (item.senderID !== currentUserUser) {
      try {
        await updateDoc(
          doc(
            db,
            "Chats",
            selectedUserInfo?.chatID,
            "Messages",
            item.messageId
          ),
          {
            heartLikeMessage: !item.heartLikeMessage,
            message: item?.message,
            messageTime: item?.messageTime,
            messageType: item?.messageType,
            opponentID: item?.opponentID,
            readStatus: item?.readStatus,
            senderID: item?.senderID,
          }
        );
        sendNotification(item.opponentID, item.message, "like");
      } catch (error) {
        handleLogout(error);
      }
    }
  };

  const IncreaseUnreadCount = async () => {
    try {
      const docRef = doc(db, "Chats", selectedUserInfo?.chatID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let getunreadMessageCount = docSnap.data()?.unreadMessageCount;
        if (getunreadMessageCount) {
          Object.keys(getunreadMessageCount).forEach((item) => {
            if (item === selectedUserInfo?.opponentID) {
              getunreadMessageCount[selectedUserInfo?.opponentID]++;
              return;
            }
          });
          await updateDoc(docRef, {
            unreadMessageCount: getunreadMessageCount,
          });

          const unReadMessageRef = doc(
            db,
            "UnreadMessages",
            selectedUserInfo?.opponentID
          );

          await updateDoc(unReadMessageRef, {
            [selectedUserInfo.chatID]:
              getunreadMessageCount[selectedUserInfo?.opponentID],
          });
        } else {
          toast.error("Unread messages not found");
        }
      } else {
        // docSnap.data() will be undefined in this case
        toast.error("No data found");
      }
    } catch (error) {
      handleLogout(error);
    }
  };

  const fectchingAllFakeUserChat = async () => {
    let count = 0;
    setAllConversationLoading(true);
    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("userType", "array-contains", true),
        where("isDeletedChat", "==", false),
        where("blockedStatus", "==", false),
        orderBy("updatedAt", "desc"),
        limit(100)
      );
      const documentSnapshots = await getDocs(collectionRef);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];
      setsavelastdata(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });
        if (arr?.length > 0) {
          const filteredArray = arr.filter(
            (item) => item?.isBlockByAdmin?.length == 0
          );
          if (scrollPosition.current <= 7000) {
            setChatMember(filteredArray);
            dispatch(allChatData(filteredArray));
          }
        }
        setAllConversationLoading(false);
      });
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const fetchRemainingFakeUserChat = async () => {
    let count = 0;

    setAllConversationLoading(true);
    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("userType", "array-contains", true),
        where("isDeletedChat", "==", false),
        where("blockedStatus", "==", false),
        orderBy("updatedAt", "desc"),
        startAfter(savalastdata),
        limit(100)
      );

      onSnapshot(collectionRef, async (querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });
        if (arr?.length === 0) {
          setHasMore(false);
        }
        const filteredArray = arr.filter(
          (item) => item?.isBlockByAdmin?.length == 0
        );
        let updated_list = [...chatMember, ...filteredArray];
        setChatMember(updated_list);
        dispatch(allChatData([...chatMember, ...filteredArray]));
        const documentSnapshots = await getDocs(collectionRef);
        const lastVisible =
          documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];

        setsavelastdata(lastVisible);
      });
      setAllConversationLoading(false);
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const handleEmojiPicker = (event, ele, type) => {
    if (type !== "text") {
      if (emojis?.length === 0) {
        setEmojis([ele?.emoji]);
      } else {
        setEmojis([...emojis, ele?.emoji]);
      }
    } else {
      setEmojis([ele]);
    }
  };

  const getMessageInputValue = () => {
    if (emojis?.length > 1) {
      return emojis.toString().replaceAll(",", "");
    } else {
      return emojis.toString();
    }
  };

  const isSendingMessageEnable = (isPrivate, isMessageAccepted) => {
    if (isPrivate) {
      if (isMessageAccepted) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const filterChat = async (data) => {
    let count = 0;
    setAllConversationLoading(true);

    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("userType", "array-contains", true),
        where("isDeletedChat", "==", false),
        where("blockedStatus", "==", false),
        orderBy("updatedAt", "desc"),
        limit(100)
      );
      const documentSnapshots = await getDocs(collectionRef);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];
      setFilterChatLastData(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });

        setAllConversationLoading(false);

        if (data == "unreadChat") {
          const filteredArray = arr.filter((item) =>
            Object.values(item?.unreadMessageCount).some((count) => count > 0)
          );
          setChatMember(
            [...filteredArray].sort((a, b) => a.updatedAt - b.updatedAt)
          );
        } else if (data == "Readchat") {
          const filteredArray = arr.filter(
            (item) =>
              item?.adminUnreadCount == 0 && item?.isBlockByAdmin?.length == 0
          );
          setChatMember(filteredArray);
          dispatch(allReadChatData(filteredArray));
        } else {
          const filteredArray = arr.filter(
            (item) =>
              item?.adminUnreadCount == 0 && item?.isBlockByAdmin?.length == 0
          );
          setChatMember(filteredArray);
        }
      });
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const filterUnreadChat = async (type) => {
    try {
      let collectionRef;
      if (type === "tabClicked") {
        setAllConversationLoading(true);
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          where("adminUnreadCount", ">", 0),
          orderBy("adminUnreadCount", "asc"),
          orderBy("updatedAt", "asc"),
          limit(100)
        );
      } else {
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          where("adminUnreadCount", ">", 0),
          orderBy("adminUnreadCount", "asc"),
          orderBy("updatedAt", "asc"),
          startAfter(unreadFilterChatLastData),
          limit(100)
        );
      }
      const documentSnapshots = await getDocs(collectionRef);
      setAllConversationLoading(false);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];
      setUnreadFilterChatLastData(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
          setAllConversationLoading(false);
        });
        const filteredArray = arr.filter(
          (item) => item?.isBlockByAdmin?.length == 0
        );
        type === "tabClicked"
          ? setChatMember(
              [...filteredArray]?.sort((a, b) => a.updatedAt - b.updatedAt)
            )
          : setChatMember(
              [...chatMember, ...filteredArray].sort(
                (a, b) => a.updatedAt - b.updatedAt
              )
            );
        dispatch(
          allUnreadChatData(
            type === "tabClicked"
              ? [...filteredArray]?.sort((a, b) => a.updatedAt - b.updatedAt)
              : [...chatMember, ...filteredArray].sort(
                  (a, b) => a.updatedAt - b.updatedAt
                )
          )
        );
      });
      setAllConversationLoading(false);
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const fetchRemainingfiltetchat = async () => {
    let count = 0;

    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("userType", "array-contains", true),
        where("isDeletedChat", "==", false),
        where("blockedStatus", "==", false),
        orderBy("updatedAt", "desc"),
        startAfter(FilterChatLastData),
        limit(100)
      );
      const documentSnapshots = await getDocs(collectionRef);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];

      setFilterChatLastData(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });

        if (filterchattype == "unreadChat") {
          const filteredArray = arr.filter((item) =>
            Object.values(item.unreadMessageCount).some((count) => count > 0)
          );
          let updated_list = [...chatMember, ...filteredArray];
          setChatMember(updated_list);
        } else {
          const filteredArray = arr.filter(
            (item) =>
              item?.adminUnreadCount == 0 && item?.isBlockByAdmin?.length == 0
          );
          let updated_list = [...chatMember, ...filteredArray];
          setChatMember(updated_list);
          dispatch(allReadChatData(updated_list));
        }
      });
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const checkingNextFunc = () => {
    if (getAllUnreadChat == 1) {
      fetchRemainingFakeUserChat(); // All
    } else if (getAllUnreadChat == 2) {
      filterUnreadChat("scroll"); // Unread
    } else if (getAllUnreadChat == 5) {
      getPrivateMessagesChatOnly("scroll");
    } else if (getAllUnreadChat == 4) {
      getWomensChatOnly("scroll");
    } else {
      fetchRemainingfiltetchat(); // Read
    }
  };

  const getScrollTop = (scrollTop) => {
    scrollPosition.current = scrollTop;
  };

  const getPrivateMessagesChatOnly = async (type) => {
    let count = 0;
    try {
      let collectionRef;
      if (type === "tabClicked") {
        setAllConversationLoading(true);
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          // where("isPrivateMessage", "==", true),
          where("isMessageRequestAccepted", "==", false),
          // where("isBlockByAdmin", "array-contains", "==", 0),
          orderBy("updatedAt", "desc"),
          limit(100)
        );
      } else {
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          // where("isPrivateMessage", "==", true),
          where("isMessageRequestAccepted", "==", false),
          // where("isBlockByAdmin", "array-contains", "==", 0),
          orderBy("updatedAt", "desc"),
          startAfter(privateChatLastVisible),
          limit(100)
        );
      }
      const documentSnapshots = await getDocs(collectionRef);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];
      setPrivateChatLastVisible(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];

        querySnapshot?.forEach((doc) => {
          arr?.push(doc?.data());
        });

        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });
        if (arr?.length > 0) {
          const filteredArray = arr.filter(
            (item) => item?.isBlockByAdmin?.length == 0
          );
          if (scrollPosition.current <= 7000) {
            // setChatMember(filteredArray);
            // dispatch(privateChatData(filteredArray));
            type === "tabClicked"
              ? setChatMember(
                  [...filteredArray]?.sort(
                    (a, b) => a?.updatedAt - b?.updatedAt
                  )
                )
              : setChatMember(
                  [...chatMember, ...filteredArray]?.sort(
                    (a, b) => a?.updatedAt - b?.updatedAt
                  )
                );

            dispatch(
              privateChatData(
                type === "tabClicked"
                  ? [...filteredArray]?.sort(
                      (a, b) => a?.updatedAt - b?.updatedAt
                    )
                  : [...chatMember, ...filteredArray]?.sort(
                      (a, b) => a?.updatedAt - b?.updatedAt
                    )
              )
            );
          }
        }
        setAllConversationLoading(false);
      });
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const getWomensChatOnly = async (type) => {
    let count = 0;
    try {
      let collectionRef;
      if (type === "tabClicked") {
        setAllConversationLoading(true);
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          where("isMatchedWithWomen", "==", 0),
          orderBy("updatedAt", "desc"),
          limit(100)
        );
      } else {
        collectionRef = query(
          collection(db, "Chats"),
          where("userType", "array-contains", true),
          where("isDeletedChat", "==", false),
          where("blockedStatus", "==", false),
          where("isMatchedWithWomen", "==", 0),
          orderBy("updatedAt", "desc"),
          startAfter(womensChatLastVisible),
          limit(100)
        );
      }
      const documentSnapshots = await getDocs(collectionRef);
      const lastVisible =
        documentSnapshots?.docs[documentSnapshots?.docs?.length - 1];
      setWomensChatLastVisible(lastVisible);

      onSnapshot(collectionRef, (querySnapshot) => {
        var arr = [];

        querySnapshot?.forEach((doc) => {
          arr.push(doc?.data());
        });

        arr?.filter((item) => {
          if (item?.userType) {
            let userDetails = [
              {
                userType: item?.userType[0],
                id: item?.members[0],
              },
              {
                userType: item?.userType[1],
                id: item?.members[1],
              },
            ];

            if (item?.unreadMessageCount) {
              userDetails?.filter((ele) => {
                if (ele?.userType) {
                  let id = ele?.id;
                  count = count + item?.unreadMessageCount[id];
                  dispatch(notificationBell(count));
                }
              });
            }
          }
        });
        if (arr?.length > 0) {
          const filteredArray = arr.filter(
            (item) => item?.isBlockByAdmin?.length == 0
          );
          let finalArray = [];
          if (filteredArray?.length > 0) {
            filteredArray?.map((val) => {
              if (val?.lastMessage) {
                finalArray = [];
              } else {
                finalArray.push(val);
              }
            });
            type === "tabClicked" && finalArray
              ? setChatMember(
                  [...finalArray]?.sort((a, b) => a?.updatedAt - b?.updatedAt)
                )
              : setChatMember(
                  [...chatMember, ...finalArray]?.sort(
                    (a, b) => a?.updatedAt - b?.updatedAt
                  )
                );
            dispatch(
              womensChatData(
                type === "tabClicked"
                  ? [...finalArray]?.sort((a, b) => a?.updatedAt - b?.updatedAt)
                  : [...chatMember, ...finalArray]?.sort(
                      (a, b) => a.updatedAt - b.updatedAt
                    )
              )
            );
          }
        }
        setAllConversationLoading(false);
      });
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  useEffect(() => {
    if (scrollPosition.current == 0) {
      fectchingAllFakeUserChat();
    }
  }, [scrollPosition.current]);

  useEffect(() => {
    dispatch(allUnreadChatData([]));
    dispatch(updateUnreadChat(1));
    dispatch(allChatData([]));
    dispatch(womensChatData([]));
  }, []);

  return (
    <Mainwrapper
      style={{
        background: "#ffffff",
        minHeight: "50vh",
        padding: width <= 700 ? "0px 20px 15px 20px" : "20px",
        paddingTop: "0px",
        overflow: "hidden",
      }}
    >
      <Mainheading
        style={{
          color: "#000000",
          padding: width <= 700 ? "20px 20px 15px 20px" : "20px 15px",
        }}
      >
        <div>
          <p className="MessagerHeader">Fake Messenger </p>
          <div className="chat-filter-btn">
            {" "}
            <div className="flex-btn-div">
              <button
                className="read-btns"
                style={{ background: selectedTab == 1 ? "green" : "red" }}
                onClick={() => {
                  setSelectedTab(1);
                  dispatch(updateUnreadChat(1));
                  filterChat("");
                  fectchingAllFakeUserChat();
                  dispatch(allReadChatData([]));
                }}
              >
                All Chat{" "}
              </button>{" "}
              <button
                className="read-btns"
                style={{ background: selectedTab == 2 ? "green" : "red" }}
                onClick={() => {
                  dispatch(updateUnreadChat(2));
                  filterUnreadChat("tabClicked");
                  setSelectedTab(2);
                  dispatch(allChatData([]));
                  dispatch(allReadChatData([]));
                  getScrollTop(0);
                }}
              >
                Unread Chat
              </button>
              <button
                className="read-btns"
                style={{ background: selectedTab == 3 ? "green" : "red" }}
                onClick={() => {
                  dispatch(updateUnreadChat(3));
                  filterChat("Readchat");
                  setSelectedTab(3);
                  dispatch(allChatData([]));
                  setFilterchattype("Readchat");
                  getScrollTop(0);
                }}
              >
                Read Chat
              </button>{" "}
            </div>
            <div className="women-private-div">
              <button
                style={{ background: selectedTab == 4 ? "green" : "red" }}
                className="read-btns"
                onClick={() => {
                  setSelectedTab(4);
                  dispatch(updateUnreadChat(4));
                  getWomensChatOnly("tabClicked");
                }}
              >
                Women Only
              </button>
              <button
                style={{ background: selectedTab == 5 ? "green" : "red" }}
                className="read-btns"
                onClick={() => {
                  setSelectedTab(5);
                  dispatch(updateUnreadChat(5));
                  getPrivateMessagesChatOnly("tabClicked");
                }}
              >
                Private Messages
              </button>
            </div>
          </div>
        </div>
        {width > 700 && (
          <div
            className="location-div"
            style={{ display: "flex", alignItems: "end" }}
          >
            <p style={{ height: "max-content" }}>{fakeUserLocation}</p>
          </div>
        )}
      </Mainheading>

      {emojiPicker && (
        <div className="emojiPickerWrapper">
          <Picker
            search
            skinTonePickerLocation="search"
            onEmojiClick={handleEmojiPicker}
            searchDisabled
          />
        </div>
      )}

      <ChatSectionLayout key={getAllUnreadChat}>
        {(!isMobile || (isMobile && !showMemberConversation)) &&
          (getAllUnreadChat == 1 ? (
            <AllConversations>
              {allConversationLoading ? (
                <LoaderWrapper
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Spin size="large" />
                </LoaderWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={allChat && allChat?.length}
                  next={checkingNextFunc}
                  hasMore={hasMore}
                  onScroll={(e) => {
                    getScrollTop(e?.target?.scrollTop);
                    if (e?.target?.scrollTop == 0) {
                      fectchingAllFakeUserChat();
                    }
                  }}
                  loader={allConversationLoading && <h4>Loading...</h4>}
                  height="100%"
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {!allChat?.length > 0 ? (
                      <NoMessageYet>
                        <p>No Message Yet</p>
                        <img src={messanger} alt="" />
                      </NoMessageYet>
                    ) : (
                      <>
                        {allChat?.length > 0 &&
                          allChat?.map((allChat, idx) => (
                            <>
                              <MemberConversation
                                chatMember={allChat}
                                key={idx}
                              />
                            </>
                          ))}
                      </>
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </AllConversations>
          ) : getAllUnreadChat == 2 ? (
            <AllConversations>
              {allConversationLoading ? (
                <LoaderWrapper
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Spin size="large" />
                </LoaderWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={
                    getAllUnreadChatData && getAllUnreadChatData?.length
                  }
                  next={checkingNextFunc}
                  hasMore={hasMore}
                  loader={allConversationLoading && <h4>Loading...</h4>}
                  height="100%"
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {!getAllUnreadChatData?.length > 0 ? (
                      <NoMessageYet>
                        <p>No Message Yet</p>
                        <img src={messanger} alt="" />
                      </NoMessageYet>
                    ) : (
                      <>
                        {getAllUnreadChatData?.length > 0 &&
                          getAllUnreadChatData?.map(
                            (getAllUnreadChatData, idx) => (
                              <>
                                <MemberConversation
                                  chatMember={getAllUnreadChatData}
                                  key={idx}
                                />
                              </>
                            )
                          )}
                      </>
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </AllConversations>
          ) : getAllUnreadChat == 3 ? (
            <AllConversations>
              {allConversationLoading ? (
                <LoaderWrapper
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Spin size="large" />
                </LoaderWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={allReadChat && allReadChat?.length}
                  next={checkingNextFunc}
                  hasMore={hasMore}
                  loader={allConversationLoading && <h4>Loading...</h4>}
                  height="100%"
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {!allReadChat?.length > 0 ? (
                      <NoMessageYet>
                        <p>No Message Yet</p>
                        <img src={messanger} alt="" />
                      </NoMessageYet>
                    ) : (
                      <>
                        {allReadChat?.length > 0 &&
                          allReadChat?.map((allReadChat, idx) => (
                            <>
                              <MemberConversation
                                chatMember={allReadChat}
                                key={idx}
                              />
                            </>
                          ))}
                      </>
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </AllConversations>
          ) : getAllUnreadChat == 4 ? (
            <AllConversations>
              {allConversationLoading ? (
                <LoaderWrapper
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Spin size="large" />
                </LoaderWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={allWomensChat && allWomensChat?.length}
                  next={checkingNextFunc}
                  hasMore={hasMore}
                  loader={allConversationLoading && <h4>Loading...</h4>}
                  height="100%"
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {!allWomensChat?.length > 0 ? (
                      <NoMessageYet>
                        <p>No Message Yet</p>
                        <img src={messanger} alt="" />
                      </NoMessageYet>
                    ) : (
                      <>
                        {allWomensChat?.length > 0 &&
                          allWomensChat?.map((allWomensChat, idx) => (
                            <>
                              <MemberConversation
                                chatMember={allWomensChat}
                                key={idx}
                              />
                            </>
                          ))}
                      </>
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </AllConversations>
          ) : getAllUnreadChat == 5 ? (
            <AllConversations>
              {allConversationLoading ? (
                <LoaderWrapper
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Spin size="large" />
                </LoaderWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={privateChat && privateChat?.length}
                  next={checkingNextFunc}
                  hasMore={hasMore}
                  loader={allConversationLoading && <h4>Loading...</h4>}
                  height="100%"
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    {!privateChat?.length > 0 ? (
                      <NoMessageYet>
                        <p>No Message Yet</p>
                        <img src={messanger} alt="" />
                      </NoMessageYet>
                    ) : (
                      <>
                        {privateChat?.length > 0 &&
                          privateChat?.map((privateChat, idx) => (
                            <>
                              <MemberConversation
                                chatMember={privateChat}
                                key={idx}
                              />
                            </>
                          ))}
                      </>
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </AllConversations>
          ) : (
            <AllConversations
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ))}

        {(!isMobile || (isMobile && showMemberConversation)) && (
          <SelectedInbox>
            {width <= 700 && (
              <div
                className="location-div"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  paddingBottom: "8px",
                }}
              >
                <p style={{ height: "max-content" }}>{fakeUserLocation}</p>
              </div>
            )}
            <div
              style={{
                position: "relative",
                height:
                  width <= 700
                    ? isIOS
                      ? "calc(100vh - 270px)"
                      : "calc(100vh - 210px)"
                    : "100%",
              }}
            >
              {/* only visible either if chat request is accepted or both are matched  */}
              {selectedUserInfo &&
                isSendingMessageEnable(
                  showPrivateMessageButton,
                  isMessageRequestAccepted
                ) && (
                  <img
                    onClick={() => setEmojiPicker(!emojiPicker)}
                    src={emojiBtn}
                    className="CustomEmoji"
                    alt=""
                  />
                )}
              <MainContainer>
                {!selectedUserHandle ? (
                  <NoConversationSelected>
                    <div>
                      <img src={MessageIcon} alt="" />
                      <p>
                        {" "}
                        No Conversation
                        <br /> Selected
                      </p>
                    </div>
                  </NoConversationSelected>
                ) : (
                  <>
                    {selectedChatLoading ? (
                      <LoaderWrapper
                        style={{
                          position: "relative",
                          height: "100%",
                          background: "#fff",
                        }}
                      >
                        <Spin size="large" />
                      </LoaderWrapper>
                    ) : (
                      <ChatContainer>
                        <ConversationHeader>
                          {isMobile && (
                            <ConversationHeader.Back
                              onClick={showHideConversationScreen}
                            />
                          )}
                          <Avatar
                            src={
                              process.env.REACT_APP_BASEURL_IMAGE +
                              selectedUserInfo?.profileImage
                            }
                            name={selectedUserInfo?.name}
                          />
                          <ConversationHeader.Content>
                            <ConversationHeaderRightSection>
                              <ReceiverName>
                                <ProfileLink
                                  href={`${process.env.REACT_APP_WEB_URL}dashboard/userdetails/${selectedUserInfo?.opponentID}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {selectedUserInfo?.name}
                                </ProfileLink>
                              </ReceiverName>
                              <div
                                style={{
                                  display: "flex",
                                  width: "60%",
                                  justifyContent: "right",
                                }}
                              >
                                <Avatar
                                  src={
                                    process.env.REACT_APP_BASEURL_IMAGE +
                                    currentUserInfo?.image
                                  }
                                  name={currentUserInfo?.name}
                                />
                                <SenderName>
                                  <ProfileLink
                                    href={`${process.env.REACT_APP_WEB_URL}dashboard/userdetails/${currentUserUser}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {currentUserInfo?.name}
                                  </ProfileLink>
                                </SenderName>
                              </div>
                            </ConversationHeaderRightSection>
                          </ConversationHeader.Content>
                        </ConversationHeader>
                        <MessageList>
                          {selectedChat?.length > 0
                            ? selectedChat?.map((item) => {
                                let time = moment
                                  .unix(item.messageTime)
                                  .format("dddd,MMM DD YYYY");
                                let alreadyExist =
                                  dateDifference.includes(time);
                                if (!alreadyExist) dateDifference.push(time);
                                return (
                                  <>
                                    {!alreadyExist && (
                                      <MessageSeparator
                                        content={
                                          today_date === time ? "Today" : time
                                        }
                                      />
                                    )}
                                    {item?.messageType === 3 ? (
                                      <div
                                        style={{
                                          display: "block",
                                          marginBottom: "5px",
                                        }}
                                      >
                                        <WaveCreator
                                          audioUrl={
                                            process.env
                                              .REACT_APP_BASEURL_IMAGE +
                                            item?.message
                                          }
                                          peaks={item?.waveFromValue}
                                          myDuration={item?.audioTime}
                                          messageId={item?.messageId}
                                          {...{
                                            currentId,
                                            setCurrentId,
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <Message
                                        key={item.messageTime}
                                        className="_messages_container"
                                        style={{
                                          paddingRight: `${
                                            item.senderID !== currentUserUser
                                              ? "12px"
                                              : "0px"
                                          }`,
                                          paddingLeft: `${
                                            item.senderID === currentUserUser
                                              ? "12px"
                                              : "0px"
                                          }`,
                                        }}
                                        model={{
                                          direction: `${
                                            item.senderID !== currentUserUser
                                              ? "incoming"
                                              : "outgoing"
                                          }`,
                                        }}
                                      >
                                        <Message.CustomContent>
                                          <MessageWrapper
                                            messageOwner={
                                              item.senderID !== currentUserUser
                                                ? "incoming"
                                                : "outgoing"
                                            }
                                          >
                                            {item.messageType === 2 ? (
                                              <GifyRender
                                                gifyName={item.message}
                                              />
                                            ) : (
                                              item.message
                                            )}
                                            <div
                                              className="LikeMessageButton"
                                              onClick={() => LikeMessage(item)}
                                            >
                                              {item.heartLikeMessage ? (
                                                <HeartIcon
                                                  style={{ color: "red" }}
                                                />
                                              ) : (
                                                item.senderID !==
                                                  currentUserUser && (
                                                  <HeartIcon
                                                    style={{ color: "#b9b8b8" }}
                                                  />
                                                )
                                              )}
                                            </div>
                                          </MessageWrapper>
                                        </Message.CustomContent>
                                        {item.senderID === currentUserUser && (
                                          <Message.Footer>
                                            <MessageStatus>
                                              {moment
                                                .unix(item.messageTime)
                                                .local()
                                                .format("hh:mm a")}
                                              {!item.readStatus ? (
                                                <DoubleTickIcon color="#8a9197" />
                                              ) : isSubscibed ? (
                                                <DoubleTickIcon color="#db3cdb" />
                                              ) : (
                                                <DoubleTickIcon color="#34b7f1" />
                                              )}
                                            </MessageStatus>
                                          </Message.Footer>
                                        )}
                                        {item.senderID !== currentUserUser && (
                                          <Message.Footer>
                                            <MessageInfo>
                                              {moment
                                                .unix(item.messageTime)
                                                .local()
                                                .format("hh:mm a")}
                                            </MessageInfo>
                                          </Message.Footer>
                                        )}
                                      </Message>
                                    )}
                                  </>
                                );
                              })
                            : selectedChat?.length === 0 && (
                                <NoConversationSelected>
                                  <div>
                                    <img src={MessageIcon} alt="" />
                                    <p>
                                      {" "}
                                      No Conversation
                                      <br /> Found
                                    </p>
                                  </div>
                                </NoConversationSelected>
                              )}
                          {/* only visible if real user want to chat with fake user without matched */}
                          {checkFirstSenderID === selectedUserInfo.opponentID &&
                            showPrivateMessageButton &&
                            !isMessageRequestAccepted && (
                              <div className="private-msg-btns">
                                <div className="accept-btn">
                                  <button
                                    onClick={() => handlePrivateMsgActions(1)}
                                  >
                                    {btnLoader !== 1 ? "ACCEPT" : "Loading"}
                                  </button>
                                </div>

                                <div className="deny-btn">
                                  <button
                                    onClick={() => handlePrivateMsgActions(2)}
                                  >
                                    {" "}
                                    {btnLoader !== 2 ? "DENY" : "Loading"}
                                  </button>
                                </div>
                              </div>
                            )}
                        </MessageList>
                        {/* only visible either if chat request is accepted or both are matched user  */}

                        {isSendingMessageEnable(
                          showPrivateMessageButton,
                          isMessageRequestAccepted
                        ) && (
                          <MessageInput
                            placeholder="Type message here"
                            attachButton="false"
                            onSend={(message, type) => sendMessage(type)}
                            value={getMessageInputValue()}
                            onChange={(e) =>
                              handleEmojiPicker("emoji", e, "text")
                            }
                          />
                        )}
                      </ChatContainer>
                    )}
                  </>
                )}
              </MainContainer>
            </div>
            {/* )} */}
          </SelectedInbox>
        )}
      </ChatSectionLayout>
    </Mainwrapper>
  );
}

FakeMessager.propTypes = {
  chatMember: PropTypes.any,
  key: PropTypes.any,
};

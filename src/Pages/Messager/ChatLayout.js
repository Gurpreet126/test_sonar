import { Mainheading, Mainwrapper } from "Pages/Stylepage";
import React, { useEffect, useRef, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  Conversation,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { MessageIcon, emojiBtn } from "Utils/Image";
import {
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  getCountFromServer,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { useLocation } from "react-router";
import { messanger } from "Utils/Logo";
import {
  AllConversations,
  ChatSectionLayout,
  LoaderWrapper,
  MessageWrapper,
  NoConversationSelected,
  NoMessageYet,
  SelectedInbox,
} from "Styles/Globalstyle";
import { Spin } from "antd";
import moment from "moment";
import {
  sendNotificationForWebChat,
  getSubscriptionUserStatus,
} from "Services/Collection";
import { HeartIcon } from "Utils/Icons";
import EmojiPicker from "emoji-picker-react";
import GifyRender from "Component/Gify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { authlogout } from "Store/Authlogin";
import { DoubleTickIcon } from "Assests/logo/svgfile";
import { toast } from "react-toastify";
import {
  ConversationHeaderRightSection,
  MessageInfo,
  MessageStatus,
  ProfileLink,
  ReceiverName,
  SenderName,
} from "models/MessagerStyle";
import PropTypes from "prop-types";

const calculateTimeDifference = (msgTimeStamp) => {
  const currentTimeStamp = Date.now();
  const difference = currentTimeStamp - msgTimeStamp;

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  let remainingDiff = difference - daysDifference * 1000 * 60 * 60 * 24;

  const hoursDifference = Math.floor(remainingDiff / 1000 / 60 / 60);
  remainingDiff -= hoursDifference * 1000 * 60 * 60;

  const minutesDifference = Math.floor(remainingDiff / 1000 / 60);

  return { daysDifference, hoursDifference, minutesDifference };
};

const getSelectedUserInfo = (chatMember, currentUser) => {
  return chatMember?.members.filter((item) => item !== currentUser.id);
};

const getLastChatTime = (
  msgTimeStamp,
  daysDifference,
  hoursDifference,
  minutesDifference
) => {
  if (daysDifference) {
    return moment.unix(msgTimeStamp).local().format("DD/MM/yyyy");
  }

  if (hoursDifference) {
    return `${hoursDifference}${hoursDifference > 1 ? " hours" : " hour"} ago`;
  }

  if (minutesDifference > 0) {
    return `${minutesDifference}${minutesDifference > 1 ? " mins" : " min"} ago`;
  }

  return !isNaN(msgTimeStamp) ? "Now" : "";
};

const MemberConversation = ({
  chatMember,
  currentUser,
  getSelectedCoversation,
}) => {
  const selectedUserInfo = getSelectedUserInfo(chatMember, currentUser);
  const msgTimeStamp = chatMember?.lastMessage?.messageTime * 1000;
  const { daysDifference, hoursDifference, minutesDifference } =
    calculateTimeDifference(msgTimeStamp);

  const lastChatTime = getLastChatTime(
    msgTimeStamp,
    daysDifference,
    hoursDifference,
    minutesDifference
  );

  const selectedUser = chatMember[selectedUserInfo]?.name;

  const lastSenderName =
    chatMember?.lastMessage?.senderID === selectedUserInfo[0]
      ? chatMember[selectedUserInfo]?.name
      : currentUser?.user;

  const info =
    chatMember?.lastMessage?.messageType === "2"
      ? "Gif"
      : chatMember?.lastMessage?.message;

  const unreadCnt = chatMember?.unreadMessageCount?.[currentUser?.id];

  const handleClick = () => {
    getSelectedCoversation(
      chatMember?.chatID,
      selectedUser,
      chatMember[selectedUserInfo]?.image,
      selectedUserInfo?.[0],
      chatMember[currentUser?.id]
    );
  };

  return (
    <Conversation
      name={selectedUser}
      lastSenderName={lastSenderName}
      info={info}
      onClick={handleClick}
      unreadCnt={unreadCnt}
      lastActivityTime={
        <span
          style={{
            color: "#349134",
            width: "48px",
            fontWeight: "bold",
          }}
        >
          {lastChatTime}
        </span>
      }
    >
      <Avatar
        src={
          process.env.REACT_APP_BASEURL_IMAGE +
          chatMember[selectedUserInfo]?.image
        }
        name={selectedUser}
      />
    </Conversation>
  );
};

export default function ChatLayout() {
  const currentUser = useLocation()?.state;
  const [chatMember, setChatMember] = useState([]);
  console.log(chatMember, "chatMember");
  const [selectedChat, setSelectedChat] = useState([]);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [selectedChatLoading, setSelectedChatLoading] = useState(false);
  const [allConversationLoading, setAllConversationLoading] = useState(true);
  const [selectedUserHandle, setSelectedUserHandle] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const [chatListCount, setChatListCount] = useState(0);
  const [isSubscibed, setIsSubscibed] = useState(false);
  const chatContainer = useRef(null);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const dispatch = useDispatch();
  const [showMemberConversation, setShowMemberConversation] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const shouldDisplayChatSection = (isMobile, showMemberConversation) =>
    !isMobile || (isMobile && !showMemberConversation);

  // used to get current date used in conversation section
  let today_date = moment().format("dddd,DD MMMM YYYY");
  const dateDifference = [];

  const handleLogout = (error) => {
    if (
      error.code === 401 ||
      error.code === 403 ||
      error.code.includes("permission-denied")
    )
      dispatch(authlogout());
    if (error.code.includes("resource-exhausted")) toast.error("Exceed limit");
  };

  const showHideConversationScreen = () =>
    setShowMemberConversation((prev) => !prev);

  const getAllChats = async () => {
    setAllConversationLoading(true);
    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("members", "array-contains", currentUser?.id.toString()),
        where("isDeletedChat", "==", false),
        where("blockedStatus", "==", false),
        orderBy("updatedAt", "desc"),
        limit(10)
      );

      onSnapshot(collectionRef, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setChatMember(arr);
      });
      setAllConversationLoading(false);
    } catch (error) {
      setAllConversationLoading(false);
      handleLogout(error);
    }
  };

  const getSelectedCoversation = async (
    chatID,
    name,
    profileImage,
    opponentID,
    currentUserInfo
  ) => {
    showHideConversationScreen();
    setSelectedUserHandle(true);
    setSelectedChatLoading(true);
    setCurrentUserInfo(currentUserInfo);
    chatContainer.current = [opponentID, currentUser?.id];
    let selectedInfo = {
      name: name,
      profileImage: profileImage,
      chatID: chatID,
      opponentID: opponentID,
    };
    setSelectedUserInfo(selectedInfo);
    setSelectedChat([]);
    try {
      const q = query(
        collection(db, "Chats", chatID, "Messages"),
        orderBy("messageTime", "asc")
      );
      onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ ...doc.data(), messageId: doc.id });
        });
        if (
          chatContainer.current?.includes(arr?.[0]?.senderID) &&
          chatContainer.current?.includes(arr?.[0]?.opponentID)
        ) {
          setSelectedChat(arr);
          UpdateMessageSeen(arr, chatID);
        }
      });
      setSelectedChatLoading(false);
    } catch (error) {
      setSelectedChatLoading(false);
      handleLogout(error);
    }
  };

  const UpdateUnreadMessageCount = async (chatID, wholeChat) => {
    try {
      if (wholeChat !== null) {
        let getunreadMessageCount = { ...wholeChat?.unreadMessageCount };
        getunreadMessageCount[currentUser?.id] = 0;
        await updateDoc(doc(db, "Chats", chatID), {
          unreadMessageCount: getunreadMessageCount,
        });
      }
    } catch (error) {
      handleLogout(error);
    }
  };

  const UpdateMessageSeen = async (arr, chatID) => {
    let wholeChat = null;
    try {
      const docRef = doc(db, "Chats", chatID);
      const docSnap = await getDoc(docRef);
      wholeChat = await docSnap.data();
      let getunreadMessageCount = wholeChat?.unreadMessageCount[currentUser.id];
      for (let i = 1; i <= getunreadMessageCount; i++) {
        let index = arr.length - i;
        updateDoc(doc(db, "Chats", chatID, "Messages", arr[index].messageId), {
          readStatus: true,
        });
      }
    } catch (error) {
      handleLogout(error);
    }
    UpdateUnreadMessageCount(chatID, wholeChat);
  };

  const handleSubscriptionUserStatus = async (id) => {
    try {
      let isSubscription = await getSubscriptionUserStatus(id);
      if (isSubscription.status === 200) {
        const status = isSubscription?.data?.subscriptionStatus;
        setIsSubscibed(status);
      } else {
        toast.error(isSubscription?.message);
      }
    } catch (error) {
      handleLogout(error);
    }
  };

  const sendMessage = async (message) => {
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
        senderID: currentUser?.id,
      };
      await setDoc(
        doc(db, "Chats", selectedUserInfo?.chatID, "Messages", randomString),
        newMessageObject
      );
      IncreaseUnreadCount();
      UpdateLastMessage(newMessageObject);
      sendNotification(selectedUserInfo?.opponentID, message, "chat");
    } catch (error) {
      handleLogout(error);
    }
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

  const sendNotification = async (id, message, type) => {
    let req = {
      userId: id,
      message: message.replaceAll("&nbsp;", " "),
      notificationType: type,
    };
    let res = await sendNotificationForWebChat(req);
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(
        res.response.data.message ||
          res.error ||
          res.message ||
          "Something went wrong"
      );
    }
  };

  const LikeMessage = async (item) => {
    if (currentUser?.accountType) {
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
            // fileName: item.fileName,
            heartLikeMessage: true,
            message: item.message,
            messageTime: item.messageTime,
            messageType: item.messageType,
            opponentID: item.opponentID,
            readStatus: item.readStatus,
            senderID: item.senderID,
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

        Object.keys(getunreadMessageCount).forEach((item) => {
          if (item === selectedUserInfo?.opponentID) {
            getunreadMessageCount[item] = getunreadMessageCount[item] + 1;
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
        // docSnap.data() will be undefined in this case
        toast.error("No such document!");
      }
    } catch (error) {
      handleLogout(error);
    }
  };

  const handleEmojiPicker = (event, ele, type) => {
    if (type !== "text") {
      if (emojis.length === 0) {
        setEmojis([ele?.emoji]);
      } else {
        setEmojis([...emojis, ele?.emoji]);
      }
    } else {
      setEmojis([ele]);
    }
  };

  const getMessageInputValue = () => {
    if (emojis.length > 1) {
      return emojis.toString().replaceAll(",", "");
    } else {
      return emojis.toString();
    }
  };

  const getCountOfChatsCollection = async () => {
    try {
      const coll = query(
        collection(db, "Chats"),
        where("members", "array-contains", currentUser?.id.toString())
      );
      const snapshot = await getCountFromServer(coll);
      setChatListCount(snapshot.data().count);
    } catch (error) {
      handleLogout(error);
    }
  };

  const fetchAllRemainingChats = async () => {
    let last = chatMember.length;
    setAllConversationLoading(true);
    try {
      const collectionRef = query(
        collection(db, "Chats"),
        where("members", "array-contains", currentUser?.id.toString()),
        orderBy("updatedAt", "asc"),
        startAfter(last),
        limit(
          chatListCount - chatMember.length >= 10
            ? 10
            : chatListCount - chatMember.length
        )
      );
      onSnapshot(collectionRef, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        let updated_list = [...chatMember, ...arr];
        setChatMember(updated_list);
      });
      setAllConversationLoading(false);
    } catch (error) {
      setAllConversationLoading(false);
    }
  };
  useEffect(() => {
    getAllChats();
    getCountOfChatsCollection();
    handleSubscriptionUserStatus(currentUser?.id);
  }, []);
  return (
    <Mainwrapper
      style={{ background: "#ffffff", minHeight: "50vh", padding: "20px" }}
    >
      <Mainheading style={{ color: "#000000" }}>
        <div>
          <p className="MessagerHeader">{currentUser?.user}&apos;s Messanger</p>
        </div>
      </Mainheading>

      {emojiPicker && (
        <div className="emojiPickerWrapper">
          <EmojiPicker onEmojiClick={handleEmojiPicker} />
        </div>
      )}

      <ChatSectionLayout>
        {shouldDisplayChatSection(isMobile, showMemberConversation) && (
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
                dataLength={chatMember.length}
                next={fetchAllRemainingChats}
                hasMore={chatMember.length < chatListCount}
                loader={<h4>Loading...</h4>}
                height="100%"
              >
                <div style={{ position: "relative", height: "100%" }}>
                  {!chatMember?.length > 0 ? (
                    <NoMessageYet>
                      <p>No Message Yet</p>
                      <img src={messanger} alt="" />
                    </NoMessageYet>
                  ) : (
                    <>
                      {chatMember?.length > 0 &&
                        chatMember?.map((chatMember) => (
                          <MemberConversation
                            key={chatMember?.chatID}
                            chatMember={chatMember}
                            currentUser={currentUser}
                            getSelectedCoversation={getSelectedCoversation}
                          />
                        ))}
                    </>
                  )}
                </div>
              </InfiniteScroll>
            )}
          </AllConversations>
        )}

        {(!isMobile || (isMobile && showMemberConversation)) && (
          <SelectedInbox>
            <div style={{ position: "relative", height: "100%" }}>
              {selectedUserInfo && (
                <div
                  role="button"
                  tabIndex="0"
                  aria-label="Toggle Emoji Picker"
                  className="CustomEmojiOuter"
                  onClick={() => setEmojiPicker(!emojiPicker)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault(); // Prevent default behavior for space
                      setEmojiPicker(!emojiPicker);
                    }
                  }}
                >
                  <img
                    src={emojiBtn}
                    className="CustomEmoji"
                    alt="Emoji Button"
                  />
                </div>
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
                                  href={`${process.env.REACT_APP_WEB_URL}dashboard/userdetails/${selectedUserInfo.opponentID}`}
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
                                    href={`${process.env.REACT_APP_WEB_URL}dashboard/userdetails/${currentUser?.id}`}
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
                          {selectedChat.length > 0
                            ? selectedChat.map((item) => {
                                let time = moment
                                  .unix(item.messageTime)
                                  .format("dddd,DD MMMM YYYY");
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
                                    <Message
                                      key={item.messageTime}
                                      style={{
                                        paddingRight: `${
                                          item.senderID !== currentUser?.id
                                            ? "12px"
                                            : "0px"
                                        }`,
                                        paddingLeft: `${
                                          item.senderID === currentUser?.id
                                            ? "12px"
                                            : "0px"
                                        }`,
                                      }}
                                      model={{
                                        direction: `${
                                          item.senderID !== currentUser?.id
                                            ? "incoming"
                                            : "outgoing"
                                        }`,
                                      }}
                                    >
                                      <Message.CustomContent>
                                        <MessageWrapper
                                          messageOwner={
                                            item.senderID !== currentUser?.id
                                              ? "incoming"
                                              : "outgoing"
                                          }
                                        >
                                          {item.messageType === 2 ? (
                                            <GifyRender
                                              gifyName={item?.message}
                                            />
                                          ) : (
                                            item?.message
                                          )}
                                          <div
                                            role="button"
                                            tabIndex={0}
                                            className="LikeMessageButton"
                                            onClick={() => LikeMessage(item)}
                                            onKeyDown={(e) => {
                                              if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                              ) {
                                                e.preventDefault(); // Prevent default behavior for space key (scrolling)
                                                LikeMessage(item);
                                              }
                                            }}
                                            aria-label="Like message"
                                          >
                                            {item?.heartLikeMessage ? (
                                              <HeartIcon
                                                style={{ color: "red" }}
                                              />
                                            ) : (
                                              item?.senderID !==
                                                currentUser?.id && (
                                                <HeartIcon
                                                  style={{ color: "#b9b8b8" }}
                                                />
                                              )
                                            )}
                                          </div>
                                        </MessageWrapper>
                                      </Message.CustomContent>
                                      <Message.Footer>
                                        {item?.senderID !== currentUser?.id && (
                                          <MessageInfo>
                                            {moment
                                              .unix(item?.messageTime)
                                              .local()
                                              .format("hh:mm a")}
                                          </MessageInfo>
                                        )}
                                        {item.senderID === currentUser?.id && (
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
                                        )}
                                      </Message.Footer>
                                    </Message>
                                  </>
                                );
                              })
                            : selectedChat.length === 0 && (
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
                        </MessageList>

                        {!currentUser?.accountType ? (
                          <MessageInput
                            placeholder="Chat is disable, You can't message in between of real users !"
                            attachButton="false"
                            disabled
                          />
                        ) : (
                          <MessageInput
                            placeholder="Type message here"
                            attachButton="false"
                            onSend={(message, type) => sendMessage(type)}
                            value={getMessageInputValue()}
                            onChange={(e) => {
                              setEmojiPicker(false);
                              handleEmojiPicker("event", e, "text");
                            }}
                            activateAfterChange="true"
                          />
                        )}
                      </ChatContainer>
                    )}
                  </>
                )}
              </MainContainer>
            </div>
          </SelectedInbox>
        )}
      </ChatSectionLayout>
    </Mainwrapper>
  );
}

ChatLayout.propTypes = {
  chatMember: PropTypes.any,
};

MemberConversation.propTypes = {
  chatMember: PropTypes.any,
  currentUser: PropTypes.any,
  getSelectedCoversation: PropTypes.func,
};

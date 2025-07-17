import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  Video,
  Send,
  Mic,
  Image,
  MoreVertical,
  Menu,
  X,
  GalleryHorizontal,
  Camera,
  DockIcon,
  Contact,
  Paperclip
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CallModal from "../../components/chat/CallModal";
import socket from "../../services/Socket";

const users = [
  { id: 1, name: "Jane Doe", online: true, lastMessage: "Hey! How are you?" },
  { id: 2, name: "John Smith", online: false, lastMessage: "Let's talk tomorrow." },
];

const loggedInUserId = 99;

const initialMessages = [
  { id: 1, text: "Hello!", senderId: 1 },
  { id: 2, text: "Hi, how are you?", senderId: loggedInUserId },
  { id: 3, text: "I'm good, thanks!", senderId: 1 },
  { id: 4, text: "Great to hear!", senderId: loggedInUserId },
];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callType, setCallType] = useState("video");
  const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const socketRef = useRef();
  const { state } = useLocation();
  const [isConnected, setIsConnected] = useState(null);

  const chattedUserIds = [...new Set(messages.map((m) => m.senderId).filter(id => id !== loggedInUserId))];
  const chattedUsers = users.filter((user) => chattedUserIds.includes(user.id));

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socketRef.current = socket;
  }, [socket]);

  useEffect(() => {
    if (isConnected) {
      socketRef.current.emit("ADD_USER", userInfo);
      socketRef.current.on("USER_ADD",(data) => {
        console.log(data);
      });
    }
  }, [isConnected]);

  const renderUserList = (userList) =>
    userList.map((user) => (
      <div
        key={user.id}
        onClick={() => {
          setSelectedUser(user);
          setIsSidebarOpen(false);
        }}
        className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${selectedUser.id === user.id ? "bg-gray-200" : ""}`}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          {user.online && (
            <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-500 truncate">{user.lastMessage}</div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="w-full h-screen flex bg-gray-100 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:block w-72 bg-white border-r overflow-y-auto">
          <div className="p-4 font-bold text-lg border-b">{userInfo.fullname.firstname}</div>
          <div className="p-4 font-bold text-lg border-b"><Link to="/captain-home">Back</Link></div>
          <div className="flex border-b">
            {["all", "unread", "favourites", "groups"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 p-2 font-medium ${activeTab === tab ? "border-b-2 border-blue-500" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {renderUserList(activeTab === "all" ? chattedUsers : users)}
        </div>

        {/* Sidebar (Mobile) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex md:hidden">
            <div className="w-72 bg-white overflow-y-auto">
              <div className="p-4 font-bold text-lg border-b">{userInfo.fullname.firstname}</div>
              <div className="p-4 font-bold text-lg border-b"><Link to="/captain-home">Back</Link></div>
              <div className="flex border-b">
                {["all", "unread", "favourites", "groups"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 p-2 font-medium ${activeTab === tab ? "border-b-2 border-blue-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {renderUserList(activeTab === "all" ? chattedUsers : users)}
            </div>
            <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center space-x-3">
              <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="text-gray-700" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex space-x-4 text-gray-600">
              <Phone className="cursor-pointer" onClick={() => { setCallType("phone"); setCallModalOpen(true); }} />
              <Video className="cursor-pointer" onClick={() => { setCallType("video"); setCallModalOpen(true); }} />
              <MoreVertical className="cursor-pointer" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg) => {
              const isMe = msg.senderId === loggedInUserId;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white flex items-center space-x-3">
            <button><Mic className="text-gray-600" /></button>
            <button onClick={() => setAttachmentModalOpen(true)}>
              <Paperclip className="text-gray-600" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="send-button"><Send className="text-blue-500" /></button>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        user={selectedUser}
        type={callType}
      />

      {/* Attachment Modal */}
      {attachmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setAttachmentModalOpen(false)}>
              <X />
            </button>
            <h2 className="text-lg font-bold mb-4"></h2>
            <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
              <div>
                <GalleryHorizontal className="mx-auto" />
                <p className="text-xs mt-1">Gallery</p>
              </div>
              <div>
                <Image className="mx-auto" />
                <p className="text-xs mt-1">Photos</p>
              </div>
              <div>
                <DockIcon className="mx-auto" />
                <p className="text-xs mt-1">Document</p>
              </div>
              <div>
                <Mic className="mx-auto" />
                <p className="text-xs mt-1">Voice</p>
              </div>
              <div>
                <Camera className="mx-auto" />
                <p className="text-xs mt-1">Camera</p>
              </div>
              <div>
                <Contact className="mx-auto" />
                <p className="text-xs mt-1">Contact</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import {
  X,
  Video,
  Phone,
  Mic,
  MicOff,
  VideoOff,
} from "lucide-react";

export default function CallModal({ isOpen, onClose, user, type }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(null);
  const [time, setTime] = useState("00:00");



useEffect(() => {
    setIsVideoOn(type === 'video');
  }, [type]);


  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${user.image || "https://i.etsystatic.com/17956554/r/il/0ae3f9/2942338167/il_fullxfull.2942338167_ey9q.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-4">
        {/* Top Bar */}
        {/* <div className="w-full flex justify-center">
          <span className="text-white text-sm">{time}</span>
        </div> */}

        {/* User Info */}
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm">{user.online ? "Online" : "Offline"}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/20 backdrop-blur p-4 rounded-full text-white hover:bg-white/30"
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>

          {/* End Call */}
          <button
            onClick={onClose}
            className="bg-red-600 p-4 rounded-full text-white hover:bg-red-700"
          >
            <Phone />
          </button>

          {/* Toggle Video */}
          {!isVideoOn && (
            <button
              onClick={() => setIsVideoOn(true)}
              className="bg-white/20 backdrop-blur p-4 rounded-full text-white hover:bg-white/30"
            >
              <Video />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext, useCallback } from "react";
import io from "socket.io-client";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import FriendsList from "./FriendsList";
import { throttle } from "lodash";
import Button from "@mui/material/Button";

import { addFriendAPI } from "./api/userAPI";

const token = localStorage.getItem("token");
const socket = io("http://localhost:3000");

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUserData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [newFriend, setNewFriend] = useState("");

  const handleUserUpdate = useCallback(
    throttle((newUserData) => {
      setUserData((prevUserData) => {
        if (JSON.stringify(prevUserData) !== JSON.stringify(newUserData)) {
          return newUserData;
        }
        return prevUserData;
      });
    }, 1000),
    []
  );

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

    ws.onopen = () => {
      console.log("websocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "USER_UPDATE") {
        handleUserUpdate(data.user);
      }
    };

    const handleMessage = (msg) => {
      if (msg.recipient === sender) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, []);

  const handleAddFriend = async () => {
    try {
      await addFriendAPI(user._id, newFriend);
    } catch (err) {
      console.log("Error registering:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      sender: sender,
      senderUsername: senderUsername,
      recipient: recipient,
      text: message,
    };
    socket.emit("chat message", msg);
    setMessage("");
  };

  return (
    <div>
      <FriendsList />
      <button onClick={handleLogout}>Logout</button>
      <input
        type="text"
        placeholder="Add friend"
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
      />
      <button
        onClick={() => {
          handleAddFriend();
        }}
      >
        Add
      </button>
      <Button variant="contained">Hello world</Button>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user._id}</p>
          <p>Friend: {user.friends}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Your name"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Username"
        value={senderUsername}
        onChange={(e) => setSenderUsername(e.target.value)}
      ></input>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.senderUsername}：{msg.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />{" "}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

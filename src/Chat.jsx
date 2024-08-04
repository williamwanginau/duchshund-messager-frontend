import { useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(uuidv4());
  const [recipient, setRecipient] = useState("");
  const [senderUsername, setSenderUsername] = useState("");

  useEffect(() => {
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
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

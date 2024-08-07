import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import useFetchUser from "./hooks/useFetchUser";
import { fetchFriendsAPI } from "./api/userAPI";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(UserContext);

  useFetchUser();

  useEffect(() => {
    const fetchFriends = async () => {
      if (user) {
        const data = await fetchFriendsAPI(user._id);
        setFriends(data.friends);
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <div className="friends-list">
      <h1>Friends List</h1>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;

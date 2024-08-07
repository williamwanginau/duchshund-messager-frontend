import apiClient from "./apiClient";

export const addFriendAPI = async (userId, friendId) => {
  try {
    const res = await apiClient.post(`users/${userId}/friends`, {
      friendId,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserAPI = async () => {
  try {
    const res = await apiClient.get("users/api/user");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFriendsAPI = async (userId) => {
  try {
    const res = await apiClient.get(`users/${userId}/friends`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

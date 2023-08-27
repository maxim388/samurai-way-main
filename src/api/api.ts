import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "41b0e7ee-a396-4123-8fc6-d9277f02bce7",
  },
  withCredentials: true,
});

type useerAPI = {
  getUsers: (page: number, count: number) => Promise<any>;
  followUser: (userId: number) => Promise<any>;
  unfollowUser: (userId: number) => Promise<any>;
};

export const usersAPI: useerAPI = {
  getUsers(page: number = 1, count: number = 10) {
    return instance
      .get(`users?page=${page}&count=${count}`)
      .then((res) => res.data);
  },
  followUser(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
};

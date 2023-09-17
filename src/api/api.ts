import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "41b0e7ee-a396-4123-8fc6-d9277f02bce7",
  },
  withCredentials: true,
});

type usersAPIType = {
  getUsers: (page: number, count: number) => Promise<any>;
  followUser: (userId: number) => Promise<any>;
  unfollowUser: (userId: number) => Promise<any>;
};

type profileAPIType = {
  getProfile: (userId: number) => Promise<any>;
  getStatus: (userId: number) => Promise<any>;
  updateStatus: (status: string) => Promise<any>;
};

type authAPIType = {
  authMe: () => Promise<any>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<any>;
  logout: () => Promise<any>;
  getCaptcha: () => Promise<any>;
};

export const usersAPI: usersAPIType = {
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

export const profileAPI: profileAPIType = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
};

export const authAPI: authAPIType = {
  authMe() {
    return instance.get(`auth/me`);
  },
  login(email: string, password: string, rememberMe: boolean = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  },
};

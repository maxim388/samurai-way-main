import axios, { AxiosResponse } from "axios";
import { UserType } from "../reducers/users-reducer";
import { UserProfileType } from "../reducers/profile-reducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "41b0e7ee-a396-4123-8fc6-d9277f02bce7",
  },
  withCredentials: true,
});

type ResponseUsersType = {
  items: UserType[];
  totalCount: number;
  error: null | string;
};
type ResponseFollowType<D = {}> = {
  resultCode: number;
  messages: [];
  data: D;
};

type UsersAPIType = {
  getUsers: (page: number, count: number) => Promise<ResponseUsersType>;
  followUser: (userId: number) => Promise<ResponseFollowType>;
  unfollowUser: (userId: number) => Promise<ResponseFollowType>;
};

type ResponseProfileType = UserProfileType;

type ProfileAPIType = {
  getProfile: (userId: number) => Promise<UserProfileType>;
  getStatus: (userId: number) => Promise<AxiosResponse>;
  updateStatus: (status: string) => Promise<AxiosResponse>;
  savePhoto: (file: File) => Promise<AxiosResponse>;
  saveProfile: (profile: any) => Promise<AxiosResponse>;
};
type AuthAPIType = {
  authMe: () => Promise<any>;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => Promise<any>;
  logout: () => Promise<any>;
  getCaptcha: () => Promise<any>;
};

export const usersAPI: UsersAPIType = {
  getUsers(page: number = 1, count: number = 10) {
    return instance
      .get(`users?page=${page}&count=${count}`)
      .then<ResponseUsersType>((res) => res.data);
    // const res = await instance.get(`users?page=${page}&count=${count}`);
    // return res.data;
  },
  followUser(userId: number) {
    return instance.post(`follow/${userId}`).then<ResponseFollowType>((res) => res.data);
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then<ResponseFollowType>((res) => res.data);
  },
};

export const profileAPI: ProfileAPIType = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then<ResponseProfileType>((res) => res.data);
  },
  getStatus(userId: number) {
    return instance.get<AxiosResponse>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put<AxiosResponse>(`profile/status`, { status: status });
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<AxiosResponse>(`profile/photo`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: any) {
    return instance.put<AxiosResponse>(`profile`, profile);
  },
};

export const authAPI: AuthAPIType = {
  authMe() {
    return instance.get(`auth/me`);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  },
};

import m from "mithril";
import { start, finish, text } from "@/module/submit";
import { showFlash, MessageType } from "@/component/flash";
import { save, Auth } from "@/module/cookiestore";

export interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  token: string;
}

interface ErrorResponse {
  status: string;
  message: string;
}

export const login = (body: User): Promise<void> => {
  return m.request({
    method: "POST",
    url: "/api/v1/login",
    body,
  });
};

export const submitText = (s: string): string => {
  return text(s);
};

export const submit = (e: InputEvent, u: User): Promise<void> => {
  start(e);

  return login(u)
    .then((raw: unknown) => {
      finish();

      const data = raw as LoginResponse;
      if (data) {
        const auth: Auth = {
          accessToken: data.token,
          loggedIn: true,
        };
        save(auth);

        showFlash("Login successful.", MessageType.success);
      } else {
        showFlash("Data returned is not valid.", MessageType.failed);
      }

      m.route.set("/");
    })
    .catch((err: XMLHttpRequest) => {
      finish();
      showFlash((err.response as ErrorResponse).message, MessageType.warning);
      throw err;
    });
};

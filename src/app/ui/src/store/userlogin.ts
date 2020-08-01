import m from "mithril";
import { start, finish } from "@/module/submit";
import Flash from "@/component/flash";
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

        Flash.success("Login successful.");
      } else {
        Flash.failed("Data returned is not valid.");
      }

      m.route.set("/");
    })
    .catch((err: XMLHttpRequest) => {
      finish();
      Flash.warning((err.response as ErrorResponse).message);
      throw err;
    });
};

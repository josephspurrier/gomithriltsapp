import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";
import CookieStore from "@/module/cookiestore";

interface User {
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

const userLogin = (e: InputEvent, body: User): Promise<void> => {
  Submit.start(e);

  return m
    .request({
      method: "POST",
      url: "/api/v1/login",
      body,
    })
    .then((raw: unknown) => {
      Submit.finish();

      const data = raw as LoginResponse;
      if (data) {
        const auth = {
          accessToken: data.token,
          loggedIn: true,
        };
        CookieStore.save(auth);

        Flash.success("Login successful.");
      } else {
        Flash.failed("Data returned is not valid.");
      }

      m.route.set("/");
    })
    .catch((err: XMLHttpRequest) => {
      Submit.finish();
      Flash.warning((err.response as ErrorResponse).message);
    });
};

export default userLogin;

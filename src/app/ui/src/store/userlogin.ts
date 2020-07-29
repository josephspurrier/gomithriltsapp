import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";
import CookieStore from "@/module/cookiestore";

interface user {
  email: string;
  password: string;
}

interface loginResponse {
  status: string;
  token: string;
}

interface errorResponse {
  status: string;
  message: string;
}

const UserLogin = (e: InputEvent, u: user): Promise<void> => {
  Submit.start(e);

  return m
    .request({
      method: "POST",
      url: "/api/v1/login",
      body: u,
    })
    .then((data: loginResponse) => {
      Submit.finish();

      const auth = {
        accessToken: data.token,
        loggedIn: true,
      };
      CookieStore.save(auth);

      Flash.success("Login successful.");
      m.route.set("/");
    })
    .catch((err: XMLHttpRequest) => {
      Submit.finish();
      Flash.warning((err.response as errorResponse).message);
    });
};

export default UserLogin;

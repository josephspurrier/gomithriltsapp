import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";
import CookieStore from "@/module/cookiestore";

interface User {
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

const UserLogin = (e: InputEvent, user: User): Promise<void> => {
  Submit.start(e);

  return m
    .request({
      method: "POST",
      url: "/api/v1/login",
      body: user,
    })
    .then((data: loginResponse) => {
      console.log(data);
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
      //throw err;
    });
};

export default UserLogin;

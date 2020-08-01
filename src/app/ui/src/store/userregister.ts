import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";

const userRegister = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  clear: (): void => {
    userRegister.user = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  register: (): Promise<void> => {
    return m.request({
      method: "POST",
      url: "/api/v1/register",
      body: userRegister.user,
    });
  },
  submit: (e: InputEvent): void => {
    Submit.start(e);

    userRegister
      .register()
      .then(() => {
        userRegister.clear();
        Submit.finish();

        Flash.success("User registered.");
        m.route.set("/login");
      })
      .catch((err) => {
        Submit.finish();
        Flash.warning(err.response.message);
      });
  },
};

export default userRegister;

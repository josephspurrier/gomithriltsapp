import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";

const UserRegister = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  clear: (): void => {
    UserRegister.user = {
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
      body: UserRegister.user,
    });
  },
  submit: (e: InputEvent): void => {
    Submit.start(e);

    UserRegister.register()
      .then(() => {
        UserRegister.clear();
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

export default UserRegister;

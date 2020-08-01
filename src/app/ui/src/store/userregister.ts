import m from "mithril";
import Submit from "@/module/submit";
import Flash from "@/component/flash";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const register = (body: User): Promise<void> => {
  return m.request({
    method: "POST",
    url: "/api/v1/register",
    body,
  });
};

export const submit = (e: InputEvent, u: User): Promise<void> => {
  Submit.start(e);

  return register(u)
    .then(() => {
      Submit.finish();

      Flash.success("User registered.");
      m.route.set("/login");
    })
    .catch((err: XMLHttpRequest) => {
      Submit.finish();
      Flash.warning(err.response.message);
      throw err;
    });
};

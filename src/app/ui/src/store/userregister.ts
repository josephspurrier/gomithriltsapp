import m from "mithril";
import { start, finish, text } from "@/module/submit";
import { Flash } from "@/component/flash";

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

export const submitText = (s: string): string => {
  return text(s);
};

export const submit = (e: InputEvent, u: User): Promise<void> => {
  start(e);

  return register(u)
    .then(() => {
      finish();

      Flash.success("User registered.");
      m.route.set("/login");
    })
    .catch((err: XMLHttpRequest) => {
      finish();
      Flash.warning(err.response.message);
      throw err;
    });
};

import m from "mithril";
import UserRegister from "@/store/userregister";

interface Attrs {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const RegisterPage: m.ClosureComponent<Attrs> = ({ attrs }) => {
  // Prefill the fields.
  UserRegister.user.first_name = attrs.firstName || "";
  UserRegister.user.last_name = attrs.lastName || "";
  UserRegister.user.email = attrs.email || "";
  UserRegister.user.password = attrs.password || "";

  return {
    view: () =>
      m("div", [
        m("section", { class: "section" }, [
          m("div", { class: "container" }, [
            m("h1", { class: "title" }, "Register"),
            m("h2", { class: "subtitle" }, "Enter your information below."),
          ]),
          m("div", { class: "container", style: { "margin-top": "1em" } }, [
            m("form", { name: "login", onsubmit: UserRegister.submit }, [
              m("div", { class: "field" }, [
                m("label", { class: "label" }, "First Name"),
                m("div", { class: "control" }, [
                  m("input", {
                    class: "input",
                    label: "first_name",
                    name: "first_name",
                    type: "text",
                    "data-cy": "first_name",
                    required: true,
                    oninput: function (e: { target: HTMLInputElement }) {
                      UserRegister.user.first_name = e.target.value;
                    },
                    value: UserRegister.user.first_name,
                  }),
                ]),
              ]),
              m("div", { class: "field" }, [
                m("label", { class: "label" }, "Last Name"),
                m("div", { class: "control" }, [
                  m("input", {
                    class: "input",
                    label: "last_name",
                    name: "last_name",
                    type: "text",
                    "data-cy": "last_name",
                    required: true,
                    oninput: function (e: { target: HTMLInputElement }) {
                      UserRegister.user.last_name = e.target.value;
                    },
                    value: UserRegister.user.last_name,
                  }),
                ]),
              ]),
              m("div", { class: "field" }, [
                m("label", { class: "label" }, "Email"),
                m("div", { class: "control" }, [
                  m("input", {
                    class: "input",
                    label: "Email",
                    name: "email",
                    type: "text",
                    "data-cy": "email",
                    required: true,
                    oninput: function (e: { target: HTMLInputElement }) {
                      UserRegister.user.email = e.target.value;
                    },
                    value: UserRegister.user.email,
                  }),
                ]),
              ]),
              m("div", { class: "field" }, [
                m("label", { class: "label" }, "Password"),
                m("div", { class: "control" }, [
                  m("input", {
                    class: "input",
                    label: "Password",
                    name: "password",
                    type: "password",
                    "data-cy": "password",
                    required: true,
                    oninput: function (e: { target: HTMLInputElement }) {
                      UserRegister.user.password = e.target.value;
                    },
                    value: UserRegister.user.password,
                  }),
                ]),
              ]),
              m("div", { class: "field is-grouped" }, [
                m("p", { class: "control" }, [
                  m(
                    "button",
                    {
                      class: "button is-primary",
                      id: "submit",
                      type: "submit",
                      "data-cy": "submit",
                    },
                    "Create Account"
                  ),
                ]),
                m("p", { class: "control" }, [
                  m(
                    "button",
                    {
                      class: "button is-light",
                      type: "button",
                      onclick: function () {
                        UserRegister.clear();
                      },
                    },
                    "Clear"
                  ),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
  };
};

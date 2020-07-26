import m from "mithril";
import UserLogin from "@/store/userlogin";
import Input from "@/component/input";

interface defaultAttrs {
  email?: string;
  password?: string;
}

const Page: m.ClosureComponent<defaultAttrs> = ({ attrs }) => {
  const data = {
    title: "Login",
    subtitle: "Enter your login information below.",
  };

  let user = {
    email: "",
    password: "",
  };

  const clear = () => {
    user = {
      email: "",
      password: "",
    };
  };

  user.email = "a@a.com";
  user.password = "a";

  // Prefill the fields.
  if (attrs.email) {
    user.email = attrs.email;
  }
  if (attrs.password) {
    user.password = attrs.password;
  }

  return {
    view: () =>
      m("div", [
        m("section", { class: "section" }, [
          m("div", { class: "container" }, [
            m("h1", { class: "title" }, data.title),
            m("h2", { class: "subtitle" }, data.subtitle),
          ]),
          m("div", { class: "container", style: { "margin-top": "1em" } }, [
            m(
              "form",
              {
                name: "login",
                onsubmit: function (e: InputEvent) {
                  UserLogin(e, user).then(() => {
                    clear();
                  });
                  // .catch(() => {
                  //   console.log("catch error");
                  // });
                },
              },
              [
                m(Input, {
                  label: "Email",
                  name: "email",
                  required: true,
                  oninput: function (e: { target: HTMLInputElement }) {
                    user.email = e.target.value;
                  },
                  value: user.email,
                }),
                m(Input, {
                  label: "Password",
                  name: "password",
                  required: true,
                  type: "password",
                  oninput: function (e: { target: HTMLInputElement }) {
                    user.password = e.target.value;
                  },
                  value: user.password,
                }),
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
                      "Submit"
                    ),
                  ]),
                  m("p", { class: "control" }, [
                    m(
                      "button",
                      {
                        class: "button is-light",
                        type: "button",
                        onclick: function () {
                          clear();
                        },
                      },
                      "Clear"
                    ),
                  ]),
                  m("p", { class: "control" }, [
                    m(
                      m.route.Link,
                      { class: "button is-light", href: "/register" },
                      " Register "
                    ),
                  ]),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
  };
};

export default Page;

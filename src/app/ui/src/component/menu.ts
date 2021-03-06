import m from "mithril";
import { isLoggedIn, clear } from "@/module/cookiestore";

export const Menu = (): m.Component => {
  const logout = () => {
    clear();
    m.route.set("/");
  };

  return {
    view: () =>
      m("main", [
        m(
          "nav",
          {
            class: "navbar is-black",
            role: "navigation",
            "aria-label": "main navigation",
          },
          [
            m("div", { class: "navbar-brand" }, [
              m(
                m.route.Link,
                { class: "navbar-item", href: "/", "data-cy": "home-link" },
                m("strong", "gomithriltsapp")
              ),
              m(
                "a",
                {
                  class: "navbar-burger burger",
                  id: "mobile-navbar-top",
                  role: "button",
                  "aria-label": "menu",
                  "aria-expanded": "false",
                  "data-target": "navbar-top",
                  onclick: function () {
                    const mob = document.getElementById("mobile-navbar-top");
                    const nav = document.getElementById("navbar-top");
                    if (mob) {
                      mob.classList.toggle("is-active");
                    }
                    if (nav) {
                      nav.classList.toggle("is-active");
                    }
                  },
                },
                [
                  m("span", { "aria-hidden": "true" }),
                  m("span", { "aria-hidden": "true" }),
                  m("span", { "aria-hidden": "true" }),
                ]
              ),
            ]),
            m(
              "div",
              { class: "navbar-menu", id: "navbar-top" },
              m(
                "div",
                { class: "navbar-end" },
                m("div", { class: "navbar-item has-dropdown is-hoverable" }, [
                  m("a", { class: "navbar-link" }, "Menu"),
                  m("div", { class: "navbar-dropdown is-right" }, [
                    !isLoggedIn() &&
                      m(
                        m.route.Link,
                        { class: "navbar-item", href: "/login" },
                        " Login "
                      ),
                    m(
                      "a",
                      {
                        class: "navbar-item",
                        href: `https://petstore.swagger.io/?url=${location.origin}/static/swagger.json`,
                      },
                      " Swagger "
                    ),
                    m(
                      m.route.Link,
                      { class: "navbar-item", href: "/about" },
                      " About "
                    ),
                    m("hr", { class: "navbar-divider" }),
                    isLoggedIn() &&
                      m(
                        "a",
                        {
                          class: "dropdown-item",
                          onclick: function () {
                            logout();
                          },
                        },
                        " Logout"
                      ),
                    m("div", { class: "navbar-item" }, "v1.0.0"),
                  ]),
                ])
              )
            ),
          ]
        ),
      ]),
  };
};

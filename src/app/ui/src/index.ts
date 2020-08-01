import m from "mithril";
import { AboutPage } from "@/view/about";
import { LoginPage } from "@/view/login";
import { RegisterPage } from "@/view/register";
import { HomePage } from "@/view/home";
import { NotepadPage } from "@/view/notepad";
import { ErrorPage } from "@/view/error";
import LayoutMain from "@/layout/main";
import { isLoggedIn } from "@/module/cookiestore";
import "~/node_modules/@fortawesome/fontawesome-free/js/all.js";
import "~/style/main.scss";

m.route(document.body, "/", {
  "/": {
    onmatch: () => {
      if (!isLoggedIn()) m.route.set("/login");
    },
    render: () => m(LayoutMain, m(HomePage)),
  },
  "/notepad": {
    onmatch: () => {
      if (!isLoggedIn()) m.route.set("/login");
    },
    render: () => m(LayoutMain, m(NotepadPage)),
  },
  "/login": {
    onmatch: () => {
      if (isLoggedIn()) m.route.set("/");
    },
    render: () => m(LayoutMain, m(LoginPage)),
  },
  "/register": {
    onmatch: () => {
      if (isLoggedIn()) m.route.set("/");
    },
    render: () => m(LayoutMain, m(RegisterPage)),
  },
  "/about": {
    render: () => m(LayoutMain, m(AboutPage)),
  },
  "/404": {
    render: () => m(LayoutMain, m(ErrorPage)),
  },
  "/:404...": {
    onmatch: () => window.location.replace("/404"),
  },
});

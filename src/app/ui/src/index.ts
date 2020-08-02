import m from "mithril";
import { AboutPage } from "@/view/about";
import { LoginPage } from "@/view/login";
import { RegisterPage } from "@/view/register";
import { HomePage } from "@/view/home";
import { NotepadPage } from "@/view/notepad";
import { ErrorPage } from "@/view/error";
import { MainLayout } from "@/layout/main";
import { isLoggedIn } from "@/module/cookiestore";
import "~/node_modules/@fortawesome/fontawesome-free/js/all.js";
import "~/style/main.scss";

m.route(document.body, "/", {
  "/": {
    onmatch: () => {
      if (!isLoggedIn()) m.route.set("/login");
    },
    render: () => m(MainLayout, m(HomePage)),
  },
  "/notepad": {
    onmatch: () => {
      if (!isLoggedIn()) m.route.set("/login");
    },
    render: () => m(MainLayout, m(NotepadPage)),
  },
  "/login": {
    onmatch: () => {
      if (isLoggedIn()) m.route.set("/");
    },
    render: () => m(MainLayout, m(LoginPage)),
  },
  "/register": {
    onmatch: () => {
      if (isLoggedIn()) m.route.set("/");
    },
    render: () => m(MainLayout, m(RegisterPage)),
  },
  "/about": {
    render: () => m(MainLayout, m(AboutPage)),
  },
  "/404": {
    render: () => m(MainLayout, m(ErrorPage)),
  },
  "/:404...": {
    onmatch: () => window.location.replace("/404"),
  },
});

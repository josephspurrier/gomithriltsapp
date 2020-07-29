import Cookie from "js-cookie";

interface Auth {
  accessToken: string;
  loggedIn: boolean;
}

const CookieStore = {
  cookieName: "auth",
  save: (auth: Auth): void => {
    Cookie.set(CookieStore.cookieName, auth);
  },
  clear: (): void => {
    Cookie.remove(CookieStore.cookieName);
  },
  bearerToken: (): string => {
    const auth = Cookie.get(CookieStore.cookieName);
    if (auth === undefined) {
      return "";
    }

    const v = JSON.parse(auth);
    return "Bearer " + v.accessToken;
  },
  isLoggedIn: (): boolean => {
    try {
      const auth = Cookie.get(CookieStore.cookieName);
      return auth !== undefined;
    } catch (err) {
      console.log(err);
    }

    return false;
  },
};

export default CookieStore;

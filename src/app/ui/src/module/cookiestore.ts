import Cookie from "js-cookie";

export interface Auth {
  accessToken: string;
  loggedIn: boolean;
}

const cookieStore = {
  cookieName: "auth",
  save: (auth: Auth): void => {
    Cookie.set(cookieStore.cookieName, auth);
  },
  clear: (): void => {
    Cookie.remove(cookieStore.cookieName);
  },
  bearerToken: (): string => {
    const auth = Cookie.get(cookieStore.cookieName);
    if (auth === undefined) {
      return "";
    }

    const v = JSON.parse(auth);
    return "Bearer " + v.accessToken;
  },
  isLoggedIn: (): boolean => {
    try {
      const auth = Cookie.get(cookieStore.cookieName);
      return auth !== undefined;
    } catch (err) {
      console.log(err);
    }

    return false;
  },
};

export default cookieStore;

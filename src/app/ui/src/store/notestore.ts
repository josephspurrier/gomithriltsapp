import m from "mithril";
import Flash from "@/component/flash";
import CookieStore from "@/module/cookiestore";

interface Note {
  id: string;
  message: string;
}

interface ReturnNote {
  notes: Note[];
}

const NoteStore = {
  current: {} as Note,
  list: [] as Note[],
  clear: (): void => {
    NoteStore.current = {
      id: "",
      message: "",
    };
  },
  submit: (): void => {
    NoteStore.create()
      .then(() => {
        Flash.success("Note created.");
        // This could be optimized instead of reloading.
        NoteStore.load();
        NoteStore.clear();
      })
      .catch((err) => {
        Flash.warning(err.response.message);
      });
  },
  create: (): Promise<void | m.Static> => {
    return m.request({
      method: "POST",
      url: "/api/v1/note",
      headers: {
        Authorization: CookieStore.bearerToken(),
      },
      body: NoteStore.current,
    });
  },
  load: (): Promise<void | m.Static> => {
    return m
      .request({
        method: "GET",
        url: "/api/v1/note",
        headers: {
          Authorization: CookieStore.bearerToken(),
        },
      })
      .then((result: ReturnNote) => {
        NoteStore.list = result.notes;
      });
  },
  runUpdate: (id: string, value: string): void => {
    NoteStore.update(id, value).catch((e) => {
      Flash.warning("Could not update note: " + e.response.message);
    });
  },
  update: (id: string, text: string): Promise<m.Static> => {
    return m.request({
      method: "PUT",
      url: "/api/v1/note/" + id,
      headers: {
        Authorization: CookieStore.bearerToken(),
      },
      body: { message: text },
    });
  },
  runDelete: (id: string): void => {
    NoteStore.delete(id)
      .then(() => {
        Flash.success("Note deleted.");
        NoteStore.list = NoteStore.list.filter((i) => {
          return i.id !== id;
        });
      })
      .catch((err) => {
        Flash.warning("Could not delete: " + err.response.message);
      });
  },
  delete: (id: string): Promise<m.Static> => {
    return m.request({
      method: "DELETE",
      url: "/api/v1/note/" + id,
      headers: {
        Authorization: CookieStore.bearerToken(),
      },
    });
  },
};

export default NoteStore;

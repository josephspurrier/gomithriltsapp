import m from "mithril";
import Flash from "@/component/flash";
import { bearerToken } from "@/module/cookiestore";

export interface Note {
  id: string;
  message: string;
}

interface NoteResponse {
  notes: Note[];
}

const noteStore = {
  current: {} as Note,
  list: [] as Note[],
  clear: (): void => {
    noteStore.current = {
      id: "",
      message: "",
    };
  },
  submit: (): void => {
    noteStore
      .create()
      .then(() => {
        Flash.success("Note created.");
        // This could be optimized instead of reloading.
        noteStore.load();
        noteStore.clear();
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
        Authorization: bearerToken(),
      },
      body: noteStore.current,
    });
  },
  load: (): Promise<void | m.Static> => {
    return m
      .request({
        method: "GET",
        url: "/api/v1/note",
        headers: {
          Authorization: bearerToken(),
        },
      })
      .then((raw: unknown) => {
        const result = raw as NoteResponse;
        if (result) {
          noteStore.list = result.notes;
        } else {
          Flash.failed("Data returned is not valid.");
        }
      });
  },
  runUpdate: (id: string, value: string): void => {
    noteStore.update(id, value).catch((e) => {
      Flash.warning("Could not update note: " + e.response.message);
    });
  },
  update: (id: string, text: string): Promise<m.Static> => {
    return m.request({
      method: "PUT",
      url: "/api/v1/note/" + id,
      headers: {
        Authorization: bearerToken(),
      },
      body: { message: text },
    });
  },
  runDelete: (id: string): void => {
    noteStore
      .delete(id)
      .then(() => {
        Flash.success("Note deleted.");
        noteStore.list = noteStore.list.filter((i) => {
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
        Authorization: bearerToken(),
      },
    });
  },
};

export default noteStore;

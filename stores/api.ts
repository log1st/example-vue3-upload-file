import { defineStore } from "pinia";
import { apiUrl } from "~/utils/env";

export const useApiStore = defineStore<"api", {}, {}, {
  post:(url: string, body: FormData) => Promise<boolean>
    }>("api", {
      actions: {
        // Вообще, не люблю отловы искчлючений, поэтому обычно оборачиваю
        // в единый ответ вида
        // {status: true, data: T} | {status: false, error: Error}
        async post(url, body) {
          const response = await fetch(`${apiUrl}${url}`, {
            method: "post",
            body,
          });

          if (response.status) {
            return response.json();
          }

          throw new Error(response.statusText);
        },
      },
    });

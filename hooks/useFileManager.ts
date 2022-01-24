import { ref } from "vue";

export interface FileManagerProps {
  accept: string[]
  multiple: boolean
}

export const useFileManager = ({
  accept = [],
  multiple = true,
}: FileManagerProps) => {
  const file = ref<File | null>(null);
  const files = ref<Array<File>>([]);

  const showFileSelector = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = accept.join(",");
    input.style.setProperty("display", "none");
    input.addEventListener("change", () => {
      if (multiple) {
        files.value = Array.from(input.files);
      } else {
        file.value = Array.from(input.files)[0] || null;
      }
    });
    document.body.appendChild(input);
    input.click();
  };

  return {
    file,
    files,
    showFileSelector,
  };
};

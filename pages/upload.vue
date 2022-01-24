<template>
  <div :class="$style.page">
    <h1 :class="$style.title">
      Upload
    </h1>
    <form
      :class="$style.form"
      @submit.prevent="submit"
    >
      <FormField
        :class="$style.field"
        label="File to upload"
      >
        <FileInput
          :model-value="model.file"
          :disabled="isUploading"
          placeholder="Select files"
          @upload="onUpload"
        />
      </FormField>
      <div :class="$style.previews">
        <div
          v-for="(preview, index) in previews"
          :key="preview.id"
          :class="$style.preview"
        >
          <img
            :src="preview.url"
            :class="$style.previewImage"
          >
          <div :class="$style.previewActions">
            <Button @click="removeImage(index)">
              Удалить
            </Button>
            <Button
              v-if="index > 0"
              @click="moveImageUp(index)"
            >
              Вверх
            </Button>
            <Button
              v-if="index < model.files.length - 1"
              @click="moveImageDown(index)"
            >
              Вниз
            </Button>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        :disabled="isUploading || !model.files.length"
      >
        {{ isUploading ? 'Uploading...' : (model.file ? 'Submit' : 'Choose file') }}
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import FormField from "~/components/FormField.vue";
import FileInput from "~/components/FileInput.vue";
import Button from "~/components/Button.vue";
import { useApiStore } from "~/stores/api";

const isUploading = ref(false);

interface UploadModel {
  files: Array<File>
}

const model = ref<UploadModel>({
  files: [],
});

interface Preview {
  id: string;
  url: string;
}

const previewsMap = new Map<File, Preview>();

// Тут я бы делал микросервис, куда гружу картинки и генерирую превьюхи.
// Либо на крайняк это же, но в веб-воркере
// Тут же и разбираемся с тем, чтобы не делать дубли заново,
// например, кэшируя картинки по ссылке на файл
const getPreviews = (files: Array<File>) => files.map((file) => {
  if (!previewsMap.has(file)) {
    previewsMap.set(file, {
      id: Math.random().toString(36).substring(2, 7),
      url: URL.createObjectURL(file),
    });
  }
  return previewsMap.get(file);
});

const previews = ref<Array<Preview>>([]);

watchEffect(() => {
  previews.value = getPreviews(model.value.files);
});

const removeImage = (index: number) => {
  model.value.files.splice(index, 1);
};

// Движения в идеале через карту позиций, чтобы дубли логики и циклов не делать
const moveImageUp = (index: number) => {
  if (index === 0) {
    return;
  }
  model.value.files.splice(index - 1, 0, ...model.value.files.splice(index, 1));
};

const moveImageDown = (index: number) => {
  if (index === model.value.files.length - 1) {
    return;
  }
  model.value.files.splice(index + 1, 0, ...model.value.files.splice(index, 1));
};

const onUpload = (file: File) => {
  model.value.files.push(file);
};

const apiStore = useApiStore();

const submit = async () => {
  isUploading.value = true;

  const data = new FormData();
  model.value.files.forEach((file) => {
    data.append("file", file);
  });

  try {
    const response = await apiStore.post("/upload", data);

    if (!response) {
      alert("some errors");
    }
  } catch (e) {
    isUploading.value = false;
    alert("some errors");
  }
};

</script>

<style lang="scss" module>
@import "~@/assets/utils";

.page {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.title {
  @include title;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 10px;
}

.previews {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.preview {
  max-width: 100%;

  display: flex;
  flex-direction: column;

  gap: 8px;
}

.previewImage {
  max-width: 100%;
}

.previewActions {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

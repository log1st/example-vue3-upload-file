<template>
  <div :class="$style.app">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { HeadObject, useHead } from "@vueuse/head";
import { computed } from "vue";
import { useVh } from "~/hooks/useVh";

const { vh } = useVh();

const headOptions = computed<HeadObject>(() => ({
  htmlAttrs: {
    style: `--vh: ${vh.value}`,
  },
  title: "Upload file",
}));

useHead(headOptions);
</script>

<style lang="scss" module>
@import "~@/assets/utils";

:global {
  @import "./assets/drop";
  @import "./assets/root";
}

.app {
  --bg: #efefef;
  --primary: #ff8787;
  --primary-text: #fff;
  --text: #444;

  background: var(--bg);
  color: var(--text);

  display: flex;
  flex-direction: column;

  min-height: vh(100);

  padding: 20px 30px
}
</style>

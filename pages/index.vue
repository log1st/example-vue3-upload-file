<template>
  <div :class="$style.page">
    <router-link
      :to="{name: 'upload'}"
      :class="$style.link"
    >
      Go to upload
    </router-link>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" module>
.link {
  text-decoration: underline;

  cursor: pointer;
}
</style>

<template>
  <div :class="$style.field">
    <label
      v-if="label"
      :class="$style.label"
    >
      {{ label }}
    </label>
    <div :class="$style.input">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: String,
});
</script>

<style lang="scss" module>
  .field {
    display: flex;
    flex-direction: column;

    gap: 8px
  }

  .label {
    font-weight: bold;

    flex-shrink: 0;
  }
</style>

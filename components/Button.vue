<template>
  <button
    :class="[
      $style.button,
      disabled && $style.disabled
    ]"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(["click"]);

const onClick = (e) => {
  emit("click", e);
};

defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: Boolean,
});
</script>

<style lang="scss" module>
@import "~@/assets/utils";

.button {
  padding: 10px 14px;
  background: var(--primary);
  color: var(--primary-text);

  &:not(.disabled) {
    cursor: pointer;
  }

  &.disabled {
    opacity: .6;
  }
}
</style>

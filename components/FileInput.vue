<template>
  <div
    :class="[
      $style.field,
      disabled && $style.disabled
    ]"
    @click="onClick"
  >
    <template v-if="hasFile">
      <div :class="$style.icon" />
      <div :class="$style.name">
        {{ displayValue }}
      </div>
    </template>
    <div
      v-else-if="placeholder"
      :class="$style.placeholder"
    >
      {{ placeholder }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, watchEffect } from "vue";
import { useFileManager } from "~/hooks/useFileManager";

const props = defineProps({
  placeholder: String,
  disabled: Boolean,
  modelValue: [Array, Object, null] as PropType<Array<File> | File | null>,
});

const hasFile = computed(() => (
  props.modelValue instanceof Array ? !!props.modelValue.length : !!props.modelValue
));

const displayValue = computed<string | null>(() => (
  props.modelValue instanceof Array
    ? props.modelValue.map(({ name }) => name).join(", ")
    : (props.modelValue?.name || null)
));

const emit = defineEmits(["upload"]);

const {
  files,
  showFileSelector,
} = useFileManager({ accept: ["image/*"], multiple: true });

watchEffect(() => {
  files.value.forEach((file) => {
    emit("upload", file);
  });
});

const onClick = () => {
  if (props.disabled) {
    return;
  }

  showFileSelector();
};
</script>

<style lang="scss" module>
@import "~@/assets/utils";

.field {
  display: flex;
  align-items: center;

  gap: 8px;

  &:not(.disabled) {
    cursor: pointer;
  }

  &.disabled {
    opacity: .6;
  }
}

.icon {
  height: rem(20px);
  width: rem(16px);
  box-shadow: inset 0 0 0 rem(1px) var(--primary);

  flex-shrink: 0;

  position: relative;

  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 4px;
    right: 4px;
    height: 2px;

    background: var(--primary);
  }

  &:after {
    top: 7px;
  }

  &:before {
    bottom: 9px;
  }
}

.input {
  display: none
}

.placeholder {
  opacity: .4;
  font-style: italic;
}
</style>

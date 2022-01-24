import {
  onBeforeUnmount, onMounted, ref,
} from "vue";
import { isDev } from "~/utils/env";

const calcVh = (): string => (isDev ? "1vh" : `${window.innerHeight / 100}px`);

export const useVh = () => {
  const vh = ref<string>(calcVh());

  const recalcVh = () => {
    vh.value = calcVh();
  };

  onMounted(() => {
    window.addEventListener("resize", recalcVh);
    window.addEventListener("orientationchange", recalcVh);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", recalcVh);
    window.removeEventListener("orientationchange", recalcVh);
  });

  return {
    vh,
  };
};

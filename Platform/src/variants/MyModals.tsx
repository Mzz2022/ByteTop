// MyModal.tsx
import { extendVariants, Modal } from "@heroui/react";

export const MyModal = extendVariants(Modal, {
  variants: {
    animation: {
      scale: "transform scale-95 transition-transform duration-300",
      fade: "opacity-0 transition-opacity duration-300",
    },
  },
  defaultVariants: {
    animation: "scale",
  },
});

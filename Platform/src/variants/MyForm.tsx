// MyForm.tsx
import { extendVariants, Form } from "@heroui/react";

export const MyForm = extendVariants(Form, {
  variants: {
    variant: {
      default: "bg-white",
      dark: "bg-gray-900 text-white",
      bordered: "border border-gray-400",
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

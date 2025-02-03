// MySwitch.tsx
import { extendVariants, Switch } from "@heroui/react";

export const MySwitch = extendVariants(Switch, {
  variants: {
    size: {
      small: "w-10 h-5",
      medium: "w-12 h-6",
      large: "w-14 h-7",
    },
    activeColor: {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
    },
  },
  defaultVariants: {
    size: "medium",
    activeColor: "blue",
  },
});

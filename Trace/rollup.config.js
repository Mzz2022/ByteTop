import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import path from "path";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default () => ({
  input: path.resolve(__dirname, "index.ts"),
  output: {
    file: path.resolve(__dirname, "dist/myMonitor.js"),
    format: "umd",
    name: "myMonitor",
  },
  plugins: [
    resolve({
      extensions, // 指定 import 模块后缀解析规则
    }),
    commonjs(),
    babel({
      extensions,
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-typescript",
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ],
      babelHelpers: "bundled",
    }),
    terser(),
  ],
});

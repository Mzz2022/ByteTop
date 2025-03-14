import fs from "node:fs";
import path from "node:path";
import typescript from "rollup-plugin-typescript2";
const packagesDir = path.resolve(__dirname, "packages");
const packageFiles = fs.readdirSync(packagesDir);
function output(path) {
	return [
		{
			input: [`./packages/${path}/src/index.ts`],
			output: [
				{
					file: `./packages/${path}/dist/index.js`,
					format: "umd",
					name: "bytetop",
					sourcemap: true,
				},
			],
			plugins: [
				typescript({
					tsconfigOverride: {
						compilerOptions: {
							module: "ESNext",
						},
					},
					useTsconfigDeclarationDir: true,
				}),
			],
		},
	];
}

export default [...packageFiles.flatMap((path) => output(path))];

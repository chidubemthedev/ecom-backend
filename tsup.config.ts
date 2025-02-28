import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Change to your main entry file
  format: ["esm"], // ESM format (for ESModules)
  splitting: false, // No code-splitting
  sourcemap: true, // Generates source maps
  clean: true, // Removes old `dist` before building
  dts: true, // Generate TypeScript declarations
  outDir: "dist", // Output directory
});

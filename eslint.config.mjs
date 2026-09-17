import { config } from "@kb/eslint-config/base";

export default [
  { ignores: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/coverage/**"] },
  ...config,
];

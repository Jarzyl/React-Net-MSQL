import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e-tests",
  use: {
    browserName: 'chromium',
  },
});

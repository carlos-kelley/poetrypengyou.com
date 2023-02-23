import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  appId: "come.poetrypengyou.app",
  appName: "Poetry Pengyou",
  webDir: "build",
  bundledWebRuntime: false,
};

export default config;

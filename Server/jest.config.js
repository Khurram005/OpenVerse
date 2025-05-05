export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.[tj]s$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!supertest|other-esm-package)/",
    ],
  };
  
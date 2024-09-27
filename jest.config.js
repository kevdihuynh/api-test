module.exports = {
   preset: "ts-jest",
   testEnvironment: "node",
   moduleFileExtensions: ["ts", "js"],
   testMatch: ["**/*.test.ts"], // Look for test files with .test.ts extension
   transform: {
      "^.+\\.ts$": "ts-jest", // Use ts-jest for TypeScript files
   },
};

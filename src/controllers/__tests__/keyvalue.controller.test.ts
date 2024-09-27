import KeyValueService from "../../services/keyvalue.service";
import request from "supertest";
import app from "../../app";
import { JOHN, NAME_KEY } from "../../mock/keyvalue.mock";

describe("POST /api/v1/keyvalue/add", () => {
   beforeEach(() => {
      jest.restoreAllMocks();
      KeyValueService.clear();
   });

   it("should return 200 & valid response for adding key value without ttl", async () => {
      const res = await request(app).post("/api/v1/keyvalue/add").send({
         key: NAME_KEY,
         value: JOHN,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            message: `Successfully added name with value John`,
         },
      });
   });

   it("should return 200 & valid response for adding key value with ttl", async () => {
      const res = await request(app).post("/api/v1/keyvalue/add").send({
         key: NAME_KEY,
         value: JOHN,
         ttl: 10,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            message: `Successfully added name with value John, time to live 10 seconds`,
         },
      });
   });

   it("should return 400 & valid response for key and value required.", async () => {
      const res = await request(app).post("/api/v1/keyvalue/add");
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
         content: {
            error: `a key and value is required.`,
         },
      });
   });

   it("should return 500 & valid response for key and value required.", async () => {
      jest.spyOn(KeyValueService, "add").mockImplementation(() => {
         throw new Error("Unknown error");
      });
      const res = await request(app).post("/api/v1/keyvalue/add").send({
         key: NAME_KEY,
         value: JOHN,
         ttl: 10,
      });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
         content: {
            error: `Exception in add: Error: Unknown error`,
         },
      });
   });
});

describe("GET /api/v1/keyvalue/get", () => {
   beforeEach(() => {
      jest.restoreAllMocks();
      KeyValueService.clear();
   });

   it("should return 200 & valid response for getting key value (undefined)", async () => {
      const res = await request(app).get("/api/v1/keyvalue/get").query({
         key: NAME_KEY,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            value: undefined,
         },
      });
   });

   it("should return 200 & valid response for getting key value (defined)", async () => {
      await request(app).post("/api/v1/keyvalue/add").send({
         key: NAME_KEY,
         value: JOHN,
      });

      const res = await request(app).get("/api/v1/keyvalue/get").query({
         key: NAME_KEY,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            value: JOHN,
         },
      });
   });

   it("should return 500 & valid response for error", async () => {
      const res = await request(app).get("/api/v1/keyvalue/get");
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
         content: {
            error: `a key is required.`,
         },
      });
   });

   it("should return 500 & valid response for key and value required.", async () => {
      jest.spyOn(KeyValueService, "get").mockImplementation(() => {
         throw new Error("Unknown error");
      });

      const res = await request(app).get("/api/v1/keyvalue/get").query({
         key: NAME_KEY,
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
         content: {
            error: `Exception in get: Error: Unknown error`,
         },
      });
   });
});

describe("DELETE /api/v1/keyvalue/delete", () => {
   beforeEach(() => {
      jest.restoreAllMocks();
      KeyValueService.clear();
   });

   it("should return 200 & valid response for deleting key", async () => {
      const res = await request(app).delete("/api/v1/keyvalue/delete").query({
         key: NAME_KEY,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            message: `key name has been deleted.`,
         },
      });
   });

   it("should return 400 & valid response for key is required.", async () => {
      const res = await request(app).delete("/api/v1/keyvalue/delete");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
         content: {
            error: "a key is required.",
         },
      });
   });

   it("should return 500 & valid response for error", async () => {
      jest.spyOn(KeyValueService, "delete").mockImplementation(() => {
         throw new Error("Unknown error");
      });
      const res = await request(app).delete("/api/v1/keyvalue/delete").query({
         key: NAME_KEY,
      });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
         content: {
            error: `Exception in delete: Error: Unknown error`,
         },
      });
   });
});

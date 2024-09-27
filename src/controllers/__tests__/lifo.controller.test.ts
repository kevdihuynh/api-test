import request from "supertest";
import app from "../../app";
import LifoService from "../../services/lifo.service";
import { HELLO } from "../../mock/lifo.mock";

describe("POST /api/v1/lifo/add", () => {
   beforeEach(() => {
      jest.restoreAllMocks();
   });

   it("should return 200 & valid response for adding a new item", async () => {
      const res = await request(app).post("/api/v1/lifo/add").send({
         item: HELLO,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            message: "Hello has been added to the stack",
         },
      });
   });

   it("should return 200 & valid response for adding 0 as an item", async () => {
      const res = await request(app).post("/api/v1/lifo/add").send({
         item: 0,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            message: "0 has been added to the stack",
         },
      });
   });

   it("should return 400 & a valid response for invalid request (passing item '')", async () => {
      const res = await request(app).post("/api/v1/lifo/add").send({
         item: "",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
         content: {
            error: "item is required.",
         },
      });
   });

   it("should return 400 & a valid response for invalid request (missing item attribute)", async () => {
      const res = await request(app).post("/api/v1/lifo/add").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
         content: {
            error: "item is required.",
         },
      });
   });

   it("should return 500 when LifoService throws an error", async () => {
      jest.spyOn(LifoService, "add").mockImplementation(() => {
         throw new Error("Unknown error");
      });
      const res = await request(app).post("/api/v1/lifo/add").send({
         item: HELLO,
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
         content: {
            error: "Exception in add: Error: Unknown error",
         },
      });
   });
});

describe("GET /api/v1/lifo/get", () => {
   beforeEach(() => {
      jest.restoreAllMocks();
   });

   it("should return 200 & valid response for getting an item", async () => {
      const res = await request(app).get("/api/v1/lifo/get");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
         content: {
            item: undefined,
         },
      });
   });

   it("should return 500 when LifoService throws an error", async () => {
      jest.spyOn(LifoService, "get").mockImplementation(() => {
         throw new Error("Unknown error");
      });
      const res = await request(app).get("/api/v1/lifo/get");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
         content: {
            error: "Exception in get: Error: Unknown error",
         },
      });
   });
});

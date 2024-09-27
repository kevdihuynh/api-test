import KeyValueService from "../keyvalue.service";
import { MILLISECONDS } from "../../constants/ttl.constants";
import { AGE_KEY, JOHN, NAME_KEY } from "../../mock/keyvalue.mock";

describe("KeyValueService", () => {
   beforeEach(() => {
      KeyValueService.clear();
      jest.useRealTimers();
   });

   it("should get a key without ttl", async () => {
      KeyValueService.add(NAME_KEY, JOHN);
      const value = KeyValueService.get(NAME_KEY);
      expect(value).toEqual(JOHN);
   });

   it("should get a key with ttl", async () => {
      KeyValueService.add(NAME_KEY, JOHN, 30);
      const value = KeyValueService.get(NAME_KEY);
      expect(value).toEqual(JOHN);
   });

   it("should get empty value", async () => {
      const value = KeyValueService.get(AGE_KEY);
      expect(value).toEqual(undefined);
   });

   it("should get undefined value after key expires", async () => {
      jest.useFakeTimers();
      KeyValueService.add(NAME_KEY, JOHN, 30);
      const valueBefore = KeyValueService.get(NAME_KEY);
      expect(valueBefore).toEqual(JOHN);
      jest.advanceTimersByTime(31 * MILLISECONDS);
      const valueNow = KeyValueService.get(NAME_KEY);
      expect(valueNow).toEqual(undefined);
   });

   it("should get value before key expires", async () => {
      jest.useFakeTimers();
      KeyValueService.add(NAME_KEY, JOHN, 30);
      const valueBefore = KeyValueService.get(NAME_KEY);
      expect(valueBefore).toEqual(JOHN);
      jest.advanceTimersByTime(20 * MILLISECONDS);
      const valueNow = KeyValueService.get(NAME_KEY);
      expect(valueNow).toEqual(JOHN);
   });

   it("should get value right before key expires", async () => {
      jest.useFakeTimers();
      KeyValueService.add(NAME_KEY, JOHN, 30);
      const valueBefore = KeyValueService.get(NAME_KEY);
      expect(valueBefore).toEqual(JOHN);
      jest.advanceTimersByTime(30 * MILLISECONDS);
      const valueNow = KeyValueService.get(NAME_KEY);
      expect(valueNow).toEqual(JOHN);
   });

   it("should get key value without ttl after long time", async () => {
      jest.useFakeTimers();
      KeyValueService.add(NAME_KEY, JOHN);
      const value = KeyValueService.get(NAME_KEY);
      jest.advanceTimersByTime(500 * MILLISECONDS);
      expect(value).toEqual(JOHN);
   });

   it("should delete key value", async () => {
      KeyValueService.add(NAME_KEY, JOHN);
      KeyValueService.delete(NAME_KEY);
      const value = KeyValueService.get(NAME_KEY);
      expect(value).toEqual(undefined);
   });

   it("should add multiple key values", async () => {
      KeyValueService.add(NAME_KEY, JOHN);
      KeyValueService.add(AGE_KEY, 1);
      const value = KeyValueService.get(NAME_KEY);
      const value2 = KeyValueService.get(AGE_KEY);
      expect(value).toEqual(JOHN);
      expect(value2).toEqual(1);
   });

   it("should clear store", async () => {
      KeyValueService.add(NAME_KEY, JOHN);
      const value = KeyValueService.get(NAME_KEY);
      KeyValueService.clear();
      const value2 = KeyValueService.get(NAME_KEY);
      expect(value2).toEqual(undefined);
   });
});

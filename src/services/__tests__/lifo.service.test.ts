import LifoService from "../../services/lifo.service";
import { AGAIN, HELLO, WORLD } from "../../mock/lifo.mock";

describe("LifoService", () => {
   beforeEach(() => {
      LifoService.clearStack();
   });

   it("should add a first item", async () => {
      LifoService.add(HELLO);
      const stack = LifoService.getStack();
      expect(stack.length).toEqual(1);
      expect(stack[0]).toEqual(HELLO);
   });

   it("should add two items", async () => {
      LifoService.add(HELLO);
      LifoService.add(AGAIN);
      const stack = LifoService.getStack();
      expect(stack.length).toEqual(2);
      expect(stack[0]).toEqual(AGAIN);
      expect(stack[1]).toEqual(HELLO);
   });

   it("should get undefined for empty stack", async () => {
      const item = LifoService.get();
      expect(item).toEqual(undefined);
   });

   it('should get "Hello" after series of add and get', async () => {
      LifoService.add(HELLO);
      LifoService.add(WORLD);
      const getWorld = LifoService.get();
      expect(getWorld).toEqual(WORLD);
      expect(LifoService.getStack()).toEqual([HELLO]);

      LifoService.add(AGAIN);
      const getAgain = LifoService.get();

      expect(getAgain).toEqual(AGAIN);
      expect(LifoService.getStack()).toEqual([HELLO]);

      const getHello = LifoService.get();
      expect(getHello).toEqual(HELLO);
      expect(LifoService.getStack()).toEqual([]);
   });

   it("should get correct items in stack", async () => {
      const stackBefore = LifoService.getStack();
      expect(stackBefore).toEqual([]);

      LifoService.add(HELLO);
      LifoService.add(WORLD);
      const stackNow = LifoService.getStack();
      expect(stackNow).toEqual([WORLD, HELLO]);
   });

   it("should empty the stack", async () => {
      LifoService.add(HELLO);
      LifoService.add(WORLD);
      const stack = LifoService.getStack();
      expect(stack).toEqual([WORLD, HELLO]);

      LifoService.clearStack();
      const stackNow = LifoService.getStack();
      expect(stackNow).toEqual([]);
   });
});

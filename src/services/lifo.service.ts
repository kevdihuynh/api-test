class LifoService {
   private static stack: any[] = [];

   /**
    * Adds a new element to the top of the stack.
    *
    * @param item The element to be added to the stack.
    */
   public static add(item: any): void {
      this.stack.unshift(item);
   }

   /**
    * Retrieves and removes the element at the top of the stack.
    * If the stack is empty, returns 'undefined'.
    *
    * @returns The element at the top of the stack, or 'undefined' if the stack is empty.
    */
   public static get(): any {
      if (this.stack.length === 0) {
         return undefined;
      }
      return this.stack.shift();
   }

   /**
    * Retrieves the current stack. (For testing purposes)
    *
    * @returns The current stack.
    */
   public static getStack(): any {
      return this.stack;
   }

   /**
    * Clears all elements from the stack. (For testing purposes)
    */
   public static clearStack(): void {
      this.stack = [];
   }
}

export default LifoService;

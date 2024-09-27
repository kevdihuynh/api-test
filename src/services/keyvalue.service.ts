import { MILLISECONDS } from "../constants/ttl.constants";
import { ValueObject } from "../models/keyvalue.model";

class KeyValueService {
   private static store: Map<String, ValueObject> = new Map();

   /**
    * Adds a key-value pair to the store with an optional time-to-live (TTL) in seconds.
    * @param key The key name.
    * @param value The value to be stored.
    * @param ttl Optional. The time-to-live for the key-value pair in seconds.
    */
   public static add(key: string, value: any, ttl?: number): void {
      const expireObj: ValueObject = {};
      if (ttl) {
         expireObj["expiresAt"] = Date.now() + ttl * MILLISECONDS;
      }
      this.store.set(key, { value, ...expireObj });
   }

   /**
    * Retrieves the value associated with the given key from the store.
    * If the value has expired based on its time-to-live (TTL), it is deleted from the store.
    * @param key The key name
    * @returns The value associated with the key, or undefined if the value has expired or the key does not exist.
    */
   public static get(key: string): any {
      const valueObj = this.store.get(key);
      const expiresAt = valueObj?.expiresAt;
      if (expiresAt && Date.now() > expiresAt) {
         this.delete(key);
         return undefined;
      }
      return valueObj?.value;
   }

   /**
    * Deletes the key-value pair associated with the given key name from the store.
    *
    * @param key The key name to delete.
    */
   public static delete(key: string): void {
      this.store.delete(key);
   }

   /**
    * Clears all key-value pairs from the store. (For testing purposes.)
    */
   public static clear(): void {
      this.store.clear();
   }
}

export default KeyValueService;

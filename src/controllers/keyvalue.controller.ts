import KeyValueService from "../services/keyvalue.service";
import { Request, Response } from "express";

class KeyValueController {
   /**
    * Adds a key-value pair to the store with an optional TTL (time-to-live).
    *
    * @route POST /api/v1/keyvalue/add
    * @param {string} req.body.key - The key to add to the store.
    * @param {string} req.body.value - The value associated with the key.
    * @param {number} req.body.ttl - Optional time-to-live for the key, in seconds.
    * @returns {void} Sends a JSON response indicating success or error of adding key-value.
    * @throws {400} If the key or value is not provided in the request body.
    * @throws {500} If there is an internal server error.
    */
   public static add(req: Request, res: Response): void {
      try {
         const { key, value, ttl } = req.body;
         if (!key || !value) {
            res.status(400).json({
               content: {
                  error: "a key and value is required.",
               },
            });
         }
         KeyValueService.add(key, value, ttl);
         res.status(200).json({
            content: {
               message: `Successfully added ${key} with value ${value}${
                  ttl ? `, time to live ${ttl} seconds` : ""
               }`,
            },
         });
      } catch (e) {
         res.status(500).json({
            content: {
               error: `Exception in add: ${e}`,
            },
         });
      }
   }

   /**
    * Retrieves the value for a given key from the key-value store.
    *
    * @route GET /api/v1/keyvalue/get
    * @param {string} req.query.key - The key to retrieve the value for.
    * @returns {void} Sends a JSON response with the retrieved value or an error message.
    * @throws {400} If the key is not provided in the request query.
    * @throws {500} If there is an internal server error while retrieving the value.
    */
   public static get(req: Request, res: Response): void {
      try {
         const { key } = req.query;
         if (!key) {
            res.status(400).json({
               content: {
                  error: "a key is required.",
               },
            });
         }
         const value = KeyValueService.get(key as string);
         res.status(200).json({
            content: {
               value,
            },
         });
      } catch (e) {
         res.status(500).json({
            content: {
               error: `Exception in get: ${e}`,
            },
         });
      }
   }

   /**
    * Deletes the value associated with the given key from the key-value store.
    *
    * @route DELETE /api/v1/keyvalue/delete
    * @param {string} req.query.key - The key to delete from the store.
    * @returns {void} Sends a JSON response indicating success or error.
    * @throws {400} If the key is not provided in the request query.
    * @throws {500} If there is an internal server error while deleting the key.
    */
   public static delete(req: Request, res: Response): void {
      try {
         const { key } = req.query;
         if (!key) {
            res.status(400).json({
               content: {
                  error: "a key is required.",
               },
            });
         }
         KeyValueService.delete(key as string);
         res.status(200).json({
            content: {
               message: `key ${key} has been deleted.`,
            },
         });
      } catch (e) {
         res.status(500).json({
            content: {
               error: `Exception in delete: ${e}`,
            },
         });
      }
   }
}

export default KeyValueController;

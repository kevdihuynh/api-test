import LifoService from "../services/lifo.service";
import { Request, Response } from "express";

class LifoController {
   /**
    * Adds an item to the LIFO stack.
    *
    * @route POST /api/v1/lifo/add
    * @param {*} req.body.item - The item to add to the stack. It can be any type, including number, string, etc.
    * @returns {void} Sends a JSON response indicating success or error of adding item
    * @throws {400} If the item is not provided in the request body.
    * @throws {500} If there is an internal server error.
    */
   public static add(req: Request, res: Response): void {
      try {
         const { item } = req.body;
         // assuming you can pass 0 as an item
         if (item === undefined || item === null || item === "") {
            res.status(400).json({
               content: {
                  error: "item is required.",
               },
            });
         }
         LifoService.add(item);
         res.status(200).json({
            content: {
               message: `${item} has been added to the stack`,
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
    * Retrieves the most recent item from the LIFO stack.
    *
    * @route GET /api/v1/lifo/get
    * @returns {void} Sends a JSON response containing the retrieved item or an error.
    * @throws {500} If there is an internal server error when fetching the item.
    */
   public static get(req: Request, res: Response): void {
      try {
         const item = LifoService.get();
         res.status(200).json({
            content: {
               item,
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
}

export default LifoController;

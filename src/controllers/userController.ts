import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { ApiResponse } from "../utils/responseModel";
import { PurchaseHistoryService } from "../services/purchaseHistoryService";

export class UserController {
  static entity = 'user'

  static async getTopMaskBuyers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PurchaseHistoryService.getTopBuyers(req.query);
      res.json(new ApiResponse('success', 'OK', result));
    } catch (error) {
      logger.error({ msg: 'Error in getTopMaskBuyers', error });
      next(error);
    }
  }
}
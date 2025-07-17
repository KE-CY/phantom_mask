import { NextFunction, Request, Response } from 'express';
import { PurchaseHistoryService } from '../services/purchaseHistoryService';
import logger from '../utils/logger';
import { ApiResponse } from "../utils/responseModel";

export class MaskController {
  static async getTransactionSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PurchaseHistoryService.getTransactionSummary(req.query);
      res.json(new ApiResponse('success', 'OK', result));
    } catch (error) {
      logger.error({ msg: 'Error in getTransactionSummary', error });
      next(error);
    }
  }
}

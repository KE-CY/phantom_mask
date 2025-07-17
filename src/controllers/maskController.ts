import { NextFunction, Request, Response } from 'express';
import { MaskService } from '../services/maskService';
import { PurchaseHistoryService } from '../services/purchaseHistoryService';
import logger from '../utils/logger';
import { ApiResponse } from "../utils/responseModel";

export class MaskController {
  static entity = 'mask';
  static async getTransactionSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PurchaseHistoryService.getTransactionSummary(req.query);
      res.json(new ApiResponse('success', 'OK', result));
    } catch (error) {
      logger.error({ msg: 'Error in getTransactionSummary', error });
      next(error);
    }
  }

  static async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = MaskService.buildTransformedFilters(req.query);

      const paginationQuery = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: req.query.sortBy?.toString() || MaskController.entity + '.id',
        sortOrder: (req.query.sortOrder?.toString() as 'ASC' | 'DESC') || 'ASC',
        filters,
      };

      const paginatedResult = await MaskService.getList(paginationQuery);

      return res.json(new ApiResponse('success', 'OK', paginatedResult));

    } catch (error) {
      logger.error({ msg: 'Error MaskController in getList', error });
      next(error);
    }
  }
}

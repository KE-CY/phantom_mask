import { NextFunction, Request, Response } from "express";
import { PharmacyMaskService } from "../services/pharmacyMaskService";
import { PharmacyService } from "../services/pharmacyService";
import logger from "../utils/logger";
import { ApiResponse } from "../utils/responseModel";

export class PharmacyController {
  static async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = PharmacyService.buildTransformedFilters(req.query);

      const paginationQuery = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: req.query.sortBy?.toString() || 'id',
        sortOrder: (req.query.sortOrder?.toString() as 'ASC' | 'DESC') || 'ASC',
        filters,
      };

      const paginatedResult = await PharmacyService.getList(paginationQuery);

      return res.json(new ApiResponse('success', 'OK', paginatedResult));

    } catch (error) {
      logger.error({ msg: 'Error PharmacyController in getList', error });
      next(error);
    }
  }

  static async getMasksByPharmacyId(req: Request, res: Response, next: NextFunction) {
    try {
      const pharmacyId = Number(req.params.id);
      const { sortBy = 'price', sortOrder } = req.query;

      const result = await PharmacyMaskService.getMasksByPharmacyId(
        pharmacyId,
        String(sortBy),
        sortOrder as 'ASC' | 'DESC'
      );

      return res.json(new ApiResponse('success', 'OK', result));
    } catch (err) {
      logger.error({ msg: 'Error in getMasksByPharmacy', err });
      next(err);
    }
  };
}

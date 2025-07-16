import { NextFunction, Request, Response } from "express";
import { PharmacyService } from "../services/pharmacyService";
import logger from "../utils/logger";
import { ApiResponse } from "../utils/responseModel";

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
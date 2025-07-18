import { Request, Response } from 'express';
import { ApiResponse } from "../utils/responseModel";

export class HealthController {
  static healthCheck(req: Request, res: Response): void {
    res.json(new ApiResponse('success', 'OK', { msg: 'Success Run.' }));
  }
}

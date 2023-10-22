import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  data?: Record<string, any> | null;
  error?: {
    code: string | number;
    message: string;
  } | null;
}

const formatResponse = (res: Response, success: boolean, status: number, data: any | null, error: { code: string | number; message: string } | null): void => {
  const apiResponse: ApiResponse = {
    success,
    data: data !== null ? data : undefined,
    error: error!== null? error: undefined,
  };

  res.status(status).json(apiResponse);
};

export const formatSuccess = (res: Response, status: number, data: any | null): void => {
  formatResponse(res, true, status, data, null);
};

export const formatError = (res: Response, status: number, message: string): void => {
  const error = {
    code: status,
    message,
  };

  formatResponse(res, false, status, null, error);
};


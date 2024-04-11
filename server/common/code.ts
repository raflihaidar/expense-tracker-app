export interface ResponseCodeValue {
  code: number;
  msg: string;
}

export const RESPONSE_CODE = {
  SUCCESS: { code: 200, msg: 'OK' },
  BAD_REQUEST: { code: 400, msg: 'Invalid request. Recheck the parameters sent' },
  UNAUTHORIZED: { code: 401, msg: 'Access denied. Recheck your credentials or log in' },
  FORBIDDEN: { code: 403, msg: 'You do not have permission to access this resource' },
  NOT_FOUND: { code: 404, msg: 'Requested resource not found' },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    msg: 'An internal error occurred on the server. Please try again later'
  }
};

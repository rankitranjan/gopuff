module.exports = Object.freeze({
  response_code: {
    /** Success Codes */
    SUCCESS: 200,
    /** Error Codes*/
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    MAX_SUCCESS_CODE: 299
  }
});

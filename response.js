const constants = require("./constants");

function getErrorMessage(errCode) {
  let resMessage;
  switch (errCode) {
    case constants.response_code.NOT_FOUND:
      resMessage = "Data not found";
      break;

    case constants.response_code.EMPTY_REQ:
      resMessage = "Empty data set cannot be processed";
      break;

    default:
      resMessage = "Some unknown error occurred!";
      break;
  }
  return resMessage;
}

module.exports = {
  sendResponse(resCode, resMessage, data, res, error) {
    if (resCode > constants.response_code.MAX_SUCCESS_CODE) {
      resMessage = resMessage || getErrorMessage(resCode);
      data = null;
    }
    res.json({
      "status": {
        "code": resCode,
        "message": resMessage
      },
      "data": data,
      "error": error || null
    });
  }
};

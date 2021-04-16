const logger = require('../logger');
const axios = require('axios');
const _ = require("lodash");
const constants = require('../constants');
const resp = require('../response');
const config = require('config');

getLocations = async function(req, res) {  
  try {
    const locations = await parseAddresses();
    if (locations) {
      return resp.sendResponse(constants.response_code.SUCCESS, 'Success', locations, res, {});
    } else {
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, 'Error in fetching data', null, res);
    }
  } catch (err) {
    logger.info(`Error: ${err}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err, null, res);
  }
}

saveInfo = async function(req, res) {  
  try {
    const applicant = await postInfoToFountain(req.body);
    if (applicant) {
      return resp.sendResponse(constants.response_code.SUCCESS, 'Success', applicant.portal_url, res, {});
    } else {
      return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, 'Error in posting applicant data', null, res);
    }
  } catch (err) {
    logger.info(`Error: ${err}`);
    return resp.sendResponse(constants.response_code.INTERNAL_SERVER_ERROR, err, null, res);
  }
}

const parseAddresses = async function() {
  try {
    const areas = [];
    const states = [];
    const response = await getFunnels();
    if (response.funnels) {
      const addresses = _.compact(_.uniq(_.map(response.funnels, 'address')));
      _.forEach(addresses, address => {
        var splittedArray = address.split(', ');
        areas.push(splittedArray[splittedArray.length-2])
        states.push(splittedArray[splittedArray.length-3])
      });
      return { areas: _.compact(_.uniq(areas)), states: _.compact(_.uniq(states)) };
    }
    else {
      return null;
    }
  } catch (error) {
    logger.info(`Error in parseing addresses: ${error}`);
    return error;
  }
}

const getFunnels = async function() {
  try {
    const url = `${config.get("serviceUrls.fountain")}/funnels?api_token=${config.get("apiToken")}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    logger.info(`Error in fetching funnels data from fountain: ${error}`);
    return error;
  }
}

const postInfoToFountain = async function(body) {
  try {
    const reqBody = {
      name: [body.first_name, body.last_name].join(' '),
      email: body.email,
      phone_number: body.phone_number,
      data: {
        state: body.state,
        area: body.area
      },
      api_token: config.get("apiToken")
    };
    const url = `${config.get("serviceUrls.fountain")}/applicants`;
    const response = await axios.post(url, reqBody);
    return response.data;
  } catch (error) {
    logger.info(`Error in posting data to fountain: ${error}`);
    return error;
  }
}

module.exports = {
  getLocations,
  saveInfo
};

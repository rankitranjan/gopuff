const express = require("express");
const router = express.Router();
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const fountainCtrl = require("./controllers/fountain");

const saveinfoBody = Joi.object({
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  state: Joi.string().allow(''),
  area: Joi.string().allow('')
})

router.get("/locations", fountainCtrl.getLocations);

router.post("/saveinfo", validator.body(saveinfoBody), fountainCtrl.saveInfo);

module.exports = router;

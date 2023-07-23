const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/controllers');
const { validateBody } = require('../../middlewares');
const schemas = require("../../schemas");

router.get('/', controllers.getAllContacts);

router.get('/:contactId', controllers.getById);

router.post('/', validateBody(schemas.addSchema), controllers.addNewContact);

router.delete('/:contactId', controllers.deleteContact);

router.put('/:contactId', validateBody(schemas.addSchema), controllers.changeContact);

module.exports = router;

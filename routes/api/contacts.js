const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/controllers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require("../../models/contact");

router.get('/', controllers.getAllContacts);

router.get('/:contactId', isValidId, controllers.getById);

router.post('/', validateBody(schemas.addSchema), controllers.addNewContact);

router.delete('/:contactId', isValidId, controllers.deleteContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), controllers.changeContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.changeFavoriteSchema), controllers.changeFavorite);

module.exports = router;
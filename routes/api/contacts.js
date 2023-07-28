const express = require('express');
const router = express.Router();

const {
    changeContact,
    deleteContact,
    addNewContact,
    getById,
    getAllContacts,
    changeFavorite
} = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require("../../models/contact");

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getById);

router.post('/', validateBody(schemas.addSchema), addNewContact);

router.delete('/:contactId', isValidId, deleteContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), changeContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.changeFavoriteSchema), changeFavorite);

module.exports = router;
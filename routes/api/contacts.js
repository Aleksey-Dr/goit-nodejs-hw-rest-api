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

const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { schemas } = require("../../models/contact");

router.get('/', authenticate, getAllContacts);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(schemas.addSchema), addNewContact);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), changeContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.changeFavoriteSchema), changeFavorite);

module.exports = router;
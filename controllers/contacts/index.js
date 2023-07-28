const { getAllContacts } = require('./getAllContacts');
const { getById } = require('./getById');
const { addNewContact } = require('./addNewContact');
const { deleteContact } = require('./deleteContact');
const { changeContact } = require('./changeContact');
const { changeFavorite } = require('./changeFavorite');

module.exports = {
    getAllContacts,
    getById,
    addNewContact,
    deleteContact,
    changeContact,
    changeFavorite,
}
const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  res.json(await Contact.find());
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
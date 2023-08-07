const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (page && limit) {
    res.json(await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate('owner', 'name email'));
  } else if (favorite) {
    res.json(await Contact.find({ owner, favorite: true }));
  } else {
    res.json(await Contact.find({ owner }));
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
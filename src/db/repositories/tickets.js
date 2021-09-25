const { models } = require('../');

const couldFound = item => item || Promise.reject(new Error('not found!'));

const list = async (where) => {
  return models.Ticket.findAll({ where });
};

const listAll = async () => {
  return list({ parentId: null });
};

const findBy = async (where) => {
  return models.Ticket.findOne({ where })
    .then(couldFound);
};

const create = async ({ title, isCompleted }) => {
  return models.Ticket.create({ title, isCompleted });
};

const update = async (id, { title, isCompleted, parentId }) => {
  return findBy({ id })
    .then(ticket => {
      ticket.title = title || ticket.title;
      ticket.isCompleted = isCompleted !== undefined ? isCompleted : ticket.isCompleted;
      ticket.parentId = parentId || ticket.parent;
      return ticket.save();
    });
};

const remove = async ({ id }) => {
  return removeChildren({ parentId: id })
    .then(() => findBy({ id }))
    .then(ticket => ticket.destroy())
    .then(() => true)
    .catch(() => false);
};

const removeChildren = async ({ parentId }) => {
  return models.Ticket.update({ parentId: null }, { where: { parentId } });
};

const removeParent = async ({ id }) => {
  return models.Ticket.update({ parentId: null }, { where: { id } })
    .then(() => list({ id }));
};

const updateParent = async ({ parentId, childrenIds: id }) => {
  return models.Ticket.update({ parentId }, { where: { id } })
    .then(() => findBy({ id: parentId }));
};

module.exports = {
  listAll,
  findBy,
  create,
  update,
  remove,
  removeParent,
  list,
  updateParent,
};

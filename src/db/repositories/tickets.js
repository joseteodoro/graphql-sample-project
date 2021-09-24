const { models } = require('../');

const list = async (where) => {
  return models.Ticket.findAll({ where });
};

const listAll = async () => {
  return list({ parentId: null });
};

const findBy = async ({ id }) => {
  return models.Ticket.findOne({
    where: { id },
  });
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
  return findBy({ id })
    .then(ticket => {
      return ticket.destroy();
    });
};

const removeParent = async ({ id }) => {
  return findBy({ id })
    .then(ticket => {
      ticket.parentId = null;
      return ticket.save();
    });
};

const updateParent = async ({ parentId, childrenIds: id }) => {
  return models.Ticket.update({ parentId }, { where: { id } })
    .then(() => list({ id }));
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

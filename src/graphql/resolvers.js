const repository = require('../db/repositories/tickets');

const resolvers = {
  Query: {
    tickets: repository.listAll, // should add all childs in the result recursively!
    ticket: async (_, { id }) => repository.findBy({ id }),
  },
  Ticket: {},
  Mutation: {
    createTicket: async (_, { title, isCompleted = false }) => {
      return repository.create({ title, isCompleted });
    },
    updateTicket: async (_, { id, title }) => {
      return repository.update(id, { title });
    },
    toggleTicket: async (_, { id, isCompleted }) => {
      return repository.update(id, { isCompleted });
    },
    setParentOfTicket: async (_, { parentId, childId }) => {
      return repository.update(childId, { parentId });
    },
    removeTicket: async (_, { id }) => {
      return repository.remove({ id });
    },
    removeParentFromTicket: async (_, { id }) => {
      return repository.removeParent({ id });
    },
    addChildrenToTicket: async (_, { id, childrenIds }) => {
      return repository.updateParent({ parentId: id, childrenIds });
    },
  },
};

module.exports = resolvers;

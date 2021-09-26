const repository = require('../db/repositories/tickets');
const service = require('../services');

const resolvers = {
  Query: {
    tickets: async () => repository.listAll().then(service.populateAllChildren), // should add all childs in the result recursively!
    ticket: async (_, { id }) => repository.findBy({ id }).then(service.populateAllChildren), // also should add all childs in the result recursively!
  },
  Ticket: {},
  Mutation: {
    createTicket: async (_, { title, isCompleted = false }) => {
      return repository.create({ title, isCompleted })
        .then(service.populateAllChildren);
    },
    updateTicket: async (_, { id, title }) => {
      return repository.update(id, { title })
        .then(service.populateAllChildren);
    },
    toggleTicket: async (_, { id, isCompleted }) => {
      return repository.update(id, { isCompleted })
        .then(service.populateAllChildren);
    },
    setParentOfTicket: async (_, { parentId, childId }) => {
      return repository.update(childId, { parentId })
        .then(service.populateAllChildren);
    },
    removeTicket: async (_, { id }) => {
      return repository.remove({ id });
    },
    removeParentFromTicket: async (_, { id }) => {
      return repository.removeParent({ id })
        .then(service.populateAllChildren);
    },
    addChildrenToTicket: async (_, { id, childrenIds }) => {
      return repository.updateParent({ parentId: id, childrenIds })
        .then(service.populateAllChildren);
    },
  },
};

module.exports = resolvers;

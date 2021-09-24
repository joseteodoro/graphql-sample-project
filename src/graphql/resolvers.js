const { models } = require('../db');

/**
 * TODO: Your task is implementing the resolvers. Go through the README first.
 * TODO: Your resolvers below will need to implement the typedefs given above.
 */

const resolvers = {
  Query: {
    /**
     * We have implemented this first query for you to set up an initial pattern.
     */
    tickets: async (root, args, context) => {
      return models.Ticket.findAll({
        where: {
          parentId: null,
        },
      });
    },
  },
  Ticket: {},
  Mutation: {},
};

module.exports = resolvers;

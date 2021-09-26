const repository = require('../db/repositories/tickets');

const emptyChild = ticket => ticket && ticket.id
  ? Object.assign(ticket, { children: [] })
  : ticket;

const emptyChildren = (items = []) => items.map(emptyChild);

const fillChildren = async items => {
  return Promise.resolve(items)
    .then(fromDb => {
      return Array.isArray(fromDb)
        ? emptyChildren(fromDb)
        : emptyChild(fromDb);
    });
};

const createMapById = (acc, item) => {
  return Object.assign(acc, { [item.id]: emptyChild(item) });
};

const populateChildren = parentsById => map => {
  Object.values(map).forEach(ticket => {
    if (!ticket.parentId) return;
    parentsById[ticket.parentId] && parentsById[ticket.parentId].children.push(ticket);
    map[ticket.parentId] && map[ticket.parentId].children.push(ticket);
  });
  return map;
};

const populateAllChildren = async (args) => {
  const parents = Array.isArray(args) ? args : [args];
  const parentsById = parents.reduce(createMapById, {});
  return repository.listAllChildren()
    .then(emptyChildren)
    .then(records => records.reduce(createMapById, {}))
    .then(populateChildren(parentsById))
    .then(() => args);
};

module.exports = { fillChildren, populateAllChildren };

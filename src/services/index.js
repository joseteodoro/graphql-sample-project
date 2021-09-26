const emptyChild = ticket => ticket && ticket.id
  ? ({...ticket, children: []})
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

module.exports = { fillChildren };

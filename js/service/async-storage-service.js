export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
  adReview,
  removeReview,
};

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return Promise.resolve(entities);
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity.id === entityId)
  );
}

function post(entityType, newEntity) {
  newEntity.id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}
// my function
function adReview(bookId, review,entityType) {
    return query(entityType).then((books) => {
        const book = books.find(book => book.id === bookId);
        console.log(book);
    if (!book.reviews) book.reviews = []    
    
        book.reviews.push(review)

    return put(entityType, book)
  });
}

function removeReview(reviewId,bookId,entityType){
  return query(entityType).then((books) => {
    const book = books.find(book => book.id === bookId);
    const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
    book.reviews.splice(reviewIdx,1)
    return put(entityType, book)
  }); 
  }

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 8) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

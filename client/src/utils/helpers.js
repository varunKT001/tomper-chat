export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value);
};

export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const getSender = (currentUser, users) => {
  return users[0]._id === currentUser.id ? users[1].name : users[0].name;
};

export const getSendersFullDetails = (currentUser, users) => {
  return users[0]._id === currentUser.id ? users[1] : users[0];
};

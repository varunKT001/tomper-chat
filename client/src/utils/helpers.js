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

export const isSameSender = (
  messages,
  currentMessage,
  currentMessageIndex,
  currentUserId
) => {
  return (
    currentMessageIndex < messages.length - 1 &&
    (messages[currentMessageIndex + 1].sender._id !==
      currentMessage.sender._id ||
      messages[currentMessageIndex + 1].sender._id === undefined) &&
    messages[currentMessageIndex].sender._id !== currentUserId
  );
};

export const isLastMessage = (messages, currentMessageIndex, currentUserId) => {
  return (
    currentMessageIndex === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== currentUserId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, currentMessage, currentMessageIndex) => {
  return currentMessageIndex > 0 &&
    messages[currentMessageIndex - 1].sender._id === currentMessage.sender._id
    ? true
    : false;
};

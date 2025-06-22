
exports.isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

exports.cleanTask = (task) => {
  const { _id, title, description, responsible, completed } = task.toObject();
  return { id: _id.toString(), title, description, responsible, completed };
}
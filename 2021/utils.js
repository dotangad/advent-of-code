module.exports = {
  sum: (...args) =>
    (typeof args[0] === "object" ? args[0] : args).reduce((acc, e) => acc + e),
};

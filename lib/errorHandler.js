const errorHandler = (location, error) => {
  console.error(`[${location}]: ${error}`);
  throw new Error("We fail try agian later :(");
};

module.exports = { errorHandler };

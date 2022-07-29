const { createCourse } = require("../db/mutations");
const { getCourses, getCourseById } = require("../db/querys");

const resolvers = {
  Query: {
    courses: async () => await getCourses(),
    course: async (root, { id }) => await getCourseById(id),
  },
  Mutation: {
    createCourse: async (root, { input }) => await createCourse(input),
  },
};

module.exports = {
  resolvers,
};

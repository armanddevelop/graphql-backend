const {
  createCourse,
  createPerson,
  editCourse,
  editPerson,
  deleteCourse,
  deletePerson,
  addPeople,
} = require("../db/mutations");
const {
  getCourses,
  getCourseById,
  getPeople,
  getpersonById,
} = require("../db/querys");

const { types } = require("./types");

const resolvers = {
  Query: {
    courses: async () => await getCourses(),
    course: async (root, { id }) => await getCourseById(id),
    people: async () => await getPeople(),
    person: async (root, { id }) => await getpersonById(id),
  },
  Mutation: {
    addPeople: async (root, { courseID, personID }) =>
      await addPeople(courseID, personID),
    createCourse: async (root, { input }) => await createCourse(input),
    createPerson: async (root, { input }) => await createPerson(input),
    editCourse: async (root, { input, _id }) => await editCourse(input, _id),
    editPerson: async (root, { input, _id }) => await editPerson(input, _id),
    deleteCourse: async (root, { _id }) => await deleteCourse(_id),
    deletePerson: async (root, { _id }) => await deletePerson(_id),
  },
  ...types,
};

module.exports = {
  resolvers,
};

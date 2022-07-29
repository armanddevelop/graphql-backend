const {
  createCourse,
  createStudent,
  editCourse,
  editStudent,
} = require("../db/mutations");
const {
  getCourses,
  getCourseById,
  getStudents,
  getStudentById,
} = require("../db/querys");

const resolvers = {
  Query: {
    courses: async () => await getCourses(),
    course: async (root, { id }) => await getCourseById(id),
    students: async () => await getStudents(),
    student: async (root, { id }) => await getStudentById(id),
  },
  Mutation: {
    createCourse: async (root, { input }) => await createCourse(input),
    createStudent: async (root, { input }) => await createStudent(input),
    editCourse: async (root, { input, _id }) => await editCourse(input, _id),
    editStudent: async (root, { input, _id }) => await editStudent(input, _id),
  },
};

module.exports = {
  resolvers,
};

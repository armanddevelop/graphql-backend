const { ObjectId } = require("mongodb");
const { dbConnection } = require("./config");

const getCourses = async () => {
  try {
    const client = await dbConnection();
    const courses = client.db("graphql").collection("courses").find().toArray();
    return courses || [];
  } catch (error) {
    console.error("[getCoursesError] ", error);
  }
};

const getCourseById = async (id) => {
  try {
    const client = await dbConnection();
    const course = client
      .db("graphql")
      .collection("courses")
      .findOne({ _id: ObjectId(id) });
    return course;
  } catch (error) {
    console.error("[getCourseByIdError] ", error);
  }
};

const getStudents = async () => {
  try {
    const client = await dbConnection();
    const students = client
      .db("graphql")
      .collection("students")
      .find()
      .toArray();
    return students;
  } catch (error) {
    console.error("[getStudentsError] ", error);
  }
};

const getStudentById = async (id) => {
  try {
    const client = await dbConnection();
    const student = client
      .db("graphql")
      .collection("students")
      .findOne({ _id: ObjectId(id) });
    return student;
  } catch (error) {
    console.error("[getStudentByIdError] ", error);
  }
};

module.exports = { getCourses, getCourseById, getStudents, getStudentById };

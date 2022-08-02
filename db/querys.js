const { ObjectId } = require("mongodb");
const { errorHandler } = require("../lib/errorHandler");
const { dbConnection } = require("./config");

const getCourses = async () => {
  try {
    const client = await dbConnection();
    const courses = client.db("graphql").collection("courses").find().toArray();
    return courses || [];
  } catch (error) {
    errorHandler("getCoursesError", error);
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
    errorHandler("getCourseByIdError", error);
  }
};

const getPeople = async () => {
  try {
    const client = await dbConnection();
    const students = client
      .db("graphql")
      .collection("students")
      .find()
      .toArray();
    return students;
  } catch (error) {
    errorHandler("getStudentsError", error);
  }
};

const getpersonById = async (id) => {
  try {
    const client = await dbConnection();
    const student = client
      .db("graphql")
      .collection("students")
      .findOne({ _id: ObjectId(id) });
    return student;
  } catch (error) {
    errorHandler("getStudentByIdError", error);
  }
};

const searchItems = async (keyword) => {
  try {
    const client = await dbConnection();
    const courses = await client
      .db("graphql")
      .collection("courses")
      .find({ $text: { $search: keyword } })
      .toArray();
    const people = await client
      .db("graphql")
      .collection("students")
      .find({ $text: { $search: keyword } })
      .toArray();
    const items = [...courses, ...people];
    return items;
  } catch (error) {
    errorHandler("searchItemsError", error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getPeople,
  getpersonById,
  searchItems,
};

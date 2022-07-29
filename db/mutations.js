const { ObjectId } = require("mongodb");
const { dbConnection } = require("./config");

const createCourse = async (input) => {
  try {
    let newCourse = {};
    const client = await dbConnection();

    if (!input?.topic) {
      newCourse = Object.assign(input, { topic: "" });
    }
    if (!input?.teacher) {
      newCourse = Object.assign(input, { teacher: "" });
    }
    if (input?.topic || input?.teacher) {
      newCourse = { ...input };
    }

    const course = await client
      .db("graphql")
      .collection("courses")
      .insertOne(newCourse);
    newCourse._id = course.insertedId;
    return newCourse;
  } catch (error) {
    console.error("[createCourseError] ", error);
  }
};

const createStudent = async (inputs) => {
  try {
    const client = await dbConnection();
    const student = await client
      .db("graphql")
      .collection("students")
      .insertOne(inputs);
    const newStundet = {
      ...inputs,
      _id: student.insertedId,
    };
    return newStundet;
  } catch (error) {
    console.error("[createStudentError] ", error);
  }
};

const editCourse = async (inputs, _id) => {
  try {
    const client = await dbConnection();
    await client
      .db("graphql")
      .collection("courses")
      .updateOne({ _id: ObjectId(_id) }, { $set: inputs });
    const course = await client
      .db("graphql")
      .collection("courses")
      .findOne({ _id: ObjectId(_id) });
    return course;
  } catch (error) {
    console.error("[editCourseError] ", error);
  }
};

const editStudent = async (inputs, _id) => {
  try {
    const client = await dbConnection();
    await client
      .db("graphql")
      .collection("students")
      .updateOne({ _id: ObjectId(_id) }, { $set: inputs });
    const student = await client
      .db("graphql")
      .collection("students")
      .findOne({ _id: ObjectId(_id) });
    return student;
  } catch (error) {
    console.error("[editStudentError] ", error);
  }
};

module.exports = { createCourse, createStudent, editCourse, editStudent };

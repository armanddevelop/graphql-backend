const { ObjectId } = require("mongodb");
const { errorHandler } = require("../lib/errorHandler");
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
    errorHandler("createCourseError", error);
  }
};

const createPerson = async (inputs) => {
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
    errorHandler("createStudentError", error);
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
    errorHandler("editCourseError", error);
  }
};

const editPerson = async (inputs, _id) => {
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
    errorHandler("editStudentError", error);
  }
};

const deleteCourse = async (_id) => {
  try {
    const client = await dbConnection();
    const findCourseToDelete = await client
      .db("graphql")
      .collection("courses")
      .findOne({ _id: ObjectId(_id) });
    if (!findCourseToDelete) return { ok: false };
    await client
      .db("graphql")
      .collection("courses")
      .deleteOne({ _id: ObjectId(_id) });
    return { _id, ok: true };
  } catch (error) {
    errorHandler("delteCourseError", error);
  }
};

const deletePerson = async (_id) => {
  try {
    const client = await dbConnection();
    const findStudentToDelete = await client
      .db("graphql")
      .collection("students")
      .findOne({ _id: ObjectId(_id) });
    if (!findStudentToDelete) return { ok: false };
    await client
      .db("graphql")
      .collection("students")
      .deleteOne({ _id: ObjectId(_id) });
    return { _id, ok: true };
  } catch (error) {
    errorHandler("deleteStudentError", error);
  }
};

const addPeople = async (courseID, personID) => {
  try {
    const client = await dbConnection();
    const course = await client
      .db("graphql")
      .collection("courses")
      .findOne({ _id: ObjectId(courseID) });
    const student = await client
      .db("graphql")
      .collection("students")
      .findOne({ _id: ObjectId(personID) });
    if (course && student) {
      await client
        .db("graphql")
        .collection("courses")
        .updateOne(
          { _id: ObjectId(courseID) },
          { $addToSet: { people: ObjectId(personID) } }
        );
      const peopleAddinCourse = await client
        .db("graphql")
        .collection("courses")
        .findOne({ _id: ObjectId(courseID) });
      return peopleAddinCourse;
    }
    errorHandler("addPersonError", "courseID or personID does not exist");
  } catch (error) {
    errorHandler("addPersonError", error);
  }
};

module.exports = {
  createCourse,
  createPerson,
  editCourse,
  editPerson,
  deleteCourse,
  deletePerson,
  addPeople,
};

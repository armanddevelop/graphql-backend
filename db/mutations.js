const { dbConnection } = require("./config");

const createCourse = async (input) => {
  try {
    let newCourse = {};
    const client = await dbConnection();
    console.log("esto vale input ", input);
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
module.exports = { createCourse };

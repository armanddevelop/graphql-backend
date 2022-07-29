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
    const client = await connection();
    const course = client
      .db("graphql")
      .collection("courses")
      .findOne({ _id: ObjectId(id) });
    return course;
  } catch (error) {
    console.error("[getCourseByIdError] ", error);
  }
};

module.exports = { getCourses, getCourseById };

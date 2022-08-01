const { ObjectId } = require("mongodb");
const { dbConnection } = require("../db/config");

const types = {
  Course: {
    people: async ({ people }) => {
      try {
        const client = await dbConnection();
        const ids = people ? people.map((id) => ObjectId(id)) : [];
        const peopleData =
          ids.length > 0
            ? await client
                .db("graphql")
                .collection("students")
                .find({ _id: { $in: ids } })
                .toArray()
            : [];
        return peopleData;
      } catch (error) {
        console.error("[errorCourseType]: ", error);
      }
    },
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person?.phone) {
        return "Monitor";
      }
      return "Student";
    },
  },
};

module.exports = {
  types,
};

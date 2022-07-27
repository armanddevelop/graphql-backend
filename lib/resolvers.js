const courses = [
  {
    _id: "any1",
    title: "Graphql",
    teacher: "Pachis",
    description: "Aprender graphql",
    topic: "como usar de manera basica graphql",
  },
  {
    _id: "any2",
    title: "Graphql",
    teacher: "Ismael",
    description: "Aprender graphql",
    topic: "como usar de manera basica graphql",
  },
  {
    _id: "any3",
    title: "Graphql",
    teacher: "Freddy cabeza de cubo",
    description: "Aprender graphql",
    topic: "como usar de manera basica graphql",
  },
];
const resolvers = {
  Query: {
    courses: () => courses,
    course: (root, args) => {
      return courses.find((course) => course._id === args.id);
    },
  },
};
module.exports = {
  resolvers,
};

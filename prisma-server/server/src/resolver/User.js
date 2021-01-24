import getUserId from "../utils/getUserId";

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    async resolve(parent, args, { req }, info) {
      const userId = getUserId(req, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    },
  },
  posts: {
    fragment: "fragment userId on User { id }",
    async resolve(parent, args, { prisma, req }, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      });
    },
  },
};

export { User as default };

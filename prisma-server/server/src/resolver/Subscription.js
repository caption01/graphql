import getUserId from "../utils/getUserId";

const Subscription = {
  comment: {
    async subscribe(parent, args, ctx, info) {
      const { postId } = args;
      const { prisma } = ctx;

      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },
  post: {
    async subscribe(parent, args, ctx, info) {
      const { prisma } = ctx;
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
  myPost: {
    async subscribe(parent, args, { prisma, req }, info) {
      const userId = getUserId(req);

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },
};

export { Subscription as default };

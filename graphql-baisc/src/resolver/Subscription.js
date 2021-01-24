const Subscription = {
  comment: {
    subscribe(parent, args, ctx, info) {
      const { postId } = args;
      const { db, pubsub } = ctx;

      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error("Post not found");
      }

      return pubsub.asyncIterator("comment");
    },
  },
  post: {
    subscribe(parent, args, ctx, info) {
      const { db, pubsub } = ctx;
      return pubsub.asyncIterator("post");
    },
  },
};

export { Subscription as default };

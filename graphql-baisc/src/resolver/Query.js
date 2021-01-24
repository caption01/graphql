const Query = {
  users(parent, args, { db }, info) {
    const { query } = args;

    if (!query) {
      return db.users;
    }

    return db.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  posts(parent, args, { db }, info) {
    const { query } = args;

    if (!query) {
      return db.posts;
    }

    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  post() {
    return {
      id: "1234",
      title: "How to learn GraphQL",
      body: "yeah first you nedd to .......",
      published: false,
    };
  },
};

export { Query as default };

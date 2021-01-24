import bcrypt from "bcryptjs";

import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  },
  async login(parent, args, { prisma }, info) {
    const opArgs = {};

    opArgs.where = {
      email: args.data.email,
    };

    const user = await prisma.query.user(opArgs);

    if (!user) {
      throw new Error("user not found");
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error("user or password not correct");
    }

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  },
  async deleteUser(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  async updateUser(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async createPost(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);

    return prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async deletePost(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error("Unable to delete post");
    }

    return prisma.mutation.deletePost({ where: { id: args.id } });
  },
  async updatePost(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error("Unable to update post");
    }

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    });

    if (isPublished && args.data.published === false) {
      prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      });
    }

    const opArgs = {
      where: {
        id: args.id,
      },
      data: args.data,
    };

    return prisma.mutation.updatePost(opArgs, info);
  },
  async createComment(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    });

    if (!postExists) {
      throw new Error("Unable to find post");
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },
  async deleteComment(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error("Unable to delete");
    }

    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },
  async updateComment(parent, args, { prisma, req }, info) {
    const userId = getUserId(req);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error("Unable to update");
    }

    return prisma.mutation.updateComment({
      where: {
        id: args.id,
      },
      data: args.data,
    });
  },
};

export { Mutation as default };

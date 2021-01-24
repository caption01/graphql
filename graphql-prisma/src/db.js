const users = [
  { id: "1", name: "bom", email: "bom@gmail.com", age: 23 },
  { id: "2", name: "sera", email: "sera@gmail.com", age: null },
  { id: "3", name: "karl", email: "karl@gmail.com", age: null },
];

const posts = [
  {
    id: "10",
    title: "The Mega Sea",
    body: "this is a very beautyful sea",
    published: true,
    author: "1",
  },
  {
    id: "20",
    title: "Dark",
    body: "the sadest life is begane on sim...",
    published: true,
    author: "1",
  },
  {
    id: "30",
    title: "The Box",
    body: "how can someone pull up the box on",
    published: true,
    author: "2",
  },
];

const comments = [
  { id: "101", text: "this is cool", author: "3", post: "10" },
  { id: "102", text: "this is hot", author: "3", post: "10" },
  { id: "103", text: "this is awsum", author: "3", post: "20" },
  { id: "104", text: "this is bad", author: "3", post: "30" },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };

import { db } from "@/db";
import { posts } from "@/db/schema/posts";
import { users } from "@/db/schema/users";

const fakeUsers = [
  {
    id: 1,
    username: "john_doe",
  },
  {
    id: 2,
    username: "alice_smith",
    avatar: "https://www.gravatar.com/avatar/?d=retro",
  },
  {
    id: 3,
    username: "michael_lei",
    avatar: "https://www.gravatar.com/avatar/?d=identicon",
  },
];

const fakePosts = [
  {
    id: 1,
    userId: 1,
    title: "Exploring Artificial Intelligence",
    content:
      "Just finished reading a fascinating book about artificial intelligence. The author delves deep into the ethical implications of AI in our society. Highly recommended!",
  },
  {
    id: 2,
    userId: 2,
    title: "Charming Coffee Shop Experience",
    content:
      "Visited a charming coffee shop today and tried their new caramel macchiato. The ambiance was cozy, and the coffee was simply delightful. Can't wait to go back!",
  },
  {
    id: 3,
    userId: 3,
    title: "Weekend Hiking Adventure",
    content:
      "Spent the weekend hiking in the mountains. The scenic views were breathtaking, and the fresh mountain air was invigorating. Nature truly has a way of rejuvenating the soul.",
  },
];

async function seedDatabase() {
  await db.insert(users).values(fakeUsers);
  await db.insert(posts).values(fakePosts);
}

seedDatabase()
  .then(() => console.log("Database seeded!"))
  .catch((e) => console.error(e.message));

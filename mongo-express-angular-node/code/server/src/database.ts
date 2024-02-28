import * as mongodb from "mongodb";
import { Task } from "./task";

export const collections: {
  tasks?: mongodb.Collection<Task>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  try {
    // const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("todo-list-database");

    const taskCollection = db.collection<Task>("tasks");
    collections.tasks = taskCollection;

    // Clear existing data in the 'tasks' collection
    await taskCollection.deleteMany({});
    // Adding two entries into the 'tasks' collection
    const task1: Task = {
      name: "Sanity",
      description: "Perform sanity in facetsdemo and root",
      completed: false,
    };
    const task2: Task = {
      name: "Release",
      description: "Perform tag cut and promotion",
      completed: true,
    };
    await taskCollection.insertMany([task1, task2]);
  } finally {
  }
}

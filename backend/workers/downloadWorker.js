import { Worker } from "bullmq";
import Redis from "ioredis";
import { extractMedia } from "../services/extractorService.js";

const connection = new Redis();

const worker = new Worker(
  "downloads",
  async (job) => {
    const { url } = job.data;

    const result = await extractMedia(url);

    return result;
  },
  { connection }
);

console.log("Worker running...");
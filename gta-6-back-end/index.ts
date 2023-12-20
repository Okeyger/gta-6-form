import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required fields!" });
  }

  try {
    const createdRow = await prisma.waitList.create({
      data: {
        name,
        email,
      },
    });

    res.json(createdRow);
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

const server = app.listen(PORT, () => {
  console.log("Listening");
});

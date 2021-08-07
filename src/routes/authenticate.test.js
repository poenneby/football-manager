import { test, expect } from "@jest/globals";
import app from "../server";
import supertest from "supertest";

const request = supertest(app);

test("POST authentication with valid credentials should return JWT", async () => {
  const response = await request
    .post("/authenticate")
    .send({ username: "joe", password: "letmein" });
  expect(response.status).toBe(200);
  expect(JSON.parse(response.text).accessToken).toBeDefined();
});

test("POST authentication with invalid credentials should return JWT", async () => {
  const response = await request
    .post("/authenticate")
    .send({ username: "jane", password: "password" });
  expect(response.status).toBe(401);
  expect(response.text).toBe("Username or password incorrect");
});

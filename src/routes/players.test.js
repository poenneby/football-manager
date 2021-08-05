import { jest, test, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../server";
import playerService from "../services/playerService.js";
const request = supertest(app);

test("GET should respond unauthorized when no authorization token present", async () => {
  const response = await request.get("/players");
  expect(response.status).toBe(401);
});

test("GET should respond ok with players when valid token", async () => {
  const authentication = await request
    .post("/authenticate")
    .send({ username: "joe", password: "letmein" });
  const jwt = JSON.parse(authentication.text).accessToken;
  jest.spyOn(playerService, "findAll").mockReturnValue([
    {
      id: 1,
      name: "Diego Maradona",
      dateOfBirth: "1960-10-30",
      nationality: "Argentina",
      preferredFoot: "Right",
    },
  ]);

  const response = await request
    .get("/players")
    .set("Authorization", `Bearer ${jwt}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    {
      id: 1,
      name: "Diego Maradona",
      dateOfBirth: "1960-10-30",
      nationality: "Argentina",
      preferredFoot: "Right",
    },
  ]);
});

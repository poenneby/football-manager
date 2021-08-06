import { jest, test, expect } from "@jest/globals";
import app from "../server";
import supertest from "supertest";
import playerService from "../services/playerService.js";

const request = supertest(app);

async function fetchToken() {
  const authentication = await request
    .post("/authenticate")
    .send({ username: "joe", password: "letmein" });
  return JSON.parse(authentication.text).accessToken;
}

test("GET should respond unauthorized when no valid authorization token present", async () => {
  const response = await request.get("/players");
  expect(response.status).toBe(401);
});

test("GET players should return players", async () => {
  const jwt = await fetchToken();
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

test("GET players by id should return player", async () => {
  const jwt = await fetchToken();
  jest.spyOn(playerService, "findById").mockReturnValue([
    {
      id: 1,
      name: "Diego Maradona",
      dateOfBirth: "1960-10-30",
      nationality: "Argentina",
      preferredFoot: "Right",
    },
  ]);

  const response = await request
    .get("/players/1")
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

test("PUT players by id should update player", async () => {
  const playerUpdate = {
    preferredFoot: "Left",
  };
  const jwt = await fetchToken();
  jest.spyOn(playerService, "findById").mockReturnValue({
    id: 1,
    name: "Diego Maradona",
    dateOfBirth: "1960-10-30",
    nationality: "Argentina",
    preferredFoot: "Right",
  });
  playerService.save = jest.fn();

  const response = await request
    .put("/players/1")
    .set("Authorization", `Bearer ${jwt}`)
    .send(playerUpdate);

  expect(response.status).toBe(204);
  expect(playerService.save).toHaveBeenCalledWith({
    id: 1,
    name: "Diego Maradona",
    dateOfBirth: "1960-10-30",
    nationality: "Argentina",
    preferredFoot: "Left",
  });
});

test("POST players should create player", async () => {
  const newPlayer = {
    name: "Diego Maradona",
    dateOfBirth: "1960-10-30",
    nationality: "Argentina",
    preferredFoot: "Right",
  };
  const jwt = await fetchToken();
  playerService.save = jest.fn();

  const response = await request
    .post("/players")
    .set("Authorization", `Bearer ${jwt}`)
    .send(newPlayer);

  expect(response.status).toBe(201);
  expect(playerService.save).toHaveBeenCalledWith({
    name: "Diego Maradona",
    dateOfBirth: "1960-10-30",
    nationality: "Argentina",
    preferredFoot: "Right",
  });
});

test("DELETE players should delete player", async () => {
  const jwt = await fetchToken();
  playerService.remove = jest.fn();

  const response = await request
    .delete("/players/1")
    .set("Authorization", `Bearer ${jwt}`);

  expect(response.status).toBe(204);
  expect(playerService.remove).toHaveBeenCalledWith("1");
});

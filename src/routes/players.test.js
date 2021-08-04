import supertest from "supertest";
const request = supertest(app);
import app from "../server";

test("GET should respond unauthorized when no authorization token present", async (done) => {
  const response = await request.get("/players");
  expect(response.status).toBe(401);
  done();
});

test("GET should respond ok with players when valid token", async (done) => {
  const authentication = await request
    .post("/authenticate")
    .send({ username: "joe", password: "letmein" });
  const jwt = JSON.parse(authentication.text).accessToken;
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
  done();
});

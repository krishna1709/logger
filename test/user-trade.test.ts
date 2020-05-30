import { agent as request } from "supertest";
import { expect } from "chai";
const app = require("../src/app");
import { appConfig } from "../src/config/appConfig";
const baseurl = `http://localhost:${appConfig.server.port}`;
let access_token = "";


describe("POST /trades", () => {
    //call token api using secret key
    before(async function () {
        const res = await request(baseurl).post("/auth/token").send({
                accessKey: appConfig.security.jwt.secretKey
            });
            expect(res.status).to.equal(200);
            access_token = res.body.access_token;
    });

    // unit testing for post
    it("should always pass", async function () {
        const res = await request(baseurl)
        .post("/trades")
        .set({ "access_token": access_token })
        .send({
            "id": Math.floor(Math.random() * Math.floor(1000)),
            "type": "buy",
            "user": {
                "name": "David"
            },
            "symbol": "AC",
            "shares": 28,
            "price": 162.17,
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
    });
});

describe("GET /trades", () => {
    it("should always pass", async function () {
        // unit testing for all user trade list
        const res = await request(baseurl).get("/trades").set({ "access_token": access_token });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("array");
    });
});

describe("GET /trades/users/{userID}", () => {
    it("should always pass", async function () {
        // fetch trade data from db
        const response = await request(baseurl).get("/trades").set({ "access_token": access_token });
        
        //test the this api with given user trade data
        const res = await request(baseurl).get(`/trades/users/${response.body.data[0]["user"]["id"]}`).set({ "access_token": access_token });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("object");
    });
});

describe("GET /stocks/:stockSymbol/trades", () => {
    it("should always pass", async function () {
        // fetch trade data from db
        const response = await request(baseurl).get("/trades").set({ "access_token": access_token });
        
        //test the this api with given user trade data
        const res = await request(baseurl).get(`/stocks/${response.body.data[0]["symbol"]}/trades?type=${response.body.data[0]["type"]}&start=${response.body.data[0]["timestamp"]}&end=${new Date()}`).set({ "access_token": access_token });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("array");
    });
});

describe("GET /stocks/:stockSymbol/price", () => {
    it("should always pass", async function () {
        // fetch trade data from db
        const response = await request(baseurl).get("/trades").set({ "access_token": access_token });
        
        //test the this api with given user trade data
        const res = await request(baseurl).get(`/stocks/${response.body.data[0]["symbol"]}/price?start=${response.body.data[0]["timestamp"]}&end=${new Date()}`).set({ "access_token": access_token });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.be.an("object");
    });
});

describe("DELETE /trades", () => {
    it("should always pass", async function () {
        const res = await request(baseurl).delete("/trades").set({ "access_token": access_token });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
    });
});
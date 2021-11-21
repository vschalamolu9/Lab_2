const chai = require("chai");
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../server");

const agent = chai.request.agent(app);

describe('Testing Customer SignIn', () => {

    it('Incorrect Password', (done) => {
        agent
            .post('/api/users/login')
            .send({emailId: 'manoj@gmail.com', password: '1234567'})
            .then(res => {
                expect(res.body).to.have.deep.property(
                    "status",
                    "Authentication Failed"
                );
                done();
            })
            .catch((error) => {
                console.log(error);
            });

    })

    it("Customer Does not exist", (done) => {
        agent
            .post("/api/users/login")
            .send({ email: "sam123@gmail.com", password: "123456" })
            .then((res) => {
                expect(res.body).to.deep.equal({ status: "Authentication Failed" });
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    it("Authentication and Signin Successful", (done) => {
        agent
            .post("/api/users/login")
            .send({ email: "user.one@gmail.com", password: "password" })
            .then((res) => {
                expect(res.body).to.have.deep.property(
                    "status",
                    "Authentication Successful"
                );
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
})

describe("Restaurant Sign up", () => {
    it("Restaurant Exists", (done) => {
        agent
            .post("/api/restaurants/signup")
            .send({
                "restaurantName" : "Panda Express",
                "restaurantEmail" : "panda@gmail.com",
                "password" : "password",
                "restaurantType" : "Delivery",
                "street" : "",
                "city" : "San Jose",
                "province" : "CA",
                "country" : "United States",
                "zipCode" : "95113",
                "imageUrl" : "https://res.cloudinary.com/vschalamolu9/image/upload/v1637203035/uber_eats/panda-express_obzfmx.jpg"
            })
            .then((res) => {
                expect(res.body).to.have.deep.property(
                    "status",
                    "RESTAURANT_ALREADY_EXISTS"
                );
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
    it(" Restaurant SignUp Successful", (done) => {
        agent
            .post("/api/restaurants/signup")
            .send({
                "restaurantName" : "Panda Express",
                "restaurantEmail" : "panda.sanjose@gmail.com",
                "password" : "password",
                "restaurantType" : "Delivery",
                "street" : "",
                "city" : "San Jose",
                "province" : "CA",
                "country" : "United States",
                "zipCode" : "95113",
                "imageUrl" : "https://res.cloudinary.com/vschalamolu9/image/upload/v1637203035/uber_eats/panda-express_obzfmx.jpg"
            })
            .then((res) => {
                expect(res.body).to.have.deep.property("status", "RESTAURANT_ADDED");
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
});

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTViZmY1NTE0ZTZjNzc1YmJhNDZhOSIsImlhdCI6MTYzNzQzMzI1MiwiZXhwIjoxNjM4Mjk3MjUyfQ.pcdLJyYx5j7COfWbqBzB3FxScIoQfbujovzm6XSPKRY";
describe(" Restaurant Profile Testing", () => {
    it("Restaurant does not exist", (done) => {
        agent
            .get("/api/restaurants/details/6195c8876fe889ada2f5d7bc")
            .set("x-auth-token", authToken)
            .then((res) => {
                expect(res.body).to.have.deep.property(
                    "status",
                    "RESTAURANT_DETAILS_FETCH_FAILED"
                );
                done();
            })
            .catch((error) => {
                console.log(error);
                done(e);
            });
    });

});

const authTokenOwner =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjE4NWFjZjcyNGI2N2MxYTJmYmZkZjllIiwiaXNfb3duZXIiOjAsIm5hbWUiOiJzYW0iLCJlbWFpbF9pZCI6InNhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwiYWRkcmVzc19saW5lXzEiOiIyNDYgeWFtIERyaXZlIiwiY2l0eSI6IkR1YmxpbiIsInN0YXRlIjoiQ2FsaWZvcm5pYSIsImNvdW50cnkiOiJVbml0ZWQgU3RhdGVzIiwiemlwY29kZSI6OTQwODksImZhdm9yaXRlX3Jlc3RhdXJhbnRzIjpbXSwiX192IjowLCJkYXRlX29mX2JpcnRoIjoiMjAyMS0xMS0yMCIsIm5pY2tfbmFtZSI6IlNhbW15IiwicGhvbmVfbnVtIjoyNTYxNzgxOTIxLCJwcm9maWxlX3BpY19maWxlX3BhdGgiOiIifSwiaWF0IjoxNjM2OTU2NTM0fQ.3EH91qy-_WDhcPVps7H-Iz1wvPvZfIRqjOkiquK4h8g";

describe(" Get Restaurant Dishes Testing", () => {
    it("Restaurant does not exist", (done) => {
        agent
            .get("/api/restaurants/6195c8806fe859ada2f5d7bc")
            .set("x-auth-token", authToken)
            .then((res) => {
                done();
            })
            .catch((error) => {
                console.log(error);
                done(e);
            });
    });

    it("Get Restaurant Menu Successful", (done) => {
        agent
            .get("/api/restaurants/6195c8806fe889ada2f5d7bc")
            .set("x-auth-token", authToken)
            .then((res) => {
                expect(res.body).to.have.deep.property("status", "ALL_DISHES");
                done();
            })
            .catch((error) => {
                console.log(error);
                done(e);
            });
    });
});

describe(" Get Customer Orders", () => {
    it("Customer Orders does not exist", (done) => {
        agent
            .get("/api/orders/6196c326f2b5a404e411a7b6")
            .set("x-auth-token", authToken)
            .then((res) => {
                done();
            })
            .catch((error) => {
                console.log(error);
                done(error);
            });
    });

    it("Get Customer Orders Successful", (done) => {
        agent
            .get("/api/orders//6196c323f2b5a404e411a7b6")
            .set("x-auth-token", authToken)
            .then((res) => {
                expect(res.body.orders.length).to.equal(1);
                expect(res.body).to.have.deep.property("status", "CUSTOMER_ORDERS");
                done();
            })
            .catch((error) => {
                console.log(error);
                done(error);
            });
    });
});
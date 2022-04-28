// import { Users } from "streambird-node";
// // import { createNock, streambird } from "../testHelpers";

// // const exampleUser: User = {
// //   userId: "user_27omXGknF0uVnO4fpVLbP6cVM8v",
// //   appId: "0a6aa9d3-2786-461c-950e-c4b9e00c826e",
// //   firstName: "Wayne",
// //   middleName: "Payne",
// //   lastName: "Schmein",
// //   status: "pending",
// //   active: false,
// //   updatedAt: 1649994850,
// //   createdAt: 1649994850,
// //   emails: null,
// //   phoneNumbers: null,
// //   wallets: null,
// //   emailId: "email_27omXJMY3TqFKQrlZLNFDoifWwV",
// //   phoneNumberId: "pn_27omXFBBiC5JC0UFNmA2X5JtGg3",
// //   requiresVerification: true,
// //   email: "wayneps@streambird.io",
// //   phoneNumber: "+15555551000"
// // };

// // const exampleUserJson = {
// //   "user_id": "user_27omXGknF0uVnO4fpVLbP6cVM8v",
// //   "app_id": "0a6aa9d3-2786-461c-950e-c4b9e00c826e",
// //   "first_name": "Wayne",
// //   "middle_name": "Payne",
// //   "last_name": "Schmein",
// //   "status": "pending",
// //   "active": false,
// //   "updated_at": 1649994850,
// //   "created_at": 1649994850,
// //   "emails": null,
// //   "phone_numbers": null,
// //   "wallets": null,
// //   "email_id": "email_27omXJMY3TqFKQrlZLNFDoifWwV",
// //   "phone_number_id": "pn_27omXFBBiC5JC0UFNmA2X5JtGg3",
// //   "requires_verification": true,
// //   "email": "wayneps@streambird.io",
// //   "phone_number": "+15555551000"
// // };

// // it("creates user", async () => {
// //   const nockEx = createNock()
// //     .post("/auth/users/create", {
// //       "requires_verification": true,
// //       "email": "wayneps@streambird.io",
// //       "phone_number": "+15555551000",
// //       "first_name": "Wayne",
// //       "middle_name": "Payne",
// //       "last_name": "Schmein"
// //     })
// //     .reply(201, exampleUserJson);

// //   console.log('nockEx', nockEx);

// //   const user = await streambird.user.create(exampleUser);

// //   console.log('user', user)

// //   expect(user).toEqual(exampleUser);
// // });

// import axios, { AxiosRequestConfig } from "axios";
// import { faker } from "@faker-js/faker";


// const customAxiosAdapter = (config: AxiosRequestConfig): Promise<any> => {
//   return Promise.resolve({
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: {
//       method: config.method,
//       data: config.data && JSON.parse(config.data),
//       path: config.url,
//       params: config.params,
//     }
//   })
// }

// const users = new Users(axios.create({ adapter: customAxiosAdapter }));

// describe("users.create", () => {

//   let firstName = faker.name.firstName();
//   let lastName = faker.name.lastName();
//   let randomEmail = faker.internet.email(firstName, lastName, 'test.streambird.io');

//   console.log('randomEmail', randomEmail)

//   test("success", () => {
//     return expect(
//       users.create({
//         email: randomEmail,
//         requiresVerification: false
//       })
//     ).resolves.toMatchObject({
//       method: "post",
//       path: "auth/users/create"
//     })
//   });
// });

// // describe("users.get", () => {
// //   test("success", () => {
// //     return expect(
// //       users.get("")
// //     ).resolves.toMatchObject({
// //       method: "get",
// //       path: ""
// //     })
// //   })
// // });
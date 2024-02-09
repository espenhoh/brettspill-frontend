import { usernameReducer } from "./Register";

test("alphanum should be valid", () => {
  expect(
    usernameReducer(
      {
        value: "",
        isValid: null,
      },
      { type: "USER_INPUT", val: "fe398fffv" }
    ).isValid
  ).toBe(true);
});
 
test("capital letters in username should be invalid", () => {
  expect(
    usernameReducer(
      {
        value: "",
        isValid: null,
      },
      { type: "USER_INPUT", val: "fe398HHfffv" }
    ).isValid
  ).toBe(false);
});

test("whitespace in username should be invalid", () => {
  expect(
    usernameReducer(
      {
        value: "",
        isValid: null,
      },
      { type: "USER_INPUT", val: "k                  o" }
    ).isValid
  ).toBe(false);
});

test("short usernames should be invalid", () => {
  expect(
    usernameReducer(
      {
        value: "",
        isValid: null,
      },
      { type: "USER_INPUT", val: "g" }
    ).isValid
  ).toBe(false);
});
 
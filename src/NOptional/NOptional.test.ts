import { NOptional } from ".";

describe("NRecord tests", () => {
  test("Хуй", () => {
    const char = NOptional.newBy("Хуй")
      .map((it) => "")
      .orElse("");
  });
});

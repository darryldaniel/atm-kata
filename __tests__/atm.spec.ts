import { Atm } from "../src/atm";

describe("atm", () => {
    it("should be defined", () => {
        // arrange, act
        const sut = new Atm();

        // assert
        expect(sut).toBeDefined();
    });
});

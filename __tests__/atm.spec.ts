import { Atm } from "../src/atm";

describe("atm", () => {
    it("should be defined", () => {
        // arrange, act
        const sut = new Atm();

        // assert
        expect(sut).toBeDefined();
    });
    
    it("should have 5 notes of R100, R50, R20, R10", () => {
        // arrange, act
        const sut = new Atm();

        // assert
        [
            100,
            50,
            20,
            10
        ]
            .forEach(noteValue => expect(sut.notes.filter(n => n.value === noteValue).length).toEqual(5));
    });

    describe("withdraw", () => {
        describe("when asked for a single note", () => {
            it("should dispense that note", () => {
                // arrange
                const withdrawalAmount = 50;
                const sut = new Atm();

                // act
                sut.withdraw(withdrawalAmount);

                // assert
                expect(sut.notes.filter(n => n.value === withdrawalAmount).length).toEqual(4);
            });
        });

        describe("when withdrawal requires multiple notes", () => {
            it("should dispense multiple notes", () => {
                // arrange
                const withdrawalAmount = 70;
                const sut = new Atm();

                // act
                sut.withdraw(withdrawalAmount);

                // assert
                expect(sut.notes.filter(n => n.value === 20).length).toEqual(4);
                expect(sut.notes.filter(n => n.value === 50).length).toEqual(4);
            });
        });

        describe("when the amount cannot be withdrawn with the notes available", () => {
            describe("because the value cannot be fulfilled by the note types available", () => {
                it("should throw an error", () => {
                    // arrange
                    const amountNeeded = 5;
                    const sut = new Atm();

                    // act
                    expect(() => sut.withdraw(amountNeeded))
                        .toThrow();
                });
            });

            describe("because there are not enough notes to fulfil the request", () => {
                it("should throw an error", () => {
                    // arrange
                    const amountNeeded = 1000;
                    const sut = new Atm();

                    // act, assert
                    expect(() => sut.withdraw(amountNeeded))
                        .toThrow();
                });
            });
        });
    });

    describe("getBalance", () => {
        it("should return the total amount left in the atm", () => {
            // arrange
            const sut = new Atm();

            // act
            const result = sut.getBalance();

            // assert
            expect(result).toEqual(900);
        });

        describe("when a withdrawal has been made", () => {
            it("should return the value post withdrawal", () => {
                // arrange
                const withdrawalAmount = 150;
                const sut = new Atm();

                // act
                sut.withdraw(withdrawalAmount);
                const balance = sut.getBalance();

                // assert
                expect(balance).toEqual(750);
            });
        });
    });
});

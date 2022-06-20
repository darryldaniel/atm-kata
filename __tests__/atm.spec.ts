import { Atm } from "../src/atm";
import { BankNoteStore } from "../src/bank-note-store";
import { Denomination } from "../src/denomination";

describe("atm", () => {
    it("should be defined", () => {
        // arrange, act
        const sut = new Atm();

        // assert
        expect(sut).toBeDefined();
    });
    
    it("should have a sorted list of bank note stores with 5 notes of R100, R50, R20, R10", () => {
        // arrange
        const expected = [
            new BankNoteStore(Denomination.OneHundred, 5),
            new BankNoteStore(Denomination.Fifty, 5),
            new BankNoteStore(Denomination.Twenty, 5),
            new BankNoteStore(Denomination.Ten, 5),
        ]

        // act
        const sut = new Atm();

        // assert
        expect(sut.bankNoteStores).toEqual(expected);
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
                const fiftyBankStore = sut.bankNoteStores.find(store => store.denomination === Denomination.Fifty);
                expect(fiftyBankStore?.quantity).toEqual(4)
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
                const fiftyBankStore = sut.bankNoteStores.find(store => store.denomination === Denomination.Fifty);
                expect(fiftyBankStore?.quantity).toEqual(4);
                const twentyBankStore = sut.bankNoteStores.find(store => store.denomination === Denomination.Fifty);
                expect(twentyBankStore?.quantity).toEqual(4);
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

import { BankNoteStore } from "../src/bank-note-store";
import { Denomination } from "../src/denomination";

describe("BankNoteStore", () => {
    describe("reserve", () => {
        it("should not be able to reserve more than the bank notes available", () => {
            // arrange
            const quantity = 5;
            const quantityRequested = 6;
            const sut = create(quantity);

            // act, assert
            expect(() => sut.reserve(quantityRequested))
                .toThrow();
        });
    });
    describe("dispenseBankNotes", () => {
        it("should reduce the quantity of bank notes based on the amount reserved", () => {
            // arrange
            const quantity = 5;
            const quantityRequested = 3;
            const expectedQuantity = 2;
            const sut = create(quantity);
            sut.reserve(quantityRequested);

            // act
            sut.dispense();

            // assert
            expect(sut.quantity).toEqual(expectedQuantity);
            expect(sut.quantityReserved).toEqual(0);
        });
    });
    describe("getTotalValue", () => {
        it("should return the total based on denomination and available quantity", () => {
            // arrange
            const quantity = 5;
            const denomination = Denomination.Fifty;
            const expectedValue = 50 * 5;
            const sut = create(quantity, denomination);

            // act
            const result = sut.getTotalValue();

            // assert
            expect(result).toEqual(expectedValue);
        });
    });
    describe("getNumberOfNotesNeededToSatisfyAmountAndLeftOver", () => {
        describe("when given a value that the bank note store can satisfy with available notes", () => {
            it("should return the amount of notes needed and zero left over", () => {
                // arrange
                const amountNeeded = 100;
                const quantity = 5;
                const denomination = Denomination.Fifty;
                const sut = create(quantity, denomination);

                // act
                const { numberOfNotesNeeded, amountLeftOver } = sut.getNumberOfNotesNeededToSatisfyAmountAndLeftOver(
                    amountNeeded
                );

                // assert
                expect(numberOfNotesNeeded).toEqual(2);
                expect(amountLeftOver).toEqual(0);
            });
        });
        describe("when given an amount the the bank note store can partially satisfy", () => {
            it("should return the amount of notes needed and the balance left over", () => {
                // arrange
                const amountNeeded = 170;
                const quantity = 5;
                const denomination = Denomination.Fifty;
                const sut = create(quantity, denomination);

                // act
                const { numberOfNotesNeeded, amountLeftOver } = sut.getNumberOfNotesNeededToSatisfyAmountAndLeftOver(
                    amountNeeded
                );

                // assert
                expect(numberOfNotesNeeded).toEqual(3);
                expect(amountLeftOver).toEqual(20);
            });
        });
        describe("when the amount cannot be satisfied by the store", () => {
            it("should return zero notes needed and the whole amount left over", () => {
                // arrange
                const amountNeeded = 40;
                const quantity = 5;
                const denomination = Denomination.Fifty;
                const sut = create(quantity, denomination);

                // act
                const { numberOfNotesNeeded, amountLeftOver } = sut.getNumberOfNotesNeededToSatisfyAmountAndLeftOver(
                    amountNeeded
                );

                // assert
                expect(numberOfNotesNeeded).toEqual(0);
                expect(amountLeftOver).toEqual(40);
            });
        });
        describe("CompareByNoteValue", () => {
            describe("when first store note has a higher value than second", () => {
                it("should return -1", () => {
                    // arrange
                    const firstBankStore = create(5, Denomination.OneHundred);
                    const secondBankStore = create(5, Denomination.Fifty);
                
                    // act
                    const result = BankNoteStore.CompareByNoteValue(firstBankStore, secondBankStore);

                    // assert
                    expect(result).toBe(-1);
                });
            });
            describe("when first store note has a lower value than second", () => {
                it("should return 1", () => {
                    // arrange
                    const firstBankStore = create(5, Denomination.Twenty);
                    const secondBankStore = create(5, Denomination.Fifty);

                    // act
                    const result = BankNoteStore.CompareByNoteValue(firstBankStore, secondBankStore);

                    // assert
                    expect(result).toBe(1);
                });
            });
            describe("when first store note has the same value as the second store note", () => {
                it("should return 0", () => {
                    // arrange
                    const firstBankStore = create(5, Denomination.Fifty);
                    const secondBankStore = create(5, Denomination.Fifty);

                    // act
                    const result = BankNoteStore.CompareByNoteValue(firstBankStore, secondBankStore);

                    // assert
                    expect(result).toBe(0);
                });
            });
        });
    });

    function create(
        quantity: number = 5,
        denomination?: Denomination) {
        denomination ??= Denomination.Fifty;
        return new BankNoteStore(denomination, quantity);
    }
});
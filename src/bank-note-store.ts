import { BankNote } from "./bank-note";
import { Denomination } from "./denomination";

export class BankNoteStore {
    private _quantityReserved: number = 0;
    private bankNote: BankNote

    constructor(
        public denomination: Denomination,
        private _quantity: number
    ) {
        this.bankNote = BankNote.Create(denomination);
    }

    reserve(quantityRequested: number) {
        if (quantityRequested > this._quantity) {
            throw new Error("Not enough bank notes available to fulfil request");
        }
        this._quantityReserved = quantityRequested;
    }

    dispense() {
        this._quantity -= this._quantityReserved;
        this._quantityReserved = 0;
    }

    getTotalValue() {
        return this.bankNote.value * this._quantity;
    }

    getNumberOfNotesNeededToSatisfyAmountAndLeftOver(amountNeeded: number): {
        numberOfNotesNeeded: number,
        amountLeftOver: number
    } {
        const numberOfNotesNeeded = Math.floor(
            Math.min(
                amountNeeded / this.bankNote.value,
                this._quantity
            ));
        const amountLeftOver = amountNeeded - (numberOfNotesNeeded * this.bankNote.value);
        return {
            numberOfNotesNeeded,
            amountLeftOver
        }
    }

    get quantity(): number {
        return this._quantity;
    }

    get quantityReserved(): number {
        return this._quantityReserved;
    }

    get noteDisplayName(): string {
        return this.bankNote.displayName;
    }

    static CompareByNoteValue(firstBankStore: BankNoteStore, secondBankStore: BankNoteStore) {
        if (firstBankStore.bankNote.value > secondBankStore.bankNote.value) {
            return -1;
        }
        if (firstBankStore.bankNote.value < secondBankStore.bankNote.value) {
            return 1;
        }
        return 0;
    }
}

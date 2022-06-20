import { BankNoteStore } from "./bank-note-store";
import { Denomination } from "./denomination";

export class Atm {
    public bankNoteStores: BankNoteStore[] = [];
    private _dispenseSummary: string = "";

    constructor() {
        this.populateBankNotes();
    }

    private populateBankNotes() {
        const denominations: number[] = Object.keys(Denomination)
            .map(d => parseInt(d, 10))
            .filter(d => !isNaN(d));
        this.bankNoteStores = denominations
            .map(d => new BankNoteStore(
                    d,
                    5
                ))
            .sort(BankNoteStore.CompareByNoteValue);
    }

    public withdraw(amount: number) {
        this._dispenseSummary = "";
        let currentAmount = amount;
        this.bankNoteStores.forEach(store => {
            const { numberOfNotesNeeded, amountLeftOver } = store
                .getNumberOfNotesNeededToSatisfyAmountAndLeftOver(currentAmount);
            if (numberOfNotesNeeded === 0) {
                return;
            }
            store.reserve(numberOfNotesNeeded);
            currentAmount = amountLeftOver;
        });
        if (currentAmount > 0) {
            throw new Error("Could not fulfill request with notes available");
        }
        this._dispenseSummary = `Dispense summary
---`;
        this.bankNoteStores.forEach(store => {
            if (store.quantityReserved === 0) {
                return;
            }
            this._dispenseSummary = `${ this._dispenseSummary }
${ store.quantityReserved } ${ store.noteDisplayName }'s`;
            store.dispense();
        });
    }

    public getBalance() {
        let balance = 0;
        this.bankNoteStores.forEach(store => balance += store.getTotalValue());
        return balance;
    }

    get dispenseSummary(): string {
        return this._dispenseSummary;
    }
}

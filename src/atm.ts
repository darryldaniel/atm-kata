import { BankNote } from "./bank-note";

export class Atm {
    public notes: BankNote[] = [];

    constructor() {
        this.populateBankNotes();
    }

    private populateBankNotes() {
        for (let i = 0; i < 5; i++) {
            this.notes.push({
                displayName: "R100",
                value: 100
            });
            this.notes.push({
                displayName: "R50",
                value: 50
            });
            this.notes.push({
                displayName: "R20",
                value: 20
            });
            this.notes.push({
                displayName: "R10",
                value: 10
            });
        }
    }

    public withdraw(amount: number) {
        let currentAmount = amount;
        const withdrawalResult = new Map<number, number>()
        const noteValues = [ 100, 50, 20, 10 ];
        let currentNoteValue: number | undefined;
        let numberOfNotesNeeded;
        let notesAvailable;
        while (currentAmount > 0 || noteValues.length > 0) {
            currentNoteValue = noteValues.shift();
            if (!currentNoteValue) {
                break;
            }
            notesAvailable = this.notes.filter(n => n.value === currentNoteValue).length;
            numberOfNotesNeeded = Math.min(
                Math.floor(currentAmount / currentNoteValue),
                notesAvailable
            );
            if (numberOfNotesNeeded > 0) {
                withdrawalResult.set(currentNoteValue, numberOfNotesNeeded);
            }
            currentAmount -= currentNoteValue * numberOfNotesNeeded;
        }
        if (currentAmount > 0) {
            throw new Error("Could not fulfill request with notes available");
        }
        Array.from(withdrawalResult.keys()).forEach(key => {
            const noteType = this.notes.findIndex(n => n.value === key);
            this.notes.splice(noteType, withdrawalResult.get(key));
        });
    }

    public getBalance() {
        let balance = 0;
        this.notes.forEach(n => balance += n.value);
        return balance;
    }
}

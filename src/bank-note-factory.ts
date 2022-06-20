import { Denomination } from "./denomination";
import { BankNote } from "./bank-note";

export function getBankNoteByDenomination(denomination: Denomination): BankNote {
    switch (denomination) {
        case Denomination.OneHundred:
            return {
                displayName: "R100",
                value: 100,
                denomination: Denomination.OneHundred
            };
        case Denomination.Fifty:
            return {
                displayName: "R50",
                value: 50,
                denomination: Denomination.Fifty
            };
        case Denomination.Twenty:
            return {
                displayName: "R20",
                value: 20,
                denomination: Denomination.Twenty
            };
        case Denomination.Ten:
            return {
                displayName: "R10",
                value: 10,
                denomination: Denomination.Ten
            };
        default:
            throw new Error("Not a valid denomination");
    }
}

import { Denomination } from "./denomination";

export class BankNote {
    private constructor(
        public readonly denomination: Denomination,
        public readonly value: number,
        public readonly displayName: string,
    ) {
    }

    static Create(denomination: Denomination): BankNote {
        switch (denomination) {
            case Denomination.OneHundred:
                return new BankNote(
                    denomination,
                    100,
                    "R100"
                );
            case Denomination.Fifty:
                return new BankNote(
                    denomination,
                    50,
                    "R50"
                );
            case Denomination.Twenty:
                return new BankNote(
                    denomination,
                    20,
                    "R20"
                );
            case Denomination.Ten:
                return new BankNote(
                    denomination,
                    10,
                    "R10"
                );
            default:
                throw new Error("Not a valid denomination");
        }
    }
}

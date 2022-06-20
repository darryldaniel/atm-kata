import { prompt } from "inquirer";
import { Atm } from "./atm";

async function ask(question: string): Promise<string> {
    const userInput = await prompt({
        name: "input",
        message: question,
    });
    return userInput.input;
}

async function askWithYesNo(question: string): Promise<boolean> {
    const userInput = (await prompt({
        name: "confirm",
        message: `${ question } (y/n)`,
    }));
    return userInput.confirm.toLowerCase() === "y";
}

async function run() {
    const atm = new Atm();
    let shouldWithdrawMore = true;
    while (shouldWithdrawMore) {
        const result = await ask("How much would you like to withdraw?");
        let withdrawalAmount: number;
        try {
            withdrawalAmount = parseInt(result);
        } catch (e) {
            console.error("Error: amount not a valid number: ", result);
            shouldWithdrawMore = await askWithYesNo("Would you like to try again?");
            continue;
        }
        try {
            atm.withdraw(withdrawalAmount);
            console.log(`Withdrawing ${ withdrawalAmount }...`);
        } catch (e) {
            console.error("Error: cannot dispense this amount - notes not available");
            shouldWithdrawMore = await askWithYesNo("Would you like to try again?");
            continue;
        }
        const balance = atm.getBalance();
        console.log(atm.dispenseSummary);
        console.log("Balance left in ATM: ", balance);
        console.log("Thank you!");
        shouldWithdrawMore = await askWithYesNo("Would you like to withdraw more?");
    }
    process.exit(0);
}

(async () => await run())();

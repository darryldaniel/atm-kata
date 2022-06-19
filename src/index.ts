import { prompt } from "inquirer";
import { Atm } from "./atm";

async function ask(question: string): Promise<string> {
    const userInput = await prompt({
        name: "input",
        message: question,
    });
    return userInput.input;
}

async function run() {
    const atm = new Atm();
    const result = await ask("How much would you like to withdraw?");
    let withdrawalAmount: number;
    try {
        withdrawalAmount = parseInt(result);
    } catch (e) {
        console.error("Error: amount not a valid number: ", result);
        process.exit(1);
    }
    try {
        atm.withdraw(withdrawalAmount);
        console.log(`Withdrawing ${ withdrawalAmount }...`);
    } catch (e) {
        console.error("Error: cannot dispense this amount - notes not available");
        process.exit(1);
    }
    const balance = atm.getBalance();
    console.log("Balance left in ATM: ", balance);
    console.log("Thank you!");
}

(async () => await run())();

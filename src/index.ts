import { prompt } from "inquirer";

async function ask(question: string): Promise<string> {
    const userInput = await prompt({
        name: "input",
        message: question,
    });
    return userInput.input;
}

async function run() {
    const result = await ask("How much would you like to withdraw?");
    let withdrawalAmount: number;
    try {
        withdrawalAmount = parseInt(result);
    } catch (e) {
        console.error("Error: amount not a valid number: ", result);
        process.exit(1);
    }
    try {
        // Todo: Implement withdrawal functionality
        console.log("Withdrawing amount...");
    } catch (e) {
        console.error("Error: cannot dispense this amount - notes not available");
        process.exit(1);
    }
    const balance = 0; // Todo: implement a function to get the balance left - bonus points for listing available notes
    console.log("Balance left in ATM: ", balance);
    console.log("Thank you!");
}

(async () => await run())();

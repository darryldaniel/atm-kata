import { prompt } from "inquirer";

async function ask(question: string): Promise<string> {
    const userInput = await prompt({
        name: "input",
        message: question,
    });
    return userInput.input;
}

function canDispense(amount: number) {
    // Todo: Implement this
    // Hot tip: put this functionality in the main class
    return Math.random() > 0.5;
}

async function run() {
    const result = await ask("How much would you like to withdraw?");
    let withdrawalAmount: number;
    try {
        withdrawalAmount = parseInt(result);
    } catch (e) {
        console.log("Error: amount not a valid number: ", result);
        process.exit(1);
    }
    if (canDispense(withdrawalAmount)) {
        // Todo: Implement withdrawal functionality
        console.log("Withdrawing amount...");
    } else {
        console.log("Error: cannot dispense this amount - notes not available");
        process.exit(1);
    }
    const balance = 0; // Todo: implement a function to get the balance left - bonus points for listing available notes
    console.log("Balance left in ATM: ", balance);
    console.log("Thank you!");
}

(async () => await run())();

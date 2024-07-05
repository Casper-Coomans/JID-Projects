import inquirer from "inquirer";

async function promptPlayerForDirection() {
    const results = await inquirer.prompt({
        type: 'list',
        name: 'direction',
        message: 'What direction do you want to travel?',
        choices: ["Up", "Down", "Left", "Right"],
    }); 
    return results.direction
}

export { promptPlayerForDirection }
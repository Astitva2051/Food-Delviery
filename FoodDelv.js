const prompt = require("prompt-sync")();

let tasks = new Map([
  [1, 0],
  [2, 0],
]); // tasks sotres the executive id and no of tasks assigned to them.
let next_id = 3; // Id of next hired executive.
let executives = 2; // Total no of current executives.

// This function displays no of tasks assigned to executives
function taskDetails() {
  console.log("List of executive with their assigned number of tasks");
  for (const task of tasks.entries()) {
    console.log(`executive ${task[0]} has ${task[1]} tasks`);
  }
}

while (true) {
  let opp = Number(
    prompt(
      "What would you like to do? Type 1(To add a Task) or 2(To complete task) or 3(To exit): "
    )
  );

  if (opp == 1) {
    let ids = [...tasks.keys()]; // creates a array of executive's ids
    let i = ids.length - 1;
    for (i; i >= 0; i--) {
      if (tasks.get(ids[i]) < 10) {
        // assigns task to the latest exec. with less than 10 tasks.
        tasks.set(ids[i], tasks.get(ids[i]) + 1);
        console.log(`executive ${i + 1} is assigned a task`);
        break;
      }
    }
    if (i == -1) {
      if (executives < 10) {
        //  Hires new executive.
        executives += 1;
        tasks.set(next_id, 1);
        console.log(`executive ${next_id} hired`);
        console.log(`executive ${next_id} is assigned a task`);
        next_id += 1;
      } else {
        console.log("Sorry we can't take this task. Try again after some time");
      }
    }
    taskDetails();
  } else if (opp == 2) {
    let executive_id = Number(prompt("Executive's id: "));
    tasks.set(executive_id, tasks.get(executive_id) - 1); // updated the tasks map.
    if (tasks.get(executive_id) == 0) {
      // It releases the executive if he has no remaining task.
      tasks.delete(executive_id);
      console.log(`executive ${executive_id} released`);
      executives -= 1;
    } else {
      console.log(`executive ${executive_id} completed a task`);
    }
    taskDetails();
  } else if (opp == 3) {
    // breaks form the while loop.
    break;
  } else {
    // Checks invalid input.
    console.log("Invalid input. Try again");
  }
}

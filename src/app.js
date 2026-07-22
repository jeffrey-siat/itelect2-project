import { formatDate, validateTask, mergeTaskUpdate, createTask } from './utils.js';
import { fetchSampleUsers } from './api.js';

console.log(formatDate(new Date("2026-07-22")));
console.log(validateTask());
console.log(validateTask({ title: "Finish thesis", dueDate: "2026-08-01" }));
console.log(mergeTaskUpdate({ title: "Old" }, { title: "New" }));

const runGT4 = async () => {
  try {
    const users = await fetchSampleUsers();
    console.log(users);

    const task = createTask({ title: "Finish thesis draft", dueDate: "2026-08-01" });
    console.log(task);
  } catch (err) {
    console.error("Something went wrong:", err.message);
  }
};

runGT4();
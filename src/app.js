import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

console.log(formatDate(new Date("2026-07-22")));
console.log(validateTask());
console.log(validateTask({ title: "Finish thesis", dueDate: "2026-08-01" }));
console.log(mergeTaskUpdate({ title: "Old" }, { title: "New" }));
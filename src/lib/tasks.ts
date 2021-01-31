export async function getAllEverydayTasks() {
  const everydayTasks = await fetch('../data/everyday.json');
  return everydayTasks;
}
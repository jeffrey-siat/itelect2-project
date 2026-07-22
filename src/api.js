export const fetchSampleUsers = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    return users.map(({ id, name, email }) => ({ id, name, email }));
  } catch (err) {
    console.error(err.message);
    return [];
  } finally {
    console.log("fetchSampleUsers finished.");
  }
};

export const fetchSampleUsersPromise = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((users) => users.map(({ id, name, email }) => ({ id, name, email })))
    .catch((err) => {
      console.error(err.message);
      return [];
    });
};
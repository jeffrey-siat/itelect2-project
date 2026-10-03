export default function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "Email is already registered." });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message });
}
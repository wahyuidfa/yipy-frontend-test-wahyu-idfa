// pages/api/login.js
import jwt from "jsonwebtoken";

const secretKey = "123456";

const registeredUsers = [
  { username: "wahyu", password: "password1" },
  { username: "idfa", password: "password2" },
  // ... tambahkan akun pengguna lainnya
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;
  const user = registeredUsers.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, secretKey, { expiresIn: "3h" });

  res.status(200).json({ token });
}

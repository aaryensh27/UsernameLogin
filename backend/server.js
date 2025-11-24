import express from "express";
import { config } from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: "./config/.env" });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET"],
    credentials: true
}));

app.get("/api/users", (req, res) => {
    const filePath = path.join(__dirname, "contact.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        const lines = data.trim().split("\n");
        const users = lines.map(line => {
            const pairs = line.split(";");
            let obj = {};

            pairs.forEach(p => {
                const trimmed = p.trim();
                if (!trimmed) return;

                // split on the first colon :
                const idx = trimmed.indexOf(":");
                if (idx === -1) return;

                const key = trimmed.slice(0, idx).trim();
                const value = trimmed.slice(idx + 1).trim();

                if (key) obj[key] = value;
            });

            return obj;
        });

        res.json(users);
    });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

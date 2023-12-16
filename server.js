import express from "express";
import mysql from "mysql";
import cors from "cors";
//npm i express mysql cors axios
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "comandos",
});

app.get("/comandos", (req, res) => {
  const q = "SELECT * FROM comandos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/comandos", (req, res) => {
  const q = "INSERT INTO comandos(`desc`, `command`, `cover`) VALUES (?)";

  const values = [req.body.desc, req.body.command, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/comandos/:id", (req, res) => {
    const commid = req.params.id;
    const q = " DELETE FROM comandos WHERE id = ? ";
  
    db.query(q, [commid], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    }); 
  });

  app.put("/comandos/:id", (req, res) => {
    const commId = req.params.id;
    const q = "UPDATE comandos SET `desc`= ?, `command`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.desc,
      req.body.command,
      req.body.cover,
    ];
  
    db.query(q, [...values,commId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
  console.log("Backend is working");
});

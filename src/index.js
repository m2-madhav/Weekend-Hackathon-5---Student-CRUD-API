const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

const studentArray = require("./initialData");
const arrayLength = studentArray.length;

app.get("/api/student", (req, res) => {
  res.send(studentArray);
});

app.get("/api/student/:id", (req, res) => {
  const id = req.params.id;

  const studentArrIndex = studentArray.findIndex(
    (el) => el.id === parseInt(id)
  );
  if (studentArrIndex === -1) {
    res.status(404).send(`Student with id ${id} not found`);
    return;
  }
  res.send(studentArray[studentArrIndex]);
});

app.post("/api/student", (req, res) => {
  const requestBody = req.body;
  if (!requestBody.name || !requestBody.currentClass || !requestBody.division) {
    res.sendStatus(400);
    return;
  }
  const student = {
    id: arrayLength + 1,
    name: requestBody.name,
    currentClass: parseInt(requestBody.currentClass),
    division: requestBody.division
  };
  studentArray.push(student);
  res.send({ id: student.id });
});

app.put("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  const studentrequestedIndex = studentArray.findIndex(
    (student) => student.id === id
  );

  if (studentrequestedIndex === -1) {
    res.sendStatus(400);
    return;
  }
  const requestBody = req.body;

  const reqestStudentDetail = studentArray[studentrequestedIndex];

  if (requestBody.name) {
    studentArray[studentrequestedIndex].name = requestBody.name;
  }
  if (requestBody.currentClass) {
    studentArray[studentrequestedIndex].currentClass = parseInt(
      requestBody.currentClass
    );
  }
  if (requestBody.division) {
    studentArray[studentrequestedIndex].division = requestBody.division;
  }
  res.send(reqestStudentDetail);
});

app.delete("/api/student/:id", (req, res) => {
  const id = req.params.id;
  const requestedStudentIndex = studentArray.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (requestedStudentIndex === -1) {
    res.sendStatus(404);
    return;
  }
  studentArray.splice(requestedStudentIndex, 1);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;

const defaultStudents = [
  { name: "Sai", branch: "CSE", skills: ["Java", "Web Development"], interest: "Web Projects" },
  { name: "Siva", branch: "AIML", skills: ["Python", "Machine Learning"], interest: "AI Projects" },
  { name: "Sri", branch: "ECE", skills: ["IoT", "Arduino"], interest: "Smart Devices" },
  { name: "Deepu", branch: "IT", skills: ["HTML", "CSS", "JavaScript"], interest: "Frontend Development" },
  { name: "Lalli", branch: "EEE", skills: ["Python", "Robotics"], interest: "Robotics" },
  { name: "Satya", branch: "CSE", skills: ["Java", "SQL"], interest: "App Development" }
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

let students = loadData("skillMatchStudents", defaultStudents);
let teams = loadData("skillMatchTeams", []);

const studentList = document.getElementById("studentList");
const search = document.getElementById("search");
const studentCount = document.getElementById("studentCount");
const memberChoices = document.getElementById("memberChoices");
const teamList = document.getElementById("teamList");
const teamForm = document.getElementById("teamForm");

function saveData() {
  try {
    localStorage.setItem("skillMatchStudents", JSON.stringify(students));
    localStorage.setItem("skillMatchTeams", JSON.stringify(teams));
    return true;
  } catch {
    alert("Browser storage is unavailable. Your changes may not be saved.");
    return false;
  }
}

function displayStudents(list) {
  studentList.innerHTML = "";

  if (list.length === 0) {
    studentList.innerHTML = "<p>No students found.</p>";
  }

  list.forEach(student => {
    const card = document.createElement("div");
    card.className = "student-card";

    const name = document.createElement("h3");
    name.textContent = student.name;

    const branch = document.createElement("p");
    branch.textContent = "Branch: " + student.branch;

    const interest = document.createElement("p");
    interest.textContent = "Interested in: " + student.interest;

    const skills = document.createElement("p");
    skills.textContent = "Skills: " + student.skills.join(", ");

    card.append(name, branch, interest, skills);
    studentList.appendChild(card);
  });

  studentCount.textContent = students.length;
}

function displayMemberChoices() {
  memberChoices.innerHTML = "";

  students.forEach((student, index) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.name = "teamMember";
    checkbox.value = index;

    const text = document.createElement("span");
    text.textContent =
      student.name + " (" + student.branch + ") — " +
      student.skills.join(", ");

    label.append(checkbox, text);
    memberChoices.appendChild(label);
  });
}

function displayTeams() {
  teamList.innerHTML = "";

  if (teams.length === 0) {
    teamList.innerHTML = "<p>No teams yet. Create your first team!</p>";
    return;
  }

  teams.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";

    const heading = document.createElement("h3");
    heading.textContent = team.name;

    const project = document.createElement("p");
    project.textContent = "Project: " + team.project;

    const members = document.createElement("p");
    members.textContent = "Members: " + team.members.join(", ");

    const count = document.createElement("p");
    count.textContent = "Team size: " + team.members.length;

    card.append(heading, project, members, count);
    teamList.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(keyword) ||
    student.branch.toLowerCase().includes(keyword) ||
    student.skills.some(skill => skill.toLowerCase().includes(keyword)) ||
    student.interest.toLowerCase().includes(keyword)
  );

  displayStudents(filtered);
});

document.getElementById("profileForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const branch = document.getElementById("branch").value;
  const skills = document.getElementById("skills").value
    .split(",")
    .map(skill => skill.trim())
    .filter(Boolean);

  if (!name || !branch || skills.length === 0) {
    alert("Please fill in all details.");
    return;
  }

  students.unshift({
    name,
    branch,
    skills,
    interest: "Student Projects"
  });

  saveData();
  displayStudents(students);
  displayMemberChoices();
  document.getElementById("profileForm").reset();

  alert("Profile added successfully!");
  document.getElementById("students").scrollIntoView({ behavior: "smooth" });
});

teamForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("teamName").value.trim();
  const project = document.getElementById("projectName").value.trim();

  const selectedIndexes = Array.from(
    memberChoices.querySelectorAll('input[name="teamMember"]:checked')
  ).map(input => Number(input.value));

  if (!name || !project) {
    alert("Please enter a team name and project name.");
    return;
  }

  if (selectedIndexes.length === 0) {
    alert("Please select at least one team member.");
    return;
  }

  const members = selectedIndexes.map(index => students[index].name);

  teams.unshift({
    name,
    project,
    members
  });

  if (!saveData()) {
    teams.shift();
    return;
  }

  displayTeams();
  teamForm.reset();

  alert("Team created successfully!");
  document.querySelector(".teams-dashboard").scrollIntoView({
    behavior: "smooth"
  });
});

displayStudents(students);
displayMemberChoices();
displayTeams();

const students = [
  {
    name: "Sai",
    branch: "CSE",
    skills: ["Java", "Web Development"],
    interest: "Web Projects"
  },
  {
    name: "Siva",
    branch: "AIML",
    skills: ["Python", "Machine Learning"],
    interest: "AI Projects"
  },
  {
    name: "Sri",
    branch: "ECE",
    skills: ["IoT", "Arduino"],
    interest: "Smart Devices"
  },
  {
    name: "Deepu",
    branch: "IT",
    skills: ["HTML", "CSS", "JavaScript"],
    interest: "Frontend Development"
  },
  {
    name: "Lalli",
    branch: "EEE",
    skills: ["Python", "Robotics"],
    interest: "Robotics"
  },
  {
    name: "Satya",
    branch: "CSE",
    skills: ["Java", "SQL"],
    interest: "App Development"
  }
];

const studentList = document.getElementById("studentList");
const search = document.getElementById("search");
const studentCount = document.getElementById("studentCount");

function displayStudents(list) {
  studentList.innerHTML = "";

  if (list.length === 0) {
    studentList.innerHTML =
      "<p>No students found. Try another search.</p>";
    return;
  }

  list.forEach(student => {
    const card = document.createElement("div");
    card.className = "student-card";

    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>Branch: ${student.branch}</p>
      <p>Interested in: ${student.interest}</p>
      <div>
        ${student.skills.map(skill =>
          `<span class="skill">${skill}</span>`
        ).join("")}
      </div>
    `;

    studentList.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(keyword) ||
    student.branch.toLowerCase().includes(keyword) ||
    student.skills.some(skill =>
      skill.toLowerCase().includes(keyword)
    ) ||
    student.interest.toLowerCase().includes(keyword)
  );

  displayStudents(filteredStudents);
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
    alert("Please fill in all the details.");
    return;
  }

  students.unshift({
    name: name,
    branch: branch,
    skills: skills,
    interest: "Student Projects"
  });

  studentCount.textContent = students.length;
  displayStudents(students);

  document.getElementById("profileForm").reset();

  alert("Your profile has been added successfully!");

  document.getElementById("students").scrollIntoView({
    behavior: "smooth"
  });
});

studentCount.textContent = students.length;
displayStudents(students);

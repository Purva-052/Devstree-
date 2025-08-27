if (!localStorage.getItem("students")) {
  localStorage.setItem("students", JSON.stringify(students));
}


function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function calcScores(student){
    const totalScore=student.academics.subjects.reduce((sum,sub)=>sum + sub.score,0);
    const avgScore= (totalScore/student.academics.subjects.length).toFixed(2);
    const attendancePercent=((student.attendance.presentDays/student.attendance.totalAcademicDays)*100).toFixed(2);
    return{avgScore,attendancePercent}; 

  }
function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}


function openModal(section){
  document.getElementById("studentModal").style.display="flex";
  document.getElementById("viewSection").classList.add("hidden")
  document.getElementById("section").classList.remove("hidden");
}

let currentEditId = null;

function openViewModal() {
  document.getElementById("viewModal").style.display = "flex";
}

function closeViewModal(){
  document.getElementById("viewModal").style.display="none";
}
function openeditModal(id){
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(s => s.id === id);
  if (!student) return;

  currentEditId = id;

  document.getElementById("editName").value = student.personal.name;
  document.getElementById("editAge").value = student.personal.age;
  document.getElementById("editGender").value = student.personal.gender;
  document.getElementById("editEmail").value = student.personal.contact.email;
  document.getElementById("editPhone").value = student.personal.contact.phone;
  document.getElementById("editAddress").value = `${student.personal.address.city}, ${student.personal.address.state}`;
  document.getElementById("editGrades").value = student.academics.subjects.map(sub => sub.score).join(",");
  document.getElementById("editAttendance").value = student.attendance.presentDays;
  document.getElementById("editModal").style.display = "flex";
}

document.getElementById("updateStudent").addEventListener("click", () => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(s => s.id === currentEditId);
  if (!student) return;

  student.personal.name = document.getElementById("editName").value;
  student.personal.age = parseInt(document.getElementById("editAge").value);
  student.personal.gender = document.getElementById("editGender").value;
  student.personal.contact.email = document.getElementById("editEmail").value;
  student.personal.contact.phone = document.getElementById("editPhone").value;

  const [city, state] = document.getElementById("editAddress").value.split(",");
  student.personal.address.city = city.trim();
  student.personal.address.state = state.trim();

  const grades = document.getElementById("editGrades").value.split(",").map(Number);
  student.academics.subjects.forEach((sub, i) => sub.score = grades[i] || sub.score);

  student.attendance.presentDays = parseInt(document.getElementById("editAttendance").value);

  localStorage.setItem("students", JSON.stringify(students));

  closeeditModal();
  renderTable();
});

function closeeditModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditId = null;
}


function viewStudent(id){
  const students = getStudents(); 
    const student=students.find(student=>student.id==id);
    const{avgScore,attendancePercent}=calcScores(student);
    const details=
    (`Student details:\nName:${student.personal.name}
    \nAge:${student.personal.age}
    \nGender:${student.personal.gender}
    \nEmail:${student.personal.contact.email}
    \nPhone:${student.personal.contact.phone}
    \nAddress:${student.personal.address.city}, ${student.personal.address.state}
    \nGrade:${avgScore}\nAttendance:${attendancePercent}%`)
     document.getElementById("studentDetails").innerText = details;
    openViewModal()
};

function deleteStudent(id){
  if(!confirm("Are you sure you want to delete this student?"))
    return;
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students= students.filter(student => student.id !== id);
      localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function openModal() {
      document.getElementById("studentModal").style.display = "flex";
    }

   
    function closeModal() {
      document.getElementById("studentModal").style.display = "none";
    }

   
  function saveStudent() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  const grades = document.getElementById("grades").value.split(",").map(Number);

  function getNextId() {
  let lastId = localStorage.getItem("lastId");
  if (!lastId) {
    lastId = 0;
  }
  let newId = parseInt(lastId) + 1;
  localStorage.setItem("lastId", newId);
  return newId;
  }
  const student = {
    id: getNextId(),
    personal: {
      name: document.getElementById("Name").value,
      age: parseInt(document.getElementById("Age").value),
      gender: document.getElementById("Gender").value,
      contact: {
        email: document.getElementById("Email").value,
        phone: document.getElementById("Phone").value
      },
      address: {
        city: document.getElementById("Address").value,
        state: "" 
      }
    },
    academics: {
      total_subject_scores: grades.length * 100, 
      subjects: grades.map((score, i) => ({
        subjectId: `Sub${i + 1}`,
        score,
        total: 100
      }))
    },
    attendance: {
      totalAcademicDays: 120, 
      presentDays: parseInt(document.getElementById("attendance").value)
    }
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  closeModal(); 

 
  document.getElementById("attendanceFilter").value = "";
  document.getElementById("scoreFilter").value = "";
  document.getElementById("searchInput").value = "";

  renderTable();  
  }

document.getElementById("attendanceFilter").addEventListener("change", function () {
  const filterValue = this.value; 
  let students=getStudents();

 
  if (filterValue === "") {
    renderTable(students);
    return;
  }

  
  const filteredStudents = students.filter(student => {
    const attendancePercent = (student.attendance.presentDays / student.attendance.totalAcademicDays) * 100;
    return attendancePercent < parseInt(filterValue); 
  });

  renderTable(filteredStudents);
});

document.getElementById("scoreFilter").addEventListener("change", function () {
  const value = this.value;
  const students = getStudents();

  if (value) {
    let filtered;
    if (value === "32") {
      // Special case: Below 33%
      filtered = students.filter(student => {
        const { avgScore } = calcScores(student);
        return avgScore < 33;
      });
    } else {
      // Above X%
      filtered = students.filter(student => {
        const { avgScore } = calcScores(student);
        return avgScore >= parseInt(value);
      });
    }
    renderTable(filtered);
  } else {
    renderTable(); 
  }
});
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const students = getStudents();

  if (query) {
    const filtered = students.filter(student => {
      return (
        student.id.toString().includes(query) || 
        student.personal.name.toLowerCase().includes(query) 
      );
    });
    renderTable(filtered);
  } else {
    renderTable(); 
  }
});

function renderTable(studentsList = null) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // clear old rows

  const students = studentsList || getStudents();

  if (students.length === 0) {
    let noDataRow = document.createElement("tr");
    let noDataCell = document.createElement("td");
    noDataCell.colSpan = 10; // match your table's column count
    noDataCell.textContent = "No Data Available";
    noDataCell.style.textAlign = "center";
    noDataCell.style.fontWeight = "bold";
    noDataCell.style.backgroundColor = "#f9f9f9";
    noDataRow.appendChild(noDataCell);
    tbody.appendChild(noDataRow);
    return; // stop here if no data
  }

  students.forEach(student => {
    const { avgScore, attendancePercent } = calcScores(student);

    const row = `
      <tr>
        <td>${student.id}</td>
        <td>${student.personal.name}</td>
        <td>${student.personal.age}</td>
        <td>${student.personal.gender}</td>
        <td>${student.personal.contact.email}</td>
        <td>${student.personal.contact.phone}</td>
        <td>${student.personal.address.city}, ${student.personal.address.state}</td>
        <td>${avgScore}</td>
        <td>${attendancePercent}%</td>
        <td class="actions">
          <button class="view" onclick="viewStudent(${student.id})">View</button>
          <button class="edit" onclick="openeditModal(${student.id})">Edit</button>
          <button class="edit" onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
renderTable();
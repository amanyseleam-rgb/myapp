function openAttendance() {
    window.location.href = "attendance.html";
}

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayAttendanceStudents() {
    const table = document.getElementById("studentsTable");

    if (!table) return;

    table.innerHTML = "";

    students.forEach(function(student, index) {
        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + (index + 1) + "</td>" +
            "<td>" + student + "</td>" +
            '<td class="status">لم يتم التسجيل</td>' +
            "<td>" +
            '<button class="present-btn" onclick="markPresent(this)">حاضر</button>' +
            '<button class="absent-btn" onclick="markAbsent(this)">غائب</button>' +
            "</td>";

        table.appendChild(row);
    });

    updateStats();
}

function markPresent(button) {
    const row = button.closest("tr");
    const statusCell = row.querySelector(".status");

    row.style.backgroundColor = "#e8f5e9";
    statusCell.textContent = "حاضر";
    statusCell.style.color = "#16a34a";

    updateStats();
}

function markAbsent(button) {
    const row = button.closest("tr");
    const statusCell = row.querySelector(".status");

    row.style.backgroundColor = "#ffebee";
    statusCell.textContent = "غائب";
    statusCell.style.color = "#dc2626";

    updateStats();
}

function updateStats() {
    const rows = document.querySelectorAll("#studentsTable tr");

    let present = 0;
    let absent = 0;
    let pending = 0;

    rows.forEach(function(row) {
        const status = row.querySelector(".status");

        if (!status) return;

        if (status.textContent.trim() === "حاضر") {
            present++;
        } else if (status.textContent.trim() === "غائب") {
            absent++;
        } else {
            pending++;
        }
    });

    document.getElementById("totalCount").textContent = rows.length;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("pendingCount").textContent = pending;
}

function saveAttendance() {
    const date = document.getElementById("date").value;

    if (!date) {
        alert("من فضلك اختاري تاريخ الرصد أولاً");
        return;
    }

    const rows = document.querySelectorAll("#studentsTable tr");
    const attendanceData = [];

    rows.forEach(function(row) {
        const name = row.cells[1].textContent.trim();
        const status = row.querySelector(".status").textContent.trim();

        attendanceData.push({
            name: name,
            status: status
        });
    });

    localStorage.setItem(
        "attendance_" + date,
        JSON.stringify(attendanceData)
    );

    alert("تم حفظ رصد يوم " + date + " بنجاح");
}

function loadAttendance() {
    const date = document.getElementById("date").value;

    if (!date) return;

    const savedData = localStorage.getItem("attendance_" + date);

    if (!savedData) {
        const rows = document.querySelectorAll("#studentsTable tr");

        rows.forEach(function(row) {
            row.style.backgroundColor = "";

            const statusCell = row.querySelector(".status");
            statusCell.textContent = "لم يتم التسجيل";
            statusCell.style.color = "";
        });

        updateStats();
        return;
    }

    const attendanceData = JSON.parse(savedData);
    const rows = document.querySelectorAll("#studentsTable tr");

    rows.forEach(function(row) {
        const name = row.cells[1].textContent.trim();
        const statusCell = row.querySelector(".status");

        const student = attendanceData.find(function(item) {
            return item.name === name;
        });

        if (!student) return;

        statusCell.textContent = student.status;

        if (student.status === "حاضر") {
            row.style.backgroundColor = "#e8f5e9";
            statusCell.style.color = "#16a34a";
        } else if (student.status === "غائب") {
            row.style.backgroundColor = "#ffebee";
            statusCell.style.color = "#dc2626";
        }
    });

    updateStats();
}

const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const searchText = this.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#studentsTable tr");

        rows.forEach(function(row) {
            const studentName = row.cells[1].textContent
                .trim()
                .toLowerCase();

            if (studentName.includes(searchText)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}

const dateInput = document.getElementById("date");

if (dateInput) {
    dateInput.addEventListener("change", function() {
        loadAttendance();
    });
}

if (document.getElementById("studentsTable")) {
    displayAttendanceStudents();
}
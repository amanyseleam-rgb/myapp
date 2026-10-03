function loadReports() {

    const reportTable = document.getElementById("reportsTable");

    if (!reportTable) return;

    reportTable.innerHTML = "";

    const students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach(function(student, index) {

        let present = 0;
        let absent = 0;

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            if (!key.startsWith("attendance_")) {
                continue;
            }

            const savedData = JSON.parse(
                localStorage.getItem(key)
            );

            const record = savedData.find(function(item) {
                return item.name === student;
            });

            if (record) {

                if (record.status === "حاضر") {
                    present++;
                }

                if (record.status === "غائب") {
                    absent++;
                }
            }
        }

        const total = present + absent;

        let percentage = 0;

        if (total > 0) {
            percentage = Math.round((present / total) * 100);
        }

        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + (index + 1) + "</td>" +
            "<td>" + student + "</td>" +
            '<td class="report-present">' + present + "</td>" +
            '<td class="report-absent">' + absent + "</td>" +
            "<td>" + total + "</td>" +
            "<td>" + percentage + "%</td>";

        reportTable.appendChild(row);
    });
}


loadReports();


const reportSearch = document.getElementById("reportSearch");

if (reportSearch) {

    reportSearch.addEventListener("input", function() {

        const searchText =
            this.value.trim().toLowerCase();

        const rows =
            document.querySelectorAll("#reportsTable tr");

        rows.forEach(function(row) {

            const studentName =
                row.cells[1].textContent
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
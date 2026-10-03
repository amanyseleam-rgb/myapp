function loadStatistics() {

    const students =
        JSON.parse(localStorage.getItem("students")) || [];

    let totalPresent = 0;
    let totalAbsent = 0;

    const statisticsTable =
        document.getElementById("statisticsTable");

    statisticsTable.innerHTML = "";

    students.forEach(function(student, index) {

        let present = 0;
        let absent = 0;

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            if (!key.startsWith("attendance_")) {
                continue;
            }

            const savedData =
                JSON.parse(localStorage.getItem(key));

            const record = savedData.find(function(item) {
                return item.name === student;
            });

            if (record) {

                if (record.status === "حاضر") {
                    present++;
                    totalPresent++;
                }

                if (record.status === "غائب") {
                    absent++;
                    totalAbsent++;
                }
            }
        }

        const totalDays = present + absent;

        let percentage = 0;

        if (totalDays > 0) {
            percentage =
                Math.round((present / totalDays) * 100);
        }

        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + (index + 1) + "</td>" +
            "<td>" + student + "</td>" +
            '<td class="report-present">' +
            present +
            "</td>" +
            '<td class="report-absent">' +
            absent +
            "</td>" +
            "<td>" +
            totalDays +
            "</td>" +
            "<td>" +
            percentage +
            "%</td>";

        statisticsTable.appendChild(row);
    });

    const totalStudents = students.length;

    const totalRecords =
        totalPresent + totalAbsent;

    let overallPercentage = 0;

    if (totalRecords > 0) {
        overallPercentage =
            Math.round(
                (totalPresent / totalRecords) * 100
            );
    }

    document.getElementById(
        "statisticsTotal"
    ).textContent = totalStudents;

    document.getElementById(
        "statisticsPresent"
    ).textContent = totalPresent;

    document.getElementById(
        "statisticsAbsent"
    ).textContent = totalAbsent;

    document.getElementById(
        "statisticsPercentage"
    ).textContent = overallPercentage + "%";
}


loadStatistics();


const searchInput =
    document.getElementById("statisticsSearch");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                this.value.trim().toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#statisticsTable tr"
                );

            rows.forEach(function(row) {

                const studentName =
                    row.cells[1].textContent
                        .trim()
                        .toLowerCase();

                if (
                    studentName.includes(searchText)
                ) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        }
    );
}
function updateChart() {

    const present =
        parseInt(
            document.getElementById("statisticsPresent").textContent
        ) || 0;

    const absent =
        parseInt(
            document.getElementById("statisticsAbsent").textContent
        ) || 0;

    const total = present + absent;

    let presentWidth = 0;
    let absentWidth = 0;

    if (total > 0) {
        presentWidth = (present / total) * 100;
        absentWidth = (absent / total) * 100;
    }

    document.getElementById("chartPresent").textContent =
        present;

    document.getElementById("chartAbsent").textContent =
        absent;

    document.getElementById("presentBar").style.width =
        presentWidth + "%";

    document.getElementById("absentBar").style.width =
        absentWidth + "%";
}

updateChart();
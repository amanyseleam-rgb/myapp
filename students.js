const defaultStudents = [
    "اسراء محمد عبدالله على السيد",
    "ايثار طارق احمد محمد محمد يحيى",
    "بسمله أسامه أحمد عبد الوهاب حامد الشربينى",
    "جنى شريف جوده محمد محمد الخواص",
    "جودى احمد جلال على احمد",
    "جولى ريمون رتيب سيدين بشاى",
    "حبيبه احمد خليل عبد العظيم هلال السيسى",
    "حبيبه السيد مصطفى عماره حبيب",
    "رودينا احمد الشحات احمد مصطفى حجازى",
    "مريم عبد القوى ماهر عبد القوى عامر سليمان",
    "مريم ياسر عزت السيد محمد عبد الخالق",
    "ملك حاتم عبد الله العبد نوفل",
    "ملك محسن السيد احمد محمد حطبه",
    "ملك محمد ابراهيم محمد ابراهيم حسن",
    "ملك محمد مصطفى عبد النبى حسن",
    "منة ابراهيم يحيى على عبد الحافظ أحمد",
    "منى محمد الحسينى احمد احمد البدرى",
    "نور عماد حمدى عطيه بحيرى",
    "نورهان محمد محمد السعيد محمد عامر",
    "هنا نور محمد نور الدين محمد عبد المنعم كذالك",
    "ياسمين شفيق عبدربه شفيق السيد"
];

let students = JSON.parse(
    localStorage.getItem("students")
) || defaultStudents;

function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function displayStudents(list = students) {

    const table = document.getElementById("studentsList");

    table.innerHTML = "";

    list.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${student}</td>

            <td>
                <button class="edit-btn"
                    onclick="editStudent(${index})">
                    ✏️ تعديل
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${index})">
                    🗑️ حذف
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

function addStudent() {

    const input = document.getElementById("studentName");

    const name = input.value.trim();

    if (name === "") {
        alert("من فضلك اكتبي اسم الطالب");
        return;
    }

    students.push(name);

    saveStudents();

    input.value = "";

    displayStudents();
}

function editStudent(index) {

    const newName = prompt(
        "عدلي اسم الطالب:",
        students[index]
    );

    if (newName === null) {
        return;
    }

    if (newName.trim() === "") {
        alert("اسم الطالب لا يمكن أن يكون فارغًا");
        return;
    }

    students[index] = newName.trim();

    saveStudents();

    displayStudents();
}

function deleteStudent(index) {

    const confirmDelete = confirm(
        "هل أنتِ متأكدة من حذف الطالب؟"
    );

    if (!confirmDelete) {
        return;
    }

    students.splice(index, 1);

    saveStudents();

    displayStudents();
}

document
    .getElementById("studentSearch")
    .addEventListener("input", function() {

        const searchText =
            this.value.trim().toLowerCase();

        const filteredStudents = students.filter(
            function(student) {
                return student
                    .toLowerCase()
                    .includes(searchText);
            }
        );

        displayStudents(filteredStudents);
    });

displayStudents();
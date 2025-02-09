document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');
    const students = [];

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const student = { name, age, gender, email, phone };
        students.push(student);

        addStudentToTable(student);
        studentForm.reset();
    });

    function addStudentToTable(student) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender === 'male' ? '男' : '女'}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td><button onclick="deleteStudent(this)">删除</button></td>
        `;
        studentTableBody.appendChild(row);
    }

    window.deleteStudent = (button) => {
        const row = button.parentElement.parentElement;
        studentTableBody.removeChild(row);
    };
});

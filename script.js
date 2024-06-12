document.addEventListener('DOMContentLoaded', function() {
    const registration = document.getElementById('registration');
    const name = document.getElementById('name');
    const course = document.getElementById('course');
    const grades = [
        document.getElementById('grade1'),
        document.getElementById('grade2'),
        document.getElementById('grade3'),
        document.getElementById('grade4'),
        document.getElementById('grade5')
    ];

    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalButton = document.querySelector('.close');

    function validateRegistration() {
        const errorSpan = registration.nextElementSibling;
        if (registration.value.trim() === '') {
            errorSpan.textContent = 'Por favor, insira o número de matrícula.';
        } else {
            errorSpan.textContent = '';
        }
    }

    function validateName() {
        const errorSpan = name.nextElementSibling;
        if (name.value.trim() === '') {
            errorSpan.textContent = 'Por favor, insira o nome do aluno.';
        } else if (name.value.trim().length < 5) {
            errorSpan.textContent = 'O nome deve ter no mínimo 5 caracteres.';
        } else {
            errorSpan.textContent = '';
        }
    }

    function validateCourse() {
        const errorSpan = course.nextElementSibling;
        if (course.value === '') {
            errorSpan.textContent = 'Por favor, selecione um curso.';
        } else {
            errorSpan.textContent = '';
        }
    }

    function validateGrade(gradeInput, index) {
        const errorSpan = gradeInput.nextElementSibling;
        const gradeValue = parseFloat(gradeInput.value);
        if (gradeInput.value.trim() === '') {
            errorSpan.textContent = `Por favor, insira a nota EA${index + 1}.`;
        } else if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
            errorSpan.textContent = 'As notas devem estar entre 0 e 100.';
        } else {
            errorSpan.textContent = '';
        }
    }

    function calculateAverage() {
        let total = 0;
        grades.forEach(grade => {
            total += parseFloat(grade.value);
        });
        return (total / grades.length).toFixed(2);
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    registration.addEventListener('blur', validateRegistration);
    name.addEventListener('blur', validateName);
    course.addEventListener('blur', validateCourse);
    grades.forEach((grade, index) => {
        grade.addEventListener('blur', () => validateGrade(grade, index));
    });

    document.getElementById('gradeForm').addEventListener('submit', function(event) {
        validateRegistration();
        validateName();
        validateCourse();
        grades.forEach((grade, index) => validateGrade(grade, index));

        const errors = document.querySelectorAll('.error');
        for (let error of errors) {
            if (error.textContent !== '') {
                event.preventDefault();
                return;
            }
        }

        // If form is valid, calculate the average and show the modal
        const average = calculateAverage();
        const studentName = name.value;
        const courseName = course.options[course.selectedIndex].text;

        showModal(`Notas cadastradas com sucesso!\nA média do aluno ${studentName} é ${average}, no curso de ${courseName}.`);
        event.preventDefault();
    });

    // Close modal when the user clicks on <span> (x)
    closeModalButton.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const feedback = document.querySelector('.feedback');
        const nextButton = document.getElementById('next-button');

        if (isCorrect) {
            feedback.textContent = "ถูกต้อง! ไปหน้าถัดไป!";
            feedback.style.color = "green";
            nextButton.style.display = "block"; // แสดงปุ่ม Next
        } else {
            feedback.textContent = "แย่จัง! พี่หมีใช้สิ่งนี้ข้ามไปไม่ได้ ช่วยเลือกอีกครั้งนะ!";
            feedback.style.color = "red";
            nextButton.style.display = "none"; // ซ่อนปุ่ม Next
        }
    });
});

// เมื่อคลิกปุ่ม Next ให้เปลี่ยนหน้า
document.getElementById('next-button').addEventListener('click', () => {
    window.location.href = "NextSP012.html";
});

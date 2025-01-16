document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const feedback = document.querySelector('.feedback');
        const nextButton = document.getElementById('next-button');

        // แสดงข้อความตอบกลับและเปลี่ยนพื้นหลัง
        if (isCorrect) {
            feedback.textContent = "ถูกต้อง! ไปหน้าถัดไป!";
            feedback.style.color = "green";
            nextButton.style.display = "block"; // แสดงปุ่ม Next
            // เช็คว่ากำลังอยู่ในหน้าพี่หมี, พี่สิงโต, หรือหน้าที่ 3
        }
    });
});



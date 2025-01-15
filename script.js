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
            if (window.location.pathname.includes('SolveProblems1')) {
                document.body.style.backgroundImage = "url('background/SolveProblems1.png')";
            } else if (window.location.pathname.includes('SolveProblems2')) {
                document.body.style.backgroundImage = "url('background/SolveProblems2.png')";
            } else if (window.location.pathname.includes('SolveProblems3')) {
                document.body.style.backgroundImage = "url('background/SolveProblems3.png')";
            }
        } else {
            feedback.textContent = "แย่จัง! ช่วยเลือกอีกครั้งนะ!";
            feedback.style.color = "red";
            nextButton.style.display = "none"; // ซ่อนปุ่ม Next
            // ใช้พื้นหลังที่ต้องการเมื่อไม่ถูกต้อง
            document.body.style.backgroundImage = "url('background/SolveProblems1.png')";
        }
    });
});

document.getElementById('next-button').addEventListener('click', () => {
    window.location.href = "NextSP012.html";  // ลิงก์ไปที่หน้าถัดไป
});

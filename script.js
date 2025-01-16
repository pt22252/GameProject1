document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const feedback = document.querySelector('.feedback');
        const nextButton = document.getElementById('next-button');
        const currentUrl = window.location.pathname; // ตรวจสอบ URL ปัจจุบัน

        // แสดงข้อความตอบกลับและควบคุมปุ่ม Next
        if (isCorrect) {
            // ตรวจสอบว่าอยู่ในหน้าไหน
            if (currentUrl.includes('SolveProblem3.html')) {
                feedback.textContent = "ยินดีด้วย! หนูๆ เก่งมาก!";
            } else {
                feedback.textContent = "ยินดีด้วย! ไปหน้าถัดไป!";
            }
            feedback.style.color = "green";
            nextButton.style.display = "block"; // แสดงปุ่ม Next
        } else {
            feedback.textContent = "แย่จัง! ช่วยเลือกอีกครั้งนะ!";
            feedback.style.color = "red";
            nextButton.style.display = "none"; // ซ่อนปุ่ม Next

            // รีเซ็ตหน้าเมื่อเลือกผิด
            setTimeout(() => {
                location.reload(); // รีโหลดหน้าปัจจุบัน
            }, 1500); // ดีเลย์ 1 วินาทีเพื่อให้ข้อความ "แย่จัง!" แสดงก่อน
        }
    });
});

/// เมื่อผู้ใช้คลิกปุ่ม Next ให้เปลี่ยนเส้นทางไปยังหน้าใหม่
document.getElementById('next-button').addEventListener('click', () => {
    const currentUrl = window.location.pathname;

    if (currentUrl.includes('SolveProblem1.html')) {
        window.location.href = "SolveProblem2.html";
    } else if (currentUrl.includes('SolveProblem2.html')) {
        window.location.href = "SolveProblem3.html";
    } else if (currentUrl.includes('SolveProblem3.html')) {
        // เมื่อถึงหน้า SolveProblem3.html แล้วให้กลับไปที่หน้า Home.html
        window.location.href = "Home.html";
    }
});

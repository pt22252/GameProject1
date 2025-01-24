document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const feedback = document.querySelector('.feedback');
        const nextButton = document.getElementById('next-button');
        const currentUrl = window.location.pathname; // ตรวจสอบ URL ปัจจุบัน


        // เพิ่มการอ้างอิงเสียง
        const applauseSound = new Audio('reactionsounds/applause.mp3'); // เสียงเมื่อถูก
        const booSound = new Audio('reactionsounds/boo.mp3'); // เสียงเมื่อผิด

        // หยุดเสียงก่อนหน้า (หากกำลังเล่นอยู่)
        applauseSound.pause();
        applauseSound.currentTime = 0;
        booSound.pause();
        booSound.currentTime = 0;


        // ปิดการคลิกตัวเลือกทั้งหมด
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(option => option.disabled = true);


        // แสดงข้อความตอบกลับและควบคุมปุ่ม Next
        if (isCorrect) {
            console.log("ตอบถูก!");
            if (currentUrl.includes('SolveProblem3.html')) {
                feedback.textContent = "ยินดีด้วย! หนูๆ เก่งมาก!";
            } else {
                feedback.textContent = "ยินดีด้วย! ไปหน้าถัดไป!";
            }
            feedback.style.color = "green";
            applauseSound.play(); // เล่นเสียง applause.mp3
            nextButton.style.display = "block"; // แสดงปุ่ม Next
        } else {
            console.log("ตอบผิด!");
            feedback.textContent = "แย่จัง! ช่วยเลือกอีกครั้งนะ!";
            feedback.style.color = "red";
            booSound.play(); // เล่นเสียง boo.mp3
            nextButton.style.display = "none"; // ซ่อนปุ่ม Next

            // ดีเลย์การรีโหลดหน้า
            setTimeout(() => {
                location.reload(); // รีโหลดหน้าปัจจุบัน
            }, 2000); // ดีเลย์ 2 วินาที
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


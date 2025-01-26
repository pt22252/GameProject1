document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        const isCorrect = button.getAttribute('data-correct') === 'true';
        const feedback = document.querySelector('.feedback');
        const nextButton = document.getElementById('next-button');
        const currentUrl = window.location.pathname; // ตรวจสอบ URL ปัจจุบัน


        // เพิ่มการอ้างอิงเสียง
        const applauseSound = new Audio('reactionsounds/Correct.mp3'); // เสียงเมื่อถูก
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
            if (currentUrl.includes('SolveProblem1End.html')) {
                feedback.textContent = "ยินดีด้วย! หนูๆ เก่งมาก!";
            } else {
                feedback.textContent = "ยินดีด้วย! ไปหน้าถัดไป!";
            }
            feedback.style.color = "green";
            applauseSound.play(); // เล่นเสียง Correct.mp3
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

document.getElementById('next-button').addEventListener('click', () => {
    const currentUrl = window.location.pathname;
    console.log("Current URL:", currentUrl); // ทดสอบเส้นทางปัจจุบัน

    if (currentUrl.includes('SolveProblem1End.html')) {
        console.log("Navigating to SolveProblem2End.html");
        window.location.href = "SolveProblem2End.html";
    } else if (currentUrl.includes('SolveProblem2End.html')) {
        console.log("Navigating to SolveProblem3End.html");
        window.location.href = "SolveProblem3End.html";
    } else if (currentUrl.includes('SolveProblem3End.html')) {
        console.log("Navigating to Chapter.html");
        window.location.href = "EndGame.html";
    } else {
        console.error("No matching URL found.");
    }
});


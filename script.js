let tasks = [];
let userName = "";

// 1. الانتقال من صفحة اللوجين لصفحة المهام
function goToPage2() {
    const input = document.getElementById('usernameInput');
    if (input.value.trim() !== "") {
        userName = input.value;
        showSection('page2');
        
        const welcome = document.getElementById('welcomeScreen');
        welcome.innerText = `Welcome, ${userName}`;
        
        setTimeout(() => {
            welcome.style.display = 'none';
            document.getElementById('taskModule').style.display = 'block';
            updateInfo();
        }, 2000);
    } else {
        alert("Please enter your name");
    }
}

// 2. تحديث التاريخ والنصيحة
function updateInfo() {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('infoArea').innerHTML = `<p>${date}</p><p>"Keep moving forward!"</p>`;
}

// 3. إضافة مهمة جديدة
function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() !== "") {
        tasks.push(input.value);
        const li = document.createElement('li');
        li.style.textAlign = "left";
        li.style.margin = "5px 0";
        li.innerText = input.value; 
        document.getElementById('taskList').appendChild(li);
        input.value = "";
    }
}

// 4. الانتقال لصفحة المراجعة الأخيرة
function goToPage3() {
    showSection('page3');
    const list = document.getElementById('accomplishList');
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" style="margin-right: 10px; transform: scale(1.2);"> ${task}`;
        list.appendChild(li);
    });
}

// 1. التحكم في الاختيارات (Yes/No)
function handleFinalChoice(choice) {
    // إخفاء السؤال الأول
    document.getElementById('postponeQuestionArea').style.display = 'none';

    if (choice === 'yes') {
        // إظهار سؤال التأجيل
        document.getElementById('postponeInputArea').style.display = 'block';
    } else {
        // إظهار جملة الكفاءة لو اختار No
        document.getElementById('efficiencyMsg').style.display = 'block';
    }
}

// 2. زرار Finish النهائي (إظهار الجملة ثم العودة للبداية)
// زرار Finish النهائي (إظهار الجملة ثم العودة للبداية تلقائياً)
function showFinish() {
    // 1. إظهار جملة made by...
    const thankYou = document.getElementById('thankYouMsg');
    thankYou.style.display = 'block';
    
    // 2. سكرول ناعم للرسالة والفوتر عشان المستخدم يشوف اسمك
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    // 3. الانتظار 3 ثواني ثم عمل ريفرش للصفحة أوتوماتيكياً (بدون رسالة تنبيه)
    setTimeout(() => {
        location.reload(); 
    }, 3000); 
}


// دالة التنقل بين السكاشن
function showSection(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
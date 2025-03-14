document.addEventListener('DOMContentLoaded', () => {

    // Check if JWT token exists in local storage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
        console.error("User is not authenticated. Redirecting to login.");
        window.location.href = 'login.html';
    } else {
        // Optional: Verify token with backend if necessary
        // Example of sending the token to the backend for verification
        fetch('http://localhost:5000/auth/verify', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                // Redirect to login if token verification fails
                localStorage.removeItem('token'); // Clear invalid token
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Error verifying token:', error);
            window.location.href = 'login.html';
        });
    }

    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');  // Tambahkan atau hapus kelas 'open'
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error("User ID not found. Redirecting to login.");
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/auth/getUserProgress/${userId}`);
        const data = await response.json();

        if (data.success) {
            const completedLessons = data.completedLessons || 0;

            // Mark lessons as completed based on the count
            const lessonContainer = document.getElementById('lesson-container');
            lessonContainer.childNodes.forEach((lesson, index) => {
                if (index < completedLessons) {
                    lesson.classList.add('completed'); // Add 'completed' class
                    lesson.querySelector('h2').textContent += " (Completed)";
                }
            });
        } else {
            console.error("Failed to fetch user progress:", data.message);
        }
    } catch (error) {
        console.error("Error fetching user progress:", error);
    }
});


const lessons = [
    {
        title: "Lesson 1",
        description: "Arrange the words.",
        link: "lesson.html"
    },
    {
        title: "Lesson 2",
        description: "Listen to the audio.",
        link: "lesson2.html"
    },
    {
        title: "Lesson 3",
        description: "Match the words!",
        link: "lesson3.html"
    }
];

function generateLessons() {
    const lessonContainer = document.getElementById('lesson-container');

    lessons.forEach((lesson, index) => {
        // Buat elemen link
        const lessonLink = document.createElement('a');
        lessonLink.classList.add('section-link');
        lessonLink.href = lesson.link;

        // Buat elemen section
        const section = document.createElement('section');
        section.classList.add('lesson');

        // Buat judul dan deskripsi
        const title = document.createElement('h2');
        title.textContent = lesson.title;
        const description = document.createElement('p');
        description.textContent = lesson.description;

        // Gabungkan elemen
        section.appendChild(title);
        section.appendChild(description);
        lessonLink.appendChild(section);
        lessonContainer.appendChild(lessonLink);
    });
}

function logout() {
    // Remove user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Panggil fungsi untuk menghasilkan lesson saat halaman dimuat
document.addEventListener('DOMContentLoaded', generateLessons);

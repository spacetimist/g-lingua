document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');  // Tambahkan atau hapus kelas 'open'
    });
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
        description: "Coming soon",
        link: "index.html"
    }
];

function generateLessons() {
    const lessonContainer = document.getElementById('lesson-container');

    lessons.forEach(lesson => {
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

// Panggil fungsi untuk menghasilkan lesson saat halaman dimuat
document.addEventListener('DOMContentLoaded', generateLessons);

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:5000/auth/getUserProgress/${userId}`);
        const data = await response.json();

        if (data.success) {
            // Update profile info with user data
            document.getElementById('lessons-completed').textContent = data.completedLessons;
            document.getElementById('name').textContent = data.name || "Unnamed User"; // Set name or fallback
        } else {
            console.error("Failed to load user data:", data.message);
        }
    } catch (error) {
        console.error("Error fetching user progress:", error);
    }
});


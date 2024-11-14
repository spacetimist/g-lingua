// Array yang berisi data material
const materials = [
    {
        title: "Material 1",
        description: null,
        video: "https://www.youtube.com/embed/40PRWD1-HWA?feature=oembed",
    },
    {
        title: "Material 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem et adipisci quam perspiciatis perferendis facilis culpa voluptatibus odio sequi ratione consequuntur placeat minus ex possimus quisquam veniam, quod laboriosam.",
        video: null, 
    },
    {
        title: "Material 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem et adipisci quam perspiciatis perferendis facilis culpa voluptatibus odio sequi ratione consequuntur placeat minus ex possimus quisquam veniam, quod laboriosam.",
        video: "https://www.youtube.com/embed/40PRWD1-HWA?feature=oembed",
    },
];

// Fungsi untuk menghasilkan konten material
function generateMaterials() {
    const container = document.getElementById('materials-container');

    materials.forEach(material => {
        // Buat elemen untuk judul
        const materialTitle = document.createElement('h2');
        materialTitle.textContent = material.title;

        // Buat elemen untuk deskripsi
        const materialDescription = document.createElement('p');
        materialDescription.textContent = material.description;

        // Buat elemen video jika ada
        const videoContainer = document.createElement('div');
        if (material.video) {
            const iframe = document.createElement('iframe');
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = material.video;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        }
        
        // Gabungkan semua elemen ke dalam container
        container.appendChild(materialTitle);
        container.appendChild(videoContainer);
        container.appendChild(materialDescription);
        const line = document.createElement('hr');
            container.appendChild(line);

    });
}

// Panggil fungsi untuk menghasilkan material saat halaman dimuat
document.addEventListener('DOMContentLoaded', generateMaterials);
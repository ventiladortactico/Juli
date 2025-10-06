// Crear estrellas animadas
        function createStars() {
            const starsContainer = document.querySelector('.stars');
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        let currentPhotoTarget = null;

        function uploadPhoto(element, description) {
            currentPhotoTarget = element;
            document.getElementById('fileInput').click();
        }

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file && currentPhotoTarget) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '15px';
                    
                    currentPhotoTarget.innerHTML = '';
                    currentPhotoTarget.appendChild(img);
                    
                    // Agregar efecto de corazones flotantes
                    showHearts(currentPhotoTarget);
                };
                reader.readAsDataURL(file);
            }
        }

        function showHearts(element) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = '💕';
                    heart.style.position = 'absolute';
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.top = '100%';
                    heart.style.fontSize = '1.5em';
                    heart.style.pointerEvents = 'none';
                    heart.style.animation = 'floatUp 2s ease-out forwards';
                    heart.style.zIndex = '1000';
                    
                    element.style.position = 'relative';
                    element.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.parentNode.removeChild(heart);
                        }
                    }, 2000);
                }, i * 200);
            }
        }

        function addNewPhotoSlot() {
            const gallery = document.querySelector('.photo-gallery');
            const newSlot = document.createElement('div');
            newSlot.className = 'photo-placeholder';
            newSlot.onclick = function() { uploadPhoto(this, 'Nuevo recuerdo'); };
            newSlot.innerHTML = `
                <div class="icon">✨</div>
                <div class="text">Nuevo recuerdo</div>
            `;
            gallery.appendChild(newSlot);
            
            // Animación de entrada
            newSlot.style.opacity = '0';
            newSlot.style.transform = 'scale(0.8)';
            setTimeout(() => {
                newSlot.style.transition = 'all 0.5s ease';
                newSlot.style.opacity = '1';
                newSlot.style.transform = 'scale(1)';
            }, 100);
        }

        function playSong() {
            const song = document.getElementById('my-song');
            if (song.paused) {
                const playPromise = song.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Automatic playback started!
                    })
                    .catch(error => {
                        console.error("Playback prevented by browser.", error);
                    });
                }
            } else {
                song.pause();
            }
        }

        // Agregar CSS para la animación floatUp
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);

        // Inicializar estrellas cuando la página cargue
        document.addEventListener('DOMContentLoaded', function() {
            createStars();

            const map = L.map('memory-map').setView([-27.37, -55.89], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const markers = [
                {
                    lat: -27.3568035,
                    lng: -55.8910021,
                    title: "Nuestra primera cita"
                },
                {
                    lat: -27.3836292,
                    lng: -55.8884481,
                    title: "Nuestro primer beso"
                },
                {
                    lat: -27.3729597,
                    lng: -55.9024169,
                    title: "Evento de Cosplay"
                }
            ];

            markers.forEach(markerInfo => {
                L.marker([markerInfo.lat, markerInfo.lng]).addTo(map)
                    .bindPopup(markerInfo.title);
            });

            // Lógica para revelar stickers al hacer scroll
const stickers = document.querySelectorAll('.sticker');

function revealStickers() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    stickers.forEach(sticker => {
        const stickerTop = sticker.offsetTop;
        // Si el sticker está visible en el viewport, muéstralo
        if (scrollTop + windowHeight > stickerTop + 100) { 
            sticker.classList.add('visible');
        }
    });
}

// Evento de scroll para llamar a la función
window.addEventListener('scroll', revealStickers);

// Llama a la función una vez al cargar por si hay stickers visibles
revealStickers();
        });
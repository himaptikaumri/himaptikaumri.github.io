function showAlertAndRefresh() {
        window.open('vote-now/');
    }


    // Fungsi untuk mendeteksi tipe perangkat berdasarkan userAgent
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) {
            return "Android";
        } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
            return "iOS";
        } else if (/windows phone/i.test(ua)) {
            return "Windows Phone";
        } else if (/tablet|ipad/i.test(ua)) {
            return "Tablet";
        } else if (/Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry|Opera Mini/.test(ua)) {
            return "Smartphone";
        }
        return "PC/Laptop/Desktop";
    }

    // Fungsi untuk mendapatkan IP dan menampilkan informasi di modal
    function fetchAndDisplayInfo() {
        const browserInfo = navigator.userAgent;
        const deviceType = getDeviceType();

        // Mengambil IP menggunakan ipify
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const userIP = data.ip;
                const content = `<strong>IP :</strong> ${userIP}\n<strong>Perangkat :</strong> ${deviceType}\n<strong>Browser :</strong> ${browserInfo}\n`;
                document.getElementById('modalContent').innerHTML = content; // Menggunakan innerHTML untuk memproses HTML
                openModal();
            })
            .catch(error => {
                console.error('Gagal mendapatkan IP:', error);
                const content = `Browser Anda: ${browserInfo}\nPerangkat Anda: ${deviceType}\nGagal mendapatkan IP.`;
                document.getElementById('modalContent').innerText = content;
                openModal();
            });
    }

    // Fungsi untuk membuka modal
    function openModal() {
        document.getElementById('modalOverlay').style.display = 'flex';
    }

    // Fungsi untuk menutup modal
    function closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }

    // Mencegah klik kanan dan menampilkan modal dengan info
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        fetchAndDisplayInfo();
    });

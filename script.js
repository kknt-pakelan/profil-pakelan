// 1. Inisialisasi Peta
// Koordinat Tengah Pakelan: -7.816 (Lat), 112.009 (Long)
// Zoom Level: 16 (Cukup dekat untuk melihat jalan)
var map = L.map('map').setView([-7.816350, 112.009500], 16);

// 2. Tambahkan Tile Layer (Peta Dasar)
// Kita pakai OpenStreetMap yang gratis
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// 3. Tambahkan Marker (Penanda Lokasi)
// Marker 1: Kantor Kelurahan Pakelan
var markerKantor = L.marker([-7.815948, 112.009384]).addTo(map);

// Menambahkan Pop-up saat marker diklik
markerKantor.bindPopup("<b>Kantor Kelurahan Pakelan</b><br>Pusat Pelayanan Warga.").openPopup();

// Marker 2: Kelenteng Tjoe Hwie Kiong (Contoh Wisata)
var markerKelenteng = L.marker([-7.817500, 112.008800]).addTo(map);
markerKelenteng.bindPopup("<b>Kelenteng Tjoe Hwie Kiong</b><br>Ikon Wisata Heritage.");

// 4. Menampilkan Batas Wilayah (GeoJSON)
var geojsonLayer = L.geoJSON(pakelanData, {
    style: function(feature) {
        return {
            color: "#4B24B3",       // Warna Garis (Ungu Pakelan)
            weight: 3,              // Tebal Garis
            opacity: 1,             // Kejelasan Garis (1 = Solid)
            fillColor: "#FDD835",   // Warna Isi (Kuning Aksen)
            fillOpacity: 0.2        // Transparansi Isi (0.2 = Bening)
        };
    },
    onEachFeature: function(feature, layer) {
        // Menampilkan Popup saat area diklik
        if (feature.properties && feature.properties.nama) {
            layer.bindPopup("<b>" + feature.properties.nama + "</b><br>" + feature.properties.deskripsi);
        }
    }
}).addTo(map);

// 5. Auto Zoom ke Wilayah Desa
// Fitur ini penting: Peta otomatis pas ukurannya ke batas desa saat pertama dibuka
map.fitBounds(geojsonLayer.getBounds());
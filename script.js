// Inisialisasi Peta
// Koordinat Tengah Pakelan
var map = L.map("map").setView([-7.81635, 112.0095], 16);

var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [38, 38], // Ukuran ikon (lebar, tinggi)
    iconAnchor: [19, 38], // Titik yang "menancap" di peta (tengah, bawah)
    popupAnchor: [0, -30], // Titik munculnya pop-up (di atas ikon)
  },
});

var klentengIcon = new LeafIcon({ iconUrl: "assets/icons/kelenteng.png" });
var masjidIcon = new LeafIcon({ iconUrl: "assets/icons/masjid.png" });
var kantorIcon = new LeafIcon({ iconUrl: "assets/icons/kantor.png" });
var gerejaIcon = new LeafIcon({ iconUrl: "assets/icons/gereja.png" });
var gieIcon = new LeafIcon({ iconUrl: "assets/icons/gie.png" });
var koramilIcon = new LeafIcon({ iconUrl: "assets/icons/koramil.png" });
var pundenIcon = new LeafIcon({ iconUrl: "assets/icons/punden.png" });
var viharaIcon = new LeafIcon({ iconUrl: "assets/icons/vihara.png" });

// Tile Layer (Peta Dasar)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Marker (Penanda Lokasi)
// Marker Kantor Kelurahan Pakelan
var markerKantor = L.marker([-7.8184308552018535, 112.00956899535286], { icon: kantorIcon }).addTo(
  map
);

// Menambahkan Pop-up saat marker diklik
markerKantor.bindPopup("<b>Kantor Kelurahan Pakelan</b><br>Pusat Pelayanan Warga.").openPopup();

// Marker Kelenteng Tjoe Hwie Kiong
var markerKelenteng = L.marker([-7.819991724537468, 112.00959693836458], {
  icon: klentengIcon,
}).addTo(map);
markerKelenteng.bindPopup("<b>Kelenteng Tjoe Hwie Kiong</b><br>Ikon Wisata Heritage.");

var markerGerejaKristenIndonesia = L.marker([-7.814591933062071, 112.0088980265514], {
  icon: gerejaIcon,
}).addTo(map);
markerGerejaKristenIndonesia.bindPopup("<b>Gereja Kristen Indonesia</b>");
// Marker Gereja Pusat Pantekosta Indonesia
var markerGerejaPusat = L.marker([-7.814269955615778, 112.01172826582454], {
  icon: gerejaIcon,
}).addTo(map);
markerGerejaPusat.bindPopup("<b>Gereja Pusat Pantekosta Indonesia</b>");

// Marker Gereja Bethany Indonesia House of Restoration Kediri
var markerGerejaBethany = L.marker([-7.818141477013701, 112.00936904771905], {
  icon: gerejaIcon,
}).addTo(map);
markerGerejaBethany.bindPopup("<b>Gereja Bethany Indonesia House of Restoration Kediri</b>");

// Marker Gereja Reformed Injili Indonesia PRII Kediri
var markerGerejaPRII = L.marker([-7.8160058923517415, 112.00891575272055], {
  icon: gerejaIcon,
}).addTo(map);
markerGerejaPRII.bindPopup("<b>Gereja Reformed Injili Indonesia PRII Kediri</b>");

// Marker GPdl FILADELFIA Kediri Kota
var markerGerejaFILADELFIA = L.marker([-7.818124753896681, 112.01087353370222], {
  icon: gerejaIcon,
}).addTo(map);
markerGerejaFILADELFIA.bindPopup("<b>GPdl FILADELFIA Kediri Kota</b>");

// Marker Vihara Metta Maitreya
var markerViharaMettaMaitreya = L.marker([-7.817363176848054, 112.00899966316895], {
  icon: viharaIcon,
}).addTo(map);
markerViharaMettaMaitreya.bindPopup("<b>Vihara Metta Maitreya</b>");

// Marker Susteran Putri Kasih
var markerSusteranPutriKasih = L.marker([-7.813714395469712, 112.01022930853844], {
  icon: gerejaIcon,
}).addTo(map);
markerSusteranPutriKasih.bindPopup("<b>Susteran Putri Kasih</b>");

// Marker Gie Kie Kong Soe
var markerGieKieKongSoe = L.marker([-7.817650780702965, 112.01115682573888], {
  icon: gieIcon,
}).addTo(map);
markerGieKieKongSoe.bindPopup("<b>Gie Kie Kong Soe</b>");

// Marker Punden Pakelan
var markerPundenPakelan = L.marker([-7.8161937913280415, 112.01017182125483], {
  icon: pundenIcon,
}).addTo(map);
markerPundenPakelan.bindPopup("<b>Punden Pakelan</b>");

// Marker Masjid Al-Hidayah
var markerMasjidAlHidayah = L.marker([-7.816169785745018, 112.0100882210137], {
  icon: masjidIcon,
}).addTo(map);
markerMasjidAlHidayah.bindPopup("<b>Masjid Al-Hidayah</b>");

// 4. Menampilkan Batas Wilayah (GeoJSON)
var geojsonLayer = L.geoJSON(pakelanData, {
  style: function (feature) {
    return {
      color: "#4B24B3",
      weight: 3,
      opacity: 1,
      fillColor: "#FDD835",
      fillOpacity: 0.2,
    };
  },
  onEachFeature: function (feature, layer) {
    // Menampilkan Popup saat area diklik
    if (feature.properties && feature.properties.nama) {
      layer.bindPopup("<b>" + feature.properties.nama + "</b><br>" + feature.properties.deskripsi);
    }
  },
}).addTo(map);

// Auto Zoom ke Wilayah Desa
// Fitur ini penting: Peta otomatis pas ukurannya ke batas desa saat pertama dibuka
map.fitBounds(geojsonLayer.getBounds());

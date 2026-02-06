const map = L.map("map").setView([-7.81635, 112.0095], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30],
  },
});

const icons = {
  kantor: new LeafIcon({ iconUrl: "assets/icons/kantor.png" }),
  masjid: new LeafIcon({ iconUrl: "assets/icons/masjid.png" }),
  gereja: new LeafIcon({ iconUrl: "assets/icons/gereja.png" }),
  kelenteng: new LeafIcon({ iconUrl: "assets/icons/kelenteng.png" }),
  vihara: new LeafIcon({ iconUrl: "assets/icons/vihara.png" }),
  punden: new LeafIcon({ iconUrl: "assets/icons/punden.png" }),
  gie: new LeafIcon({ iconUrl: "assets/icons/gie.png" }),
};

const locations = [
  {
    name: "Kantor Kelurahan Pakelan",
    coords: [-7.8184308552018535, 112.00956899535286],
    icon: icons.kantor,
    description: "Pusat Pelayanan Administrasi Warga",
  },
  {
    name: "Kelenteng Tjoe Hwie Kiong",
    coords: [-7.819991724537468, 112.00959693836458],
    icon: icons.kelenteng,
    description: "Ikon Wisata Heritage Pakelan",
  },
  {
    name: "Gereja Kristen Indonesia",
    coords: [-7.814591933062071, 112.0088980265514],
    icon: icons.gereja,
    description: "Tempat Ibadah & Kegiatan Sosial",
  },
  {
    name: "Gereja Pusat Pantekosta Indonesia",
    coords: [-7.814269955615778, 112.01172826582454],
    icon: icons.gereja,
    description: "Gereja Pusat Pantekosta Indonesia",
  },
  {
    name: "Gereja Bethany Indonesia House of Restoration",
    coords: [-7.818141477013701, 112.00936904771905],
    icon: icons.gereja,
    description: "Gereja Bethany Indonesia Kediri",
  },
  {
    name: "Gereja Reformed Injili Indonesia PRII",
    coords: [-7.8160058923517415, 112.00891575272055],
    icon: icons.gereja,
    description: "PRII Kediri",
  },
  {
    name: "GPdI Filadelfia Kediri Kota",
    coords: [-7.818124753896681, 112.01087353370222],
    icon: icons.gereja,
    description: "GPdI Filadelfia Kediri Kota",
  },
  {
    name: "Vihara Metta Maitreya",
    coords: [-7.817363176848054, 112.00899966316895],
    icon: icons.vihara,
    description: "Vihara Metta Maitreya",
  },
  {
    name: "Susteran Putri Kasih",
    coords: [-7.813714395469712, 112.01022930853844],
    icon: icons.gereja,
    description: "Komunitas Religius & Sosial",
  },
  {
    name: "Gie Kie Kong Soe",
    coords: [-7.817650780702965, 112.01115682573888],
    icon: icons.gie,
    description: "Tempat Ibadah & Budaya Tionghoa",
  },
  {
    name: "Punden Pakelan",
    coords: [-7.8161937913280415, 112.01017182125483],
    icon: icons.punden,
    description: "Situs Budaya & Tradisi Lokal",
  },
  {
    name: "Masjid Al-Hidayah",
    coords: [-7.816169785745018, 112.0100882210137],
    icon: icons.masjid,
    description: "Masjid Al-Hidayah Pakelan",
  },
];

locations.forEach((loc) => {
  L.marker(loc.coords, { icon: loc.icon })
    .addTo(map)
    .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
});

const geojsonLayer = L.geoJSON(pakelanData, {
  style: {
    color: "#4B24B3",
    weight: 3,
    fillColor: "#FDD835",
    fillOpacity: 0.25,
  },
  onEachFeature: (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 0.5 });
      },
      mouseout: (e) => {
        geojsonLayer.resetStyle(e.target);
      },
    });

    layer.bindPopup(
      `<b>${feature.properties.nama}</b><br>${feature.properties.deskripsi}`,
    );
  },
}).addTo(map);

map.fitBounds(geojsonLayer.getBounds());

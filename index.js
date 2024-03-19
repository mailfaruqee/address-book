const contacts = [
    {
        id: 1,
        fullName: "Sayyid Al Murtadho",
        YoE: 1,
        office: "Vriens and Partners",
        location: { lat: -6.213029, lng: 106.821389 } 
    },
    {
        id: 2,
        fullName: "Muhammad Ilyas Irfan Syiraaj",
        YoE: 1,
        office: "The Ministry of Public Works and Housing",
        location: { lat: -6.236877, lng: 106.800810 }
    },
    {
        id: 3,
        fullName: "Muhammad Rasyid Galela",
        YoE: 1,
        office: "Schlumberger",
        location: { lat: -6.2350464, lng: 106.8233347 } 
    },
    {
        id: 4,
        fullName: "Hatma",
        YoE: 10,
        office: "PWC",
        location: { lat: -6.2145939, lng: 106.8162992 } 
    },
];

// Initialize the map
const map = L.map('map').setView([-6.200000, 106.816666], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Add markers to the map
contacts.forEach(contact => {
    const marker = L.marker([contact.location.lat, contact.location.lng]).addTo(map);
    marker.bindPopup(`<b>${contact.fullName}
    </b><br>${contact.office}
    </b><br>${contact.YoE} YoE`);
});

const contacts = [
  {
    id: 1,
    fullName: "Sayyid Al Murtadho",
    phone: "08120987654321",
    company: "Vriens and Partners",
    coordinate: { lat: -6.213029, lng: 106.821389 },
  },
  {
    id: 2,
    fullName: "Muhammad Ilyas Irfan Syiraaj",
    phone: "08213141516171",
    company: "The Ministry of Public Works and Housing",
    coordinate: { lat: -6.236877, lng: 106.80081 },
  },
  {
    id: 3,
    fullName: "Muhammad Rasyid Galela",
    phone: "0852123456789",
    company: "Schlumberger",
    coordinate: { lat: -6.2350464, lng: 106.8233347 },
  },
];

// Initialize the map
const map = L.map("map").setView([-6.2, 106.816666], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Add markers to the map
contacts.forEach((contact) => {
  const marker = L.marker([
    contact.coordinate.lat,
    contact.coordinate.lng,
  ]).addTo(map);

  marker.bindPopup(`<h1>${contact.fullName}</h1>
    <div>
    <p>Company: ${contact.company}</p>
    <p>Phone: ${contact.phone} </p>
    </div>`);

  // Add click event listener to marker
  marker.on("click", function () {
    // Do something when marker is clicked
    console.log(`Marker for ${contact.fullName} clicked`);
  });
});

// Function to add a new contact to the map
function addContactToMap(contact) {
  const marker = L.marker([
    contact.coordinate.lat,
    contact.coordinate.lng,
  ]).addTo(map);

  marker.bindPopup(`<h1>${contact.fullName}</h1>
    <div>
    <p>Company: ${contact.company}</p>
    <p>Phone: ${contact.phone} </p>
    </div>`);
}

// Event listener for form submission
const addContactForm = document.getElementById("addContactForm");

addContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullName").value;
  const company = document.getElementById("company").value;
  const phone_number = document.getElementById("phone_number").value;
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Generate unique id for the new contact
  const id = contacts.length + 1;

  // Create new contact object
  const newContact = {
    id: id,
    fullName: fullName,
    phone: phone_number,
    company: company,
    coordinate: { lat: latitude, lng: longitude },
  };

  // Add new contact to contacts array
  contacts.push(newContact);

  // Add new contact to map
  addContactToMap(newContact);

  // Save updated contacts to local storage
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Reset form
  addContactForm.reset();
});

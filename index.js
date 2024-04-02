const contacts = [
  {
    id: 1,
    fullName: "Sayyid Al Murtadho",
    year_of_experience: 1,
    company: "Vriens and Partners",
    coordinate: { lat: -6.213029, lng: 106.821389 },
  },
  {
    id: 2,
    fullName: "Muhammad Ilyas Irfan Syiraaj",
    year_of_experience: 1,
    company: "The Ministry of Public Works and Housing",
    coordinate: { lat: -6.236877, lng: 106.80081 },
  },
  {
    id: 3,
    fullName: "Muhammad Rasyid Galela",
    year_of_experience: 1,
    company: "Schlumberger",
    coordinate: { lat: -6.2350464, lng: 106.8233347 },
  },
  {
    id: 4,
    fullName: "Muhammad Hasan",
    year_of_experience: 5,
    company: "PWC",
    coordinate: { lat: -6.2145939, lng: 106.8162992 },
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
    <p>${contact.company}</p>
    <p>${contact.year_of_experience} YoE </p>
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
    <p>${contact.company}</p>
    <p>${contact.year_of_experience} YoE </p>
    </div>`);
}

// Event listener for form submission
const addContactForm = document.getElementById("addContactForm");

addContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullName").value;
  const company = document.getElementById("company").value;
  const yearOfExperience = document.getElementById("yearOfExperience").value;
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Generate unique id for the new contact
  const id = contacts.length + 1;

  // Create new contact object
  const newContact = {
    id: id,
    fullName: fullName,
    year_of_experience: yearOfExperience,
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

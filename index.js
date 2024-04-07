const contacts = [
  {
    id: 1,
    fullName: "Sayyid Al Murtadho",
    email: "sayyidam@example.com",
    phone: "08120987654321",
    coordinate: { lat: -6.213029, lng: 106.821389 },
  },
  {
    id: 2,
    fullName: "Muhammad Ilyas Irfan Syiraaj",
    email: "ilyas@example.com",
    phone: "08213141516171",
    coordinate: { lat: -6.236877, lng: 106.80081 },
  },
  {
    id: 3,
    fullName: "Muhammad Rasyid Galela",
    email: "rasyidgalela@example.com",
    phone: "0852123456789",
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
    <p>E-Mail: ${contact.email} </p>
    <p>Phone: ${contact.phone} </p>
    </div>`);

  // Add click event listener to marker
  marker.on("click", function () {
    // Do something when marker is clicked
    console.log(`Marker for ${contact.fullName} clicked`);
  });
});

// Add markers to the map for existing contacts
contacts.forEach(addContactToMap);

// Function to add a new contact to the map
function addContactToMap(contact) {
  const marker = L.marker([
    contact.coordinate.lat,
    contact.coordinate.lng,
  ]).addTo(map);

  marker.bindPopup(`<h1>${contact.fullName}</h1>
    <div>
    <p>E-Mail: ${contact.email} </p>
    <p>Phone: ${contact.phone} </p>
    </div>`);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Get other form values
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone-number").value;

        // Generate unique id for the new contact
        const id = contacts.length + 1;

        // Create new contact object
        const newContact = {
          id: id,
          fullName: fullName,
          email: email,
          phone: phone,
          coordinate: { lat: lat, lng: lon },
        };

        // Add new contact to contacts array
        contacts.push(newContact);

        // Add new contact to map
        addContactToMap(newContact);

        // Save updated contacts to local storage
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Reset form
        addContactForm.reset();
      },
      (err) => {
        alert("Geolocation is not available or permission was denied.");
        console.log(err);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function validateForm() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone-number").value.trim();
  const allFieldsFilled = fullName !== "" && email !== "" && phone !== "";

  document.getElementById("addContactButton").disabled = !allFieldsFilled;
}

document.getElementById("fullName").addEventListener("input", validateForm);
document.getElementById("email").addEventListener("input", validateForm);
document.getElementById("phone-number").addEventListener("input", validateForm);

document.addEventListener("DOMContentLoaded", function () {
  validateForm(); // To ensure the button is disabled when the page loads
});

// Event listener for form submission
const addContactForm = document.getElementById("addContactForm");
addContactForm.addEventListener("submit", handleFormSubmit);

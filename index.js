let contacts = [];

// Initialize the map
const map = L.map("map").setView([-6.40349, 107.37954], 9);

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
    <p>E-Mail: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
    <button onclick="deleteContact('${contact.email}');">Delete Contact</button>
    </div>`);
  marker._contactEmail = contact.email; // Associate the email with the marker
}

// Function to delete a contact
function deleteContact(email) {
  // Filter out the contact with the given email
  contacts = contacts.filter((contact) => contact.email !== email);

  // Update localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Remove the marker from the map
  map.eachLayer((layer) => {
    if (layer._contactEmail === email) {
      map.removeLayer(layer);
    }
  });
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

// validate form
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

// Save to local storage
const storedContacts = JSON.parse(localStorage.getItem("contacts"));
if (storedContacts) {
  storedContacts.forEach((contact) => {
    contacts.push(contact);
    addContactToMap(contact);
  });
}

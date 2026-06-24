let contacts = [];
let nextId = 1;

const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const contact = {
    id: nextId++,
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: {
      street: document.getElementById("street").value.trim(),
      state: document.getElementById("state").value.trim(),
      postcode: document.getElementById("postcode").value.trim()
    },
    description: document.getElementById("description").value.trim()
  };

  contacts.push(contact);

  contactForm.reset();
  displayContacts(contacts);
});


function displayContacts(contactArray) {
  contactList.innerHTML = "";

  if (contactArray.length === 0) {
    contactList.innerHTML = `<p class="empty-message">No contacts found.</p>`;
    return;
  }

  contactArray.forEach(function (contact) {
    const contactItem = document.createElement("div");
    contactItem.className = "contact-item";

    contactItem.innerHTML = `
      <h3>${escapeHTML(contact.name)}</h3>
      <p><strong>ID:</strong> ${contact.id}</p>
      <p><strong>Phone:</strong> ${escapeHTML(contact.phone)}</p>
      <p><strong>Email:</strong> ${escapeHTML(contact.email)}</p>
      <p><strong>Address:</strong> 
        ${escapeHTML(contact.address.street)}, 
        ${escapeHTML(contact.address.state)}, 
        ${escapeHTML(contact.address.postcode)}
      </p>
      <p><strong>Description:</strong> ${escapeHTML(contact.description || "No description")}</p>
      <button class="delete-button" onclick="deleteContact(${contact.id})">Delete</button>
    `;

    contactList.appendChild(contactItem);
  });
}


searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredContacts = contacts.filter(function (contact) {
    return contact.name.toLowerCase().includes(searchText);
  });

  displayContacts(filteredContacts);
});


function deleteContact(id) {
  contacts = contacts.filter(function (contact) {
    return contact.id !== id;
  });

  displayContacts(contacts);
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


displayContacts(contacts);
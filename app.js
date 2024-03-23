// Define API endpoint URLs
//const baseUrl = 'http://localhost:3000/api/inventory';
const baseUrl = 'https://eventry-backend-9.onrender.com/';

// Function to fetch and display inventory items
function fetchInventoryItems() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            const inventoryItemsBody = document.getElementById('inventoryItemsBody');
            inventoryItemsBody.innerHTML = ''; // Clear existing items
            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item._id}</td>
                    <td>${item.name || ''}</td>
                    <td>${item.description || ''}</td>
                    <td>${item.quantity || ''}</td>
                    <td>₦${item.price || ''}</td>
                    <td>₦${item.total_price || ''}</td>
                    <td>${item.date || ''}</td>
                    <td>
                        <button onclick="openUpdateForm('${item._id}', '${item.name}', '${item.description}', ${item.quantity}, ${item.price})">Update</button>
                        <button onclick="deleteItem('${item._id}')">Delete</button> <!-- Change id to _id -->
                    </td>
                `;
                inventoryItemsBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching inventory:', error);
        });
}




// Function to delete an inventory item
function deleteItem(itemId) {
    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Inventory item deleted successfully');
            fetchInventoryItems(); // Refresh inventory list
        } else {
            console.error('Error deleting inventory item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting inventory item:', error);
    });
}






// Function to open update form
function openUpdateForm(id, name, description, quantity, price) {
    const updateForm = document.getElementById('updateItemForm');
    updateForm.itemIdUpdate.value = id;
    updateForm.itemNameUpdate.value = name;
    updateForm.itemDescriptionUpdate.value = description;
    updateForm.itemQuantityUpdate.value = quantity;
    updateForm.itemPriceUpdate.value = price;
}

// Function to update an inventory item
function updateItem() {
    const updateForm = document.getElementById('updateItemForm');
    const itemId = updateForm.itemIdUpdate.value;
    const updatedItem = {
        name: updateForm.itemNameUpdate.value,
        description: updateForm.itemDescriptionUpdate.value,
        quantity: updateForm.itemQuantityUpdate.value, // Extract quantity value from form
        price: updateForm.itemPriceUpdate.value
    };

    fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
    })
    .then(response => {
        if (response.ok) {
            console.log('Inventory item updated successfully');
            fetchInventoryItems(); // Refresh inventory list
        } else {
            console.error('Error updating inventory item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error updating inventory item:', error);
    });
}










  
  
  
  
  // Function to add an inventory item
  function addInventoryItem(formData) {
    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Inventory item added successfully');
            fetchInventoryItems(); // Refresh inventory list
        } else {
            console.error('Error adding inventory item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error adding inventory item:', error);
    });
  }
  
  
  
  // Function to delete an inventory item
  function deleteItem(itemId) {
    fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Inventory item deleted successfully');
            fetchInventoryItems(); // Refresh inventory list
        } else {
            console.error('Error deleting inventory item:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting inventory item:', error);
    });
  }
  
  
  
  
  // Event listener for form submission to add an inventory item
  document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const newItem = {};
    formData.forEach((value, key) => {
        newItem[key] = value;
    });
    addInventoryItem(newItem);
  });
  
  // Fetch and display initial inventory items
  fetchInventoryItems();
  
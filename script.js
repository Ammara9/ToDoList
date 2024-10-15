// Initialize the store
const storeName = 'myList';
let storeData = JSON.parse(localStorage.getItem(storeName)) || [];

function AddItem() {
    const itemInput = document.getElementById("item");
    const addItemBtn = document.getElementById("add-btn");
    const itemList = document.getElementById("list");

    addItemBtn.addEventListener("click", () => {
        let item = itemInput.value.trim();
        
        if (item) {
            // Capitalize the first letter
            item = item.charAt(0).toUpperCase() + item.slice(1);

            const listItem = createListItem(item, false);
            itemList.appendChild(listItem);
            itemInput.value = '';

            // Add the item to the store
            storeData.push({ text: item, purchased: false });
            localStorage.setItem(storeName, JSON.stringify(storeData));
        }
    });
}


function RemoveItem(listItem) {
    const itemList = document.getElementById("list");
    const itemText = listItem.firstChild.textContent;  // Get the actual item text
    const index = storeData.findIndex((item) => item.text === itemText);
    if (index !== -1) {
        storeData.splice(index, 1);
        localStorage.setItem(storeName, JSON.stringify(storeData));
    }
    itemList.removeChild(listItem);
}

// Helper function to create a list item element
function createListItem(itemText, purchased) {
    const listItem = document.createElement("li");
    listItem.textContent = itemText;

    // Add remove button to list item
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "x";

    removeBtn.addEventListener("click", () => {
        RemoveItem(listItem);
    });

    listItem.appendChild(removeBtn);

    // Add click event to toggle purchased state
    listItem.addEventListener("click", (e) => {
        if (e.target !== removeBtn) {
            listItem.classList.toggle("strikethrough");
            const index = storeData.findIndex((item) => item.text === listItem.firstChild.textContent);
            if (index !== -1) {
                storeData[index].purchased = !storeData[index].purchased;
                localStorage.setItem(storeName, JSON.stringify(storeData));
            }
        }
    });

    if (purchased) {
        listItem.classList.add("strikethrough");
    }

    return listItem;
}

// Load the stored data on page load
function loadStoredData() {
    // Clear the existing storeData array
    storeData = JSON.parse(localStorage.getItem(storeName)) || [];

    // Clear the list
    const itemList = document.getElementById("list");
    itemList.innerHTML = '';

    // Check if storeData is not empty
    if (storeData.length > 0) {
        storeData.forEach((item) => {
            const listItem = createListItem(item.text, item.purchased);
            itemList.appendChild(listItem);
        });
    }
}

// Call the loadStoredData function on page load
loadStoredData();

// Call the AddItem function to initialize the event listener
AddItem();

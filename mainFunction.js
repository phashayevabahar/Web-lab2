//Dinamik hisseni yaradan esas funksiya
function dynamicSection(options) {
    const {
        sectionId,
        addButtonId,
        listId,
        inputPlaceholder,
        itemClass,
    } = options; 

    const addButton = document.getElementById(addButtonId);
    const list = document.getElementById(listId);
    const section = document.querySelector(`#${sectionId}`);

    if (!section || !addButton || !list) {
        console.error("Item not found:", { sectionId, addButtonId, listId });
        return;
    }

    // headere klikledikde "Add" hissesi acilir
    section?.querySelector('h2').addEventListener("click", () => {
        addButton.classList.toggle('hidden');
        addButton.classList.toggle('is-visible');

        console.log('Button visibility:', addButton.classList.contains('hidden') ? 'Hidden' : 'Visible');
    });

    // Add duymesine klikleyerek input yaradirirq
    addButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = inputPlaceholder;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";

        const wrapper = document.createElement("div");
        wrapper.style.marginTop = "10px";
        wrapper.append(input, addBtn);
        section.insertBefore(wrapper, addButton);

        function addItem() {
            const value = input.value.trim();
            if (value) {
                addItemToList(list, value, itemClass);
                wrapper.remove();
            }
        }

        addBtn.addEventListener("click", addItem);
        input.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                addItem();
            }
        })
    });
}

//Siyahiya yeni element elave etmek ucun funksiya
function addItemToList(list, value, itemClass) {
    const item = document.createElement("div");
    item.className = itemClass;

    const text = document.createElement("span");
    if (value.includes("+")) {
        text.textContent = "📞 " + value;
    } else if (value.includes("@")) {
        text.textContent = "✉️ " + value;
    } else if (value.includes(".instagram")) {
        text.textContent = "📷 " + value;
    } else if (value.includes("www")) {
        text.textContent = "🌐 " + value;
    } else {
        text.textContent = "♦️ " + value;
    }
    text.style.marginRight = "10px";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        list.removeChild(item);
    });   

    item.appendChild(text);
    item.appendChild(deleteBtn);
    list.appendChild(item);
}
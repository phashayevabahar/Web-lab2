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


//Sections name
//Contact hissesi ucun
dynamicSection( {
    sectionId: "contact",
    addButtonId: "addContactBtn",
    listId:"contactList",
    inputPlaceholder: "Enter contact info...",
    itemClass: "contact-item",
})

//Skills hissesi ucun
dynamicSection( {
    sectionId: "skill",
    addButtonId: "addSkillBtn",
    listId:"skillsList",
    inputPlaceholder: "Enter a skill...",
    itemClass: "skill-item",
})

//Language hissesi ucun
dynamicSection( {
    sectionId: "language",
    addButtonId: "addLanguageBtn",
    listId:"languageList",
    inputPlaceholder: "Enter a language...",
    itemClass: "language-item",
})


// Education bölməsi üçün dinamik funksiya
function setupEducationSection() {
    const educationList = document.getElementById('educationList');
    const addButton = document.getElementById('addEducationBtn');


// Education başlığına kliklə "Add" düyməsini göstər/gizlət
document.querySelector('.education h2').addEventListener("click", () => {
    addButton.classList.toggle('hidden');
});



    // Yeni təhsil bloku əlavə et
    addButton.addEventListener('click', () => {
        const newEducationBlock = document.createElement('div');
        newEducationBlock.className = 'education-block';
        newEducationBlock.innerHTML = `
            <input type="text" placeholder="Years (e.g., 2009-2030)" class="years-input">
            <input type="text" placeholder="University Name" class="uni-input">
            <textarea placeholder="Details (e.g., Degree, GPA)"></textarea>
            <div class="education-actions">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;
        educationList.appendChild(newEducationBlock);

        // Save və Cancel düymələrinə funksionalitet əlavə et
        const saveBtn = newEducationBlock.querySelector('.save-btn');
        const cancelBtn = newEducationBlock.querySelector('.cancel-btn');

        saveBtn.addEventListener('click', () => {
            const years = newEducationBlock.querySelector('.years-input').value;
            const university = newEducationBlock.querySelector('.uni-input').value;
            const details = newEducationBlock.querySelector('textarea').value;

            if (years && university) {
                newEducationBlock.innerHTML = `
                    <h3>${years} <br> ${university}</h3>
                    <ul>${details.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>

                    <div class="education-actions">
                        <button class="delete-btn">Delete</button>
                    </div>
    `;
    attachEditDeleteListeners(newEducationBlock);
    ;}
        });

        cancelBtn.addEventListener('click', () => {
            educationList.removeChild(newEducationBlock);
        });
    });

    // Edit və Delete funksionallığı
    function attachEditDeleteListeners(block) {
        const deleteBtn = block.querySelector('.delete-btn');
    
        deleteBtn.addEventListener('click', () => {
            educationList.removeChild(block);
        });
    }
    
}

// Səhifə yüklənəndə işə sal
document.addEventListener('DOMContentLoaded', setupEducationSection);

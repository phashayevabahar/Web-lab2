// Profile bölməsi üçün dinamik funksiya
function setupProfileSection() {
    const profileList = document.getElementById('profileList');
    const addButton = document.getElementById('profileBtn');


// Profile başlığına kliklə "Add" düyməsini göstər/gizlət
document.querySelector('.profile h2').addEventListener("click", () => {
    addButton.classList.toggle('hidden');
});


    // Yeni profile bloku əlavə et
    addButton.addEventListener('click', () => {
        const profileBlock = document.createElement('div');
        profileBlock.className = 'profile-block';
        profileBlock.innerHTML = `
            <input type="text" placeholder="Profile information" class="profile-input">
            <div class="profile-action">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;

        profileList.appendChild(profileBlock);

        // Save və Cancel düymələrinə funksionalitet əlavə et
        const saveBtn = profileBlock.querySelector('.save-btn');
        const cancelBtn = profileBlock.querySelector('.cancel-btn');

        saveBtn.addEventListener('click', () => {
            const profile = profileBlock.querySelector('.profile-input').value;

            if (profile) {
                profileBlock.innerHTML = `
                    <p>${profile}</p>
                    <div class="profile-action">
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                attachEditDeleteListeners(profileBlock);
            }
        });

        cancelBtn.addEventListener('click', () => {
            profileList.removeChild(profileBlock);
        });
        
    });

    //Delete funksionallığı
    function attachEditDeleteListeners(block) {
        const deleteBtn = block.querySelector('.delete-btn');
    
        deleteBtn.addEventListener('click', () => {
            profileList.removeChild(block);
        });
    }
    
}

// Səhifə yüklənəndə işə sal
document.addEventListener('DOMContentLoaded', setupProfileSection);



// Work list bölməsi üçün dinamik funksiya
function setupWorkSection() {
    const workList = document.getElementById('workList');
    const addButton = document.getElementById('addWorkBtn');


    // Work Experience başlığına kliklə "Add" düyməsini göstər/gizlət
    document.querySelector('.work h2').addEventListener("click", () => {
        addButton.classList.toggle('hidden');
    });


    // Yeni is bloku əlavə et
    addButton.addEventListener('click', () => {
        const newWorkBlock = document.createElement('div');
        newWorkBlock.className = 'work-block';
        newWorkBlock.innerHTML = `
            <input type="text" placeholder="Place of work (e.g., Borchello Studio)" class="place-input">
            <input type="text" placeholder="Job Name" class="job-input">
            <textarea placeholder="Details (e.g., Developer)"></textarea>
            <div class="work-actions">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;
        workList.appendChild(newWorkBlock);

        // Save və Cancel düymələrinə funksionalliq əlavə et
        const saveBtn = newWorkBlock.querySelector('.save-btn');
        const cancelBtn = newWorkBlock.querySelector('.cancel-btn');

        saveBtn.addEventListener('click', () => {
            const place = newWorkBlock.querySelector('.place-input').value;
            const job = newWorkBlock.querySelector('.job-input').value;
            const details = newWorkBlock.querySelector('textarea').value;

            if (place && job) {
                newWorkBlock.innerHTML = `
                    <h3>${place} <br> </h3>
                    <p>${job} <br> </p>
                    <ul>${details.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
                    <div class="work-action">
                        <button class="delete-btn">Delete</button>
                    </div>
                `; 
                attachEditDeleteListeners(newWorkBlock);
            ;}
        });

        cancelBtn.addEventListener('click', () => {
            workList.removeChild(newWorkBlock);
        });
    });

    //Delete funksionallığı
    function attachEditDeleteListeners(block) {
        const deleteBtn = block.querySelector('.delete-btn');
    
        deleteBtn.addEventListener('click', () => {
            workList.removeChild(block);
        });
    }
}

// Səhifə yüklənəndə işə sal
document.addEventListener('DOMContentLoaded', setupWorkSection);

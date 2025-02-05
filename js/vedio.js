

// Get load data form fetch
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}


// category: "Music"
// ​
// category_id: "1001"

// Remove active button
const removeActiveClass= ()=>{
    const removeButton=document.getElementsByClassName('category-btn')
    for(const btn of removeButton){
        btn.classList.remove('active');
    }
}

// when click button show the specific vedio
function buttonOnclick(id) {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            // sobgula button remove koro
            removeActiveClass();

            // sobgula button active koro
            const activeButton = document.getElementById(`btn-${id}`);
            activeButton.classList.add("active");
            displayVideos(data.category)
        })
        .catch(err => console.log(err))

}

// Show display Categories

function displayCategories(categories) {
    const buttonContainer = document.getElementById('btn-container');

    categories.forEach((item) => {

        // create Button
        const buttonDiv = document.createElement('div');

        buttonDiv.innerHTML = `
        <button id="btn-${item.category_id}" onclick="buttonOnclick(${item.category_id})" class="btn category-btn">${item.category}</button>
        `;

        // appen container
        buttonContainer.append(buttonDiv);

    });
}

// Load vedios 

const loadVedios = (search = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
        .then(res => res.json(res))
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}


/// show time 

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hour}h ${minute}m ${second}s ago`
}

/// show Modal start here

const showModal= async(video_id)=>{
    console.log(video_id);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
    const res= await fetch(url);
    const data= await res.json();
    modalDisplay(data.video);
}

const modalDisplay=(video)=>{
    console.log(video);
    // way 1 to show modal
    // const showModalData= document.getElementById('show-modal-data').click();

    const modalContainer= document.getElementById('modal-content');
    modalContainer.innerHTML=`
    <img src="${video.thumbnail}"/>
    `;

    // way 2 to show modal
    document.getElementById('my_modal_2').showModal();
    
}



// Show load Videos 

function displayVideos(vedios) {
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = "";

    if (vedios.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex justify-center items-center gap-5">

        <img src="./assets/Icon.png"/>
        <h2 class="text-3xl font-bold">No Videos Upload Here</h2>
        
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add('grid');
    }





    vedios.forEach((video) => {
        // console.log(video);

        //Create div
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative ">
            <img
            src=${video.thumbnail} 
            class="w-full h-full object-cover"
            />
            ${video.others.posted_date?.length === 0 ? '' : `<span class="right-4 bottom-2 absolute bg-black rounded text-white text-sm px-1">${getTimeString(video.others.posted_date)}</span>`}
            
        </figure >

        <div class="px-0 py-2 flex gap-2">
            <div class="">
                <img class="h-10 w-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
            </div>

            <div>
              <h2 class="font-bold">${video.title}</h2>

                <div class="flex items-center gap-2">
                    <p>${video.authors[0].profile_name}</p>

                    ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"/>` : ""}
                    
                    
                </div>
            <div>
            <p class="py-2"><button onclick="showModal('${video.video_id}')" class="btn bg-red-200 rounded-lg ">details</button></p>
        </div>
        
        `;
        videoContainer.append(card);

    });
}

// search input

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVedios(e.target.value);

})



loadCategories();
loadVedios();
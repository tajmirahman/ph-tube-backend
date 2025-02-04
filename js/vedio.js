

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

// when click button show the specific vedio
function buttonOnclick(id){
   
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch(err => console.log(err))

}

// Show display Categories

function displayCategories(categories) {
    const buttonContainer = document.getElementById('btn-container');

    categories.forEach((item) => {

        // create Button
        const buttonDiv = document.createElement('div');
 
        buttonDiv.innerHTML= `
        <button onclick="buttonOnclick(${item.category_id})" class="btn">${item.category}</button>
        `;

        // appen container
        buttonContainer.append(buttonDiv);

    });
}

// Load vedios 

const loadVedios = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json(res))
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}

// {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//         "profile_name": "Jim Gaffigan",
//         "verified": false
//       }
//     ],
//     "others": {
//       "views": "2.6K",
//       "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
//   }


/// show time 

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hour}h ${minute}m ${second}s ago`
}


// Show load Videos 

function displayVideos(vedios) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerText= '';

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
        </div>
        
        `;
        videoContainer.append(card);

    });
}


loadCategories();
loadVedios();
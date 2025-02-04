// Get load data form fetch
const loadData= ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>loadCategories(data))
    .catch(err=>console.log(err))
}

// loadCategories

function loadCategories(data){

    console.log(data.categories)

}


loadData();
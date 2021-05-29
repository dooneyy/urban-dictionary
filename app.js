const form = document.querySelector('.form');

let searchQuery;
form.addEventListener('submit', submitQuery)

async function submitQuery(event) {
    event.preventDefault();
    let input = document.querySelector('.form-control');
    let searchQuery = input.value.trim();

    let searchResult = document.querySelector('.card-body');
    searchResult.innerHTML = '';
    
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('hidden');

    try {
        const results = await fetchQuery(searchQuery);

        showResult(results);
    } catch (err) {
        console.log(err);
        alert('cant fetch definitions')
    } finally {
        spinner.classList.add('hidden');
    }
}

async function fetchQuery(searchQuery) {
        const endpoint = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${searchQuery}`;
        const options = {
            method: "GET",
                headers: {
                    "x-rapidapi-key": "1e56e2e9d9msh7ef6beb84410fe7p19702ejsnc6fff15d2ef4",
                    "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
                    }
        };

        const response = await fetch(endpoint, options);
        const json = await response.json();
        return json;
}

function showResult(results) {
    let searchResult = document.querySelector('.card-body');
    results.list.forEach(result => {
        searchResult.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-5">
            <h4 class="text-success" style="text-transform: capitalize;">
            ${result.word}
            </h4>
            <figure>
                <blockquote class="blockquote">
                    <p class="mb-4"> ${result.definition}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                "${result.example}" <br> <cite class="mt-4 text-danger">By: ${result.author}</cite>
                </figcaption>
                </figure>
          </div>`
        );
    });

}










// fetch("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=wat", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "1e56e2e9d9msh7ef6beb84410fe7p19702ejsnc6fff15d2ef4",
// 		"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
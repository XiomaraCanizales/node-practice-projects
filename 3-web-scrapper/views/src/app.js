const feedDisplay = document.getElementById('feed')

fetch('http://localhost:8000/news')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(article => {
            const title = `<h3>` + article.title + `</h3>`
            feedDisplay.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err))
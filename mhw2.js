function inizialize() {
    for(var elemento of CONTENUTI){
        var container = document.createElement('div');
        container.classList.add('contenuto');
        const immagine = document.createElement('img');
        immagine.src = elemento.immagine;
        const title = document.createElement('span');
        title.textContent = elemento.titolo;
        const author = document.createElement('span');
        author.textContent = elemento.autore;
        const testo = document.createElement('span');
        testo.classList.add('titolo');
        testo.textContent = 'Clicca qui per vedere i brani o sull\'immagine per aggiungere l\'album ai preferiti';
        var titoli = document.createElement('ol');
        for(let titolo of elemento.brani) {
            const new_track = document.createElement('li');
            new_track.textContent = titolo;
            titoli.appendChild(new_track);
        }
        titoli.classList.add('hidden');
        container.appendChild(immagine);
        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(testo);
        container.appendChild(titoli);
        const section = document.querySelector('section');
        section.appendChild(container);
    }
}

function espandi(event) {
    event.currentTarget.parentNode.querySelector('ol').classList.remove('hidden');
    event.currentTarget.parentNode.querySelector('.titolo').textContent = 'Clicca qui per nascondere i brani';
    event.currentTarget.removeEventListener('click', espandi);
    event.currentTarget.addEventListener('click', riduci);
}

function riduci(event) {
    event.currentTarget.parentNode.querySelector('ol').classList.add('hidden');
    event.currentTarget.parentNode.querySelector('.titolo').textContent = 'Clicca qui per vedere i brani o sull\'immagine per aggiungere l\'album ai preferiti';
    event.currentTarget.removeEventListener('click', riduci);
    event.currentTarget.addEventListener('click', espandi);
}

function addFav(event) {
    document.querySelector('h3').classList.remove('hidden');
    document.querySelector('.preferiti').classList.remove('hidden');
    const container_preferiti = document.querySelector('.preferiti');
    const preferito = document.createElement('div');
    preferito.classList.add('album-preferito');
    const image = document.createElement('img');
    image.src = event.currentTarget.src;
    image.addEventListener('click', removeFav);
    preferito.appendChild(image);
    const title = document.createElement('span');
    title.textContent = event.currentTarget.parentNode.querySelector('span').textContent;
    preferito.appendChild(title);
    container_preferiti.appendChild(preferito);
    event.currentTarget.removeEventListener('click', addFav);
}

function removeFav(event) {
    const albums = document.querySelectorAll('.contenuto');
    for(let album of albums) {
        if(album.querySelector('span').textContent === event.currentTarget.parentNode.querySelector('span').textContent) {
            album.querySelector('img').addEventListener('click', addFav);
            event.currentTarget.parentNode.remove(self);
            if(document.querySelector('.album-preferito') === null) {
                document.querySelector('h3').classList.add('hidden');
                document.querySelector('.preferiti').classList.add('hidden');
            }
        }
    }

}

function filtra(event) {
    const albums = document.querySelectorAll('.contenuto');
    for(let album of albums) {
        if(album.querySelector('span').textContent.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) === -1) {
            album.classList.add('hidden');
            const brani = album.querySelectorAll('li');
            for(let brano of brani){
                if(brano.textContent.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) !== -1) {
                    album.classList.remove('hidden');
                }
            }    
        }
        else album.classList.remove('hidden');
        if(event.currentTarget.value === '') {
            album.classList.remove('hidden');
        }

    }
    
}

inizialize();
const albums = document.querySelectorAll('.contenuto');
for(let album of albums) {
    album.querySelector('.titolo').addEventListener('click', espandi);
}
for(let album of albums) {
    album.querySelector('img').addEventListener('click', addFav);
}
document.querySelector('input').addEventListener('keyup', filtra);


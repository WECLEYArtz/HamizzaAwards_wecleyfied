document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.manga-page');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    let currentPage = 0;

    function updateView() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPage ? 'block' : 'none';
            if (page.tagName === 'VIDEO') {
                page.pause();
                page.currentTime = 0;
                if (index === currentPage) {
                    page.play();
                }
            }
        });
        prevButton.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
        nextButton.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible';
    }

    prevButton.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateView();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateView();
        }
    });

    updateView();
});

document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.manga-page');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    let currentPage = 0;

    function updateView() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPage ? 'block' : 'none';
        });
        prevButton.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible';
        nextButton.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    }

    prevButton.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updateView();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateView();
        }
    });

    updateView();
});
document.addEventListener('DOMContentLoaded', () => {
const pages = document.querySelectorAll('.manga-page');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const pageNumber = document.getElementById('page-number');
const totalPages = document.getElementById('total-pages');
const pageSelect = document.getElementById('page-select');
let currentPage = 0;

function updateView() {
pages.forEach((page, index) => {
    page.style.display = index === currentPage ? 'block' : 'none';
    if (page.tagName === 'VIDEO') {
        page.pause();
        page.currentTime = 0;
        if (index === currentPage) {
            page.play();
        }
    }
});

pageNumber.textContent = currentPage + 1;
nextButton.style.visibility = currentPage === 0 ? 'hidden' : 'visible'; // Next button aligned for RTL
prevButton.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible'; // Prev button aligned for RTL
pageSelect.value = currentPage;
}

function populatePageSelect() {
totalPages.textContent = pages.length;
pageSelect.innerHTML = '';
pages.forEach((_, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Page ${index + 1}`;
    pageSelect.appendChild(option);
});
}

nextButton.addEventListener('click', () => {
if (currentPage > 0) {
    currentPage--;
    updateView();
}
});

prevButton.addEventListener('click', () => {
if (currentPage < pages.length - 1) {
    currentPage++;
    updateView();
}
});

pageSelect.addEventListener('change', (e) => {
currentPage = parseInt(e.target.value, 10);
updateView();
});

populatePageSelect();
updateView();
});


const BASE_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"

const HTMLbody: HTMLBodyElement = document.querySelector("body");

interface book {
    audience: string,
    author: string,
    color: string,
    id: number,
    pages: string,
    plot: string,
    publisher: string,
    title: string,
    year: string
}

async function getBooks() {
    let response = await fetch(BASE_URL);
    let data: book[] = await response.json();
    return data;
}

function createElem(name: string, tagName:string, ID?: number | string, className?: string) {
    const newElem: HTMLElement = document.createElement(tagName);
    if(ID != undefined) {
        newElem.id = name + "_" + ID;
    }
    if(className != undefined) {
        newElem.classList.add(className);
    }
    return newElem;
}

function switchScreen(screenToHide: HTMLElement, screenToShow: HTMLElement): void {
    screenToHide.classList.add("hidden");
    screenToShow.classList.remove("hidden");
}

async function main() {
    let books: book[] = await getBooks();

    const mainScreen: HTMLElement = createElem("mainScreen", "section", 1);

    const mainTitle: HTMLElement = createElem("mainTitle", "h1");
    mainScreen.append(mainTitle);
    mainTitle.innerText = "Classic children books";

    const subScreen: HTMLElement = createElem("subScreen", "section", 1, "hidden");
    HTMLbody.append(mainScreen, subScreen);

    const bookList: HTMLElement = createElem("bookList", "section", 1);
    mainScreen.append(bookList);

    for(let book of books) {
        let newBook: HTMLElement = createElem("book", "figure", book.id, "book");
        bookList.append(newBook);

        let newTitle: HTMLElement = createElem("title", "h3", book.id);
        let newAuthor: HTMLElement = createElem("author", "p", book.id);
        newBook.append(newTitle, newAuthor);
        
        newTitle.innerHTML = book.title;
        newAuthor.innerHTML = book.author;


        let newBookPage: HTMLElement = createElem("bookPage", "article", book.id, "hidden");
        subScreen.append(newBookPage);

        let pageTitle: HTMLElement = createElem("pageTitle", "h2", book.id);
        let pageAuthor: HTMLElement = createElem("pageAuthor", "h4", book.id);
        let pageSynopsis: HTMLElement = createElem("pageSynopsis", "article", book.id);
        let pageData: HTMLElement = createElem("pageData", "section", book.id, "pageData");
        let backBtn: HTMLElement = createElem("backBtn", "button", book.id);

        newBookPage.append(pageTitle, pageAuthor, pageSynopsis, pageData, backBtn);

        let audienceAge: HTMLElement = createElem("audienceAge", "p", book.id);
        let publishYear: HTMLElement = createElem("publishYear", "p", book.id);
        let numOfPages: HTMLElement = createElem("numOfPages", "p", book.id);
        let publisherName: HTMLElement = createElem("publisherName", "p", book.id);
        
        pageData.append(audienceAge, publishYear, numOfPages, publisherName);

        pageTitle.innerText = book.title;
        pageAuthor.innerText = book.author;
        pageSynopsis.innerText = book.plot;
        audienceAge.innerText = "Recommended for ages " + book.audience;
        publishYear.innerText = "Published in the year " + book.year;
        numOfPages.innerText = "Number of pages: " + book.pages;
        publisherName.innerText = "Published by " + book.publisher;
        backBtn.innerText = "Back to book selection";
        
        newBook.addEventListener("click", () => {
            switchScreen(mainScreen, subScreen);
            newBookPage.classList.remove("hidden");
            newBookPage.classList.add("bookPage");
        })

        backBtn.addEventListener("click", () => {
            switchScreen(subScreen, mainScreen);
            newBookPage.classList.add("hidden");
            newBookPage.classList.remove("bookPage");
        })
    }
}

main();
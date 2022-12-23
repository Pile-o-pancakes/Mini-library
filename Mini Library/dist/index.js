var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
const HTMLbody = document.querySelector("body");
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(BASE_URL);
        let data = yield response.json();
        return data;
    });
}
function createElem(name, tagName, ID, className) {
    const newElem = document.createElement(tagName);
    if (ID != undefined) {
        newElem.id = name + "_" + ID;
    }
    if (className != undefined) {
        newElem.classList.add(className);
    }
    return newElem;
}
function switchScreen(screenToHide, screenToShow) {
    screenToHide.classList.add("hidden");
    screenToShow.classList.remove("hidden");
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let books = yield getBooks();
        const mainScreen = createElem("mainScreen", "section", 1);
        const mainTitle = createElem("mainTitle", "h1");
        mainScreen.append(mainTitle);
        mainTitle.innerText = "Classic children books";
        const subScreen = createElem("subScreen", "section", 1, "hidden");
        HTMLbody.append(mainScreen, subScreen);
        const bookList = createElem("bookList", "section", 1);
        mainScreen.append(bookList);
        for (let book of books) {
            let newBook = createElem("book", "figure", book.id, "book");
            bookList.append(newBook);
            let newTitle = createElem("title", "h3", book.id);
            let newAuthor = createElem("author", "p", book.id);
            newBook.append(newTitle, newAuthor);
            newTitle.innerHTML = book.title;
            newAuthor.innerHTML = book.author;
            let newBookPage = createElem("bookPage", "article", book.id, "hidden");
            subScreen.append(newBookPage);
            let pageTitle = createElem("pageTitle", "h2", book.id);
            let pageAuthor = createElem("pageAuthor", "h4", book.id);
            let pageSynopsis = createElem("pageSynopsis", "article", book.id);
            let pageData = createElem("pageData", "section", book.id, "pageData");
            let backBtn = createElem("backBtn", "button", book.id);
            newBookPage.append(pageTitle, pageAuthor, pageSynopsis, pageData, backBtn);
            let audienceAge = createElem("audienceAge", "p", book.id);
            let publishYear = createElem("publishYear", "p", book.id);
            let numOfPages = createElem("numOfPages", "p", book.id);
            let publisherName = createElem("publisherName", "p", book.id);
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
            });
            backBtn.addEventListener("click", () => {
                switchScreen(subScreen, mainScreen);
                newBookPage.classList.add("hidden");
                newBookPage.classList.remove("bookPage");
            });
        }
    });
}
main();

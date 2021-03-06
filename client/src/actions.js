export const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_REQUEST = "GET_BOOKS_REQUEST";




export function getBooksFailure(error) {
    return {
        type: GET_BOOKS_FAILURE,
        error
    };
}

export function getBooksSuccess(data) {
    return {
        type: GET_BOOKS_SUCCESS,
        data
    };
}

export function getBooksRequest() {
    return {
        type: GET_BOOKS_REQUEST
    };
}


export function getBooks(searchText) {
    return (dispatch) => {
        //dispatch request to state
        dispatch(getBooksRequest());
        //call the goodreads api for searching on text
        fetch(`api/search?q=${searchText}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response not ok")
                }
                return response.json();
            })
            .then((books) => {
                console.log(books);
                dispatch(getBooksSuccess(books));
            })
            .catch((error) => {
                dispatch(getBooksFailure(error));
            });
    };
}

export const REQUEST_SELECTED_BOOK = "REQUEST_SELECTED_BOOK";
export const SELECTED_BOOK_SUCCESS = "SELECTED_BOOK_SUCCESS";
export const SELECTED_BOOK_FAILURE = "SELECTED_BOOK_FAILURE";
export const CLEAR_SELECTED_BOOK = "CLEAR_SELECTED_BOOK";

export function selectedBookSuccess(data) {
    return {
        type: SELECTED_BOOK_SUCCESS,
        data
    };
}

export function requestSelectedBook() {
    return {
        type: REQUEST_SELECTED_BOOK
    };
}
export function selectedBookFailure(error) {
    return {
        type: SELECTED_BOOK_FAILURE,
        error
    };
}
export function clearSelectedBook() {
    return {
        type: CLEAR_SELECTED_BOOK
    };
}

export function getSelectedBook(id) {
    return (dispatch) => {
        //dispatch request to state
        dispatch(requestSelectedBook());
        //call the goodreads api for searching on text
        fetch(`api/books/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response not ok");
                }
                return response.json();
            })
            .then((json) => {
                //let reviews = json;
                const book = {
                    title: json.title[0],
                    id: json.id[0],
                    image_url: json.image_url[0],
                    description: json.description[0],
                    author: json.authors[0].author[0].name[0],
                    reviews_widget: json.reviews_widget[0]
                };
                //clean up json response
                dispatch(selectedBookSuccess(book));
            })
            .catch((error) => {
                dispatch(selectedBookFailure(error));
            });
    };
}

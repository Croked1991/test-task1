import axios from "axios"
import { addUsersSlice } from "./AddUsersSlice";

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const countOfItems = getRandomIntInclusive(5, 15)


export const fetchUsers = (pagesCount) => async (dispatch) => {
    try {
        dispatch(addUsersSlice.actions.getUsers())
        const responseUsers = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        dispatch(addUsersSlice.actions.getUsersSuccess(responseUsers.data))
        const responsePosts = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${countOfItems}&_page=${pagesCount}`)
        dispatch(addUsersSlice.actions.getPostsSuccess(responsePosts.data))
        const responsePhotos = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
        dispatch(addUsersSlice.actions.getPhotosSuccess(responsePhotos.data))
        dispatch(addUsersSlice.actions.addPostsToUsers())
        dispatch(addUsersSlice.actions.setTotalCount(responsePosts.headers['x-total-count']))
    } catch (e) {
        dispatch(addUsersSlice.actions.getUsersError(e.message))
    }
}
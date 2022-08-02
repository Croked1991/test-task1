import { createSlice } from "@reduxjs/toolkit";
import { getRandomIntInclusive, shuffleArray } from "./ActionCreators";

const initialState = {
    users: [
    ],
    posts: [
    ],
    photos: [
    ],
    postsWithUsers: [
    ],
    postsWithUsersAndPhotos: [
    ],
    isLoading: false,
    error: '',
    pagesCount: 1,
    totalCount: 1
}

export const addUsersSlice = createSlice({
    name: 'addUsers',
    initialState,
    reducers: {
        getUsers(state) {
            state.isLoading = true
        },
        getUsersSuccess(state, action) {
            state.isLoading = false
            state.error = ''
            state.users = [...state.users, ...action.payload]
        },
        getUsersError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        setUsersPagesCount(state) {
            state.pagesCount = state.pagesCount + 1
        },
        getPostsSuccess(state, action) {
            state.isLoading = false
            state.error = ''
            state.posts = [...state.posts, ...action.payload]
        },
        getPhotosSuccess(state, action) {
            state.isLoading = false
            state.error = ''
            state.photos = [...state.photos, ...action.payload]
        },
        addPostsToUsers(state) {
            const photoId = getRandomIntInclusive(0, 49)
            console.log(photoId);
            state.postsWithUsers = state.posts.map(el => {
                return {
                    ...el,
                    company: state.users.filter(e => e.id === el.userId)[0].company.name,
                    name: state.users.filter(e => e.id === el.userId)[0].name,
                    photo: state.photos.filter(ph => ph.albumId === el.userId)[photoId].thumbnailUrl
                }
            })
            console.log(state.postsWithUsers)
        },
        addPhotosToUsersWithPosts(state) {
            console.log(state.postsWithUsersAndPhotos)
        },
        setTotalCount(state, action) {
            state.totalCount = action.payload
        }
    }
})

export const addUsersReducer = addUsersSlice.reducer
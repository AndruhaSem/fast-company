import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentsRemove: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentsCreated,
    commentsRemove
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const deleteComments = (userId) => async (dispatch) => {
    console.log(userId);
    try {
        await commentService.removeComment(userId);
        dispatch(commentsRemove(userId));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createCommentt =
    (payload, userId, currentUserId) => async (dispatch) => {
        const comment = {
            ...payload,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentsCreated(content));
        } catch (error) {
            dispatch(commentsRequestFailed(error.message));
        }
    };

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;

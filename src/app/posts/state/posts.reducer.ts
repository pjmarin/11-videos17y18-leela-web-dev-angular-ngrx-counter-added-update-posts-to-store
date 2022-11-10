import { createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';
import { addPost, updatePost } from './posts.actions';
import { Post } from '../../models/posts.model';

const _postsReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        let post = { ...action.post };

        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [ ...state.posts, post ]
        };
    }),
    on(updatePost, (state: PostsState, action: any) => {
        const updatedPosts = state.posts.map((post: Post) => {
            return action.post.id === post.id ? action.post : post;
        });

        return {
            ...state,
            posts: updatedPosts
        };
    })
);

export function postsReducer(state: PostsState = initialState, action: any) {
  return _postsReducer(state, action);
}
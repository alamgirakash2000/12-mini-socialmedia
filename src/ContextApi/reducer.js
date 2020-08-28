export const initialState = {
  posts: [],
  myPosts: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.item,
      };

    case "SET_MY_POST":
      console.log(state.posts);
      console.log(
        state.posts.filter((post) => post?.userId === state.user?.id)
      );
      return {
        ...state,
        myPosts: state.posts.filter(
          (post) => post.post?.userId === state.user?.id
        ),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;

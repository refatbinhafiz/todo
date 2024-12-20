import { apiSlice } from "../api/apiSlice";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ email, queryString }) => ({
        url: `/todo/todos/${email}?${queryString}`,
        method: "GET",
      }),
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: `/todo/addtodo`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        
        
        const email = result.data?.todo?.user?.email;
        const queryString = "";
        if (result?.data?.status == "success") {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTodos",
              { email, queryString },
              (draft) => {
                console.log(JSON.stringify(draft?.todos));
                draft?.todos.unshift(result?.data?.todo);
              }
            )
          );
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todo/deletetodo/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        
        

        const queryString = "";

        if (result?.data?.status == "success") {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTodos",
              { email: arg?.email, queryString: queryString },
              (draft) => {
                
                console.log(JSON.stringify(draft?.todos));
                const filterDraft = draft?.todos?.filter(
                  (d) => d?._id !== arg?.id
                );

                return {
                  ...draft,
                  todos: filterDraft,
                };
              }
            )
          );
        }
      },
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `todo/edittodo/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const email = result?.data?.todo?.user?.email;
        const updatedTodo = result?.data?.todo;
        
        const queryString = "";
        

        if (result?.data?.status == "success") {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTodos",
              { email: email, queryString: queryString },
              (draft) => {
                
                console.log(JSON.stringify(draft?.todos));
                const findDraft = draft?.todos?.find((d) => d?._id == arg?.id);
                console.log(JSON.stringify(findDraft));
                findDraft.title = updatedTodo?.title;
                findDraft.description = updatedTodo?.description;
                findDraft.category = updatedTodo?.category;
                findDraft.createdAt = updatedTodo?.createdAt;
                findDraft.updatedAt = updatedTodo?.updatedAt;
                findDraft.complete = updatedTodo?.complete;
                findDraft.user = updatedTodo?.user;
              }
            )
          );
        }
      },
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category/categories`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetCategoriesQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoApi;

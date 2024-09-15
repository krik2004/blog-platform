import { baseApi } from "../../shared/apiSlice";

export const signInApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json", // Убедитесь, что заголовок установлен
        },
      }),
    }),
  }),
  overrideExisting: true,
});

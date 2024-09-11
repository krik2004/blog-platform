import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../shared/apiSlice'

// export const fetchApi = createAsyncThunk(
// 	'filter/fetchID',
// 	async function getDate(_, { rejectWithValue, dispatch }) {
// 		try {
// 			const response = await fetch('https://blog.kata.academy/api/articles')
// 			const data = response.json()
// 			console.log(data)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// )

// const blogSlice = createSlice({
// 	name: 'blogData',
// 	initialState: {
//         posts:[],
//         loading: false,
//     },
// 	reducers: {},
// 	extraReducers: {},
// 	selectors: {},
// })

// 3. **Настройка Redux Store**

// Теперь нужно добавить `apiSlice.reducer` в ваш Redux store.

// import { configureStore } from '@reduxjs/toolkit';
// import apiReducer from '../shared/apiSlice'; // Импортируйте ваш apiSlice

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(baseApi.middleware), // Добавьте middleware RTK Query
})

export default store

// ### Объяснение кода

// - **API Slice**: Здесь мы определяем, как взаимодействовать с API. У нас есть эндпоинты для получения всех карточек,
// получения карточки по ID и добавления новой карточки.
// - **Store**: Мы добавляем редьюсер API в Redux store и настраиваем middleware.
// - **Компоненты**: В компоненте `CardsList` мы используем хук `useGetCardsQuery` для получения данных
// и `useAddCardMutation` для добавления новой карточки.

// Таким образом, RTK Query упрощает работу с асинхронными запросами и управлением состоянием в Redux.

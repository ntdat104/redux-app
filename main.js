const { createStore } = window.Redux;

const initialState = {
	hobbyList: JSON.parse(localStorage.getItem("hobby_list")) || [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_HOBBY":
			const newState = {
				...state,
				hobbyList: [...state.hobbyList, action.payload],
			};
			return newState;
		default:
			return state;
	}
};

const store = createStore(rootReducer);

const renderHobbyList = (hobbyList) => {
	//* validate hobbyList
	if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

	//* check ul-hobbyList
	const ulElement = document.querySelector("#hobbyList");
	if (!ulElement) return;

	//* remove old-ul-hobbyList
	ulElement.innerHTML = "";

	//* create li-hobbyItem
	for (const hobby of hobbyList) {
		const liElement = document.createElement("li");
		liElement.textContent = hobby;

		ulElement.appendChild(liElement);
	}
};
renderHobbyList(store.getState().hobbyList);

const hobbyFormElement = document.querySelector("#hobbyForm");
//* check form-hobbyForm
if (hobbyFormElement) {
	const handleFormSubmit = (e) => {
		e.preventDefault();

		//* check input-hobbyText
		const hobbyTextElement = hobbyFormElement.querySelector("#hobbyText");
		if (!hobbyTextElement) return;

		//* validate input-value
		if(!hobbyTextElement.value) return;

		const action = {
			type: "ADD_HOBBY",
			payload: hobbyTextElement.value,
		};

		store.dispatch(action);
		hobbyFormElement.reset();
	};

	hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
	const newState = store.getState();
	localStorage.setItem("hobby_list", JSON.stringify(newState.hobbyList))
	renderHobbyList(newState.hobbyList);
});

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
				,
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			deleteContact: (indexToDelete) => {
				console.log('deleteContact')
				//get the store
				const store = getStore();
				console.log(store.contacts)
				console.log(store.contacts.filter( (item, index)=> index!= indexToDelete ))
				// setStore({ contacts: store.contacts.filter( (item, index)=> index!= indexToDelete ) });

				var requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
				  };
				  
				  fetch("https://playground.4geeks.com/apis/fake/contact/" + indexToDelete, requestOptions)
					.then(response => response.text())
					.then(result =>{
						 console.log(result)
						 console.log('mas')
						 console.log('procesos')

						 fetch('https://playground.4geeks.com/apis/fake/contact/agenda/diego_sp49_agenda')
						.then( (response)=> response.json())
						.then( (data)=> setStore({ contacts: data }) )

						})
					.catch(error => console.log('error', error));
			},
			loadSomeData: () => {
				console.log('loadSomeData')
				// setStore({ contacts: [
				// 	{
				// 		full_name: "Caragado 1 desde flux",
				// 		email: "d@mail.com"
				// 	},
				// 	{
				// 		full_name: "cargado 2 desde flux",
				// 		email: "e@mail.com"
				// 	}				
				// ] });

				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/diego_sp49_agenda')
				.then( (response)=> response.json())
				.then( (data)=> setStore({ contacts: data }) )
				
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

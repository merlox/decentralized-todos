// Remember that we are using ropsten for this application. Once completed we may deploy it to the mainnet for public use
window.web3 = new Web3(window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider('https://ropsten.infura.io'));

const contractABI = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"todos","outputs":[{"name":"id","type":"uint256"},{"name":"content","type":"bytes32"},{"name":"owner","type":"address"},{"name":"isCompleted","type":"bool"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxAmountOfTodos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_content","type":"bytes32"}],"name":"addTodo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_todoId","type":"uint256"}],"name":"markTodoAsCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0xe8ed349ed7325d910534c5930f51f3c9289a5c06'
const contractInstance = web3.eth.contract(contractABI).at(contractAddress)
const maxAmountOfTodos = 100

// This will contain the todos in html. We initialize it to an empty string to avoid having an undefined value
let todos = ''

// Gets all the todos one by one
async function generateTodos() {
	let firstTodo = await getSingleTodo(0)
	if(web3.toUtf8(firstTodo[1]).length === 0) {
		todos = `
		<div class="main-container">
			<h4 class="title-todos">Your To-Dos</h4>
			<input type="text" placeholder="New to-do content..." id="add-todo-input" />
			<button class="add-todo" onClick="addTodo(document.querySelector('#add-todo-input').value)">Add To-Do</button>
			<div class="my-todos">You don't have any todos yet</div>
		</div>`
	} else {
		todos += '<ul class="my-todos">'
		for(let i = 0; i < maxAmountOfTodos; i++) {
			let todo = await getSingleTodo(i)
			let todoContent = web3.toUtf8(todo[1])

			// If the todo content is empty, stop checking all the todos
			if(todoContent.length === 0) break
			else todos += `<li id="${parseInt(todo[0])}">${todoContent}</li>`
		}
		todos += '</ul>'
	}
	document.querySelector('#root').innerHTML += todos
}

// Get a specific to-do with a promise for using await async
function getSingleTodo(index) {
	return new Promise((resolve, reject) => {
		contractInstance.todos(web3.eth.accounts[0], index, (err, todo) => {
			if(err) reject(err)
			resolve(todo)
		})
	})
}

function addTodo(content) {
	if(content.length <= 0) {
		return alert('You need to write some content to the to-do note before adding it to the smart contract')
	}
	contractInstance.addTodo(content)
	console.log('called', content)
}

generateTodos()

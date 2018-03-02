const TodoList = artifacts.require('./TodoList.sol')
const assert = require('assert')
let todoInstance

contract('TodoList', (accounts) => {
    beforeEach(async () => {
        todoInstance = await TodoList.deployed()
    })

    it('should add a to-do successfully with addTodo() and a short text', async () => {
        // Add a new todo
        await todoInstance.addTodo('example')
        // Check that it has been added
        const newAddedTodo = await todoInstance.todos(accounts[0], 0)
        const todoContent = web3.toUtf8(newAddedTodo[1])
        assert.equal(todoContent, 'example', 'The content of the new added todo is not correct')
    })
    it('should not allow to add empty notes', async () => {
        try {
            await todoInstance.addTodo('')
            assert.ok(false, 'The contract should reject an empty todo')
        } catch(e) {
            assert.ok(true, 'The contract is not allowing to add an empty to-do, which is correct')
        }
    })
    it('should mark one of your to-dos as completed', async () => {
        await todoInstance.addTodo('example')
        await todoInstance.markTodoAsCompleted(0)
        const lastTodoAdded = await todoInstance.todos(accounts[0], 0)
        const isTodoCompleted = lastTodoAdded[3] // 3 is the bool isCompleted value of the todo note
        assert(isTodoCompleted, 'The todo should be true as completed')
    })
    it('should not allow external users to mark others to-dos as completed', async () => {
        try {
            // Here we're trying to mark an new todo as completed even though it hasn't been created and you're not the owner of it
            await todoInstance.markTodoAsCompleted(0, {
                from: accounts[1]
            })
            assert.ok(false, 'The contract should reject this case')
        } catch(e) {
            assert.ok(true, 'The contract is not allowing external users to mark others to-dos as completed')
        }
    })
})

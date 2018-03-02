const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
    it('should add a to-do successfully with addTodo() and a short text', async () => {
        console.log(TodoList)
        // console.log(Object.keys(TodoList))
    })
    it('should not allow to add empty notes')
    it('should mark one of your to-dos as completed')
    it('should not allow external users to mark your to-dos as completed')
})

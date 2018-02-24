pragma solidity 0.4.20;

contract TodoList {
	struct Todo {
		uint256 id;
		bytes32 content;
		address owner;
		bool isCompleted;
		uint256 timestamp;
	}
    uint256 public lastId;
    uint256 public constant maxAmountOfTodos = 100;

	// Owner => todos
	mapping(address => Todo[maxAmountOfTodos]) public todos;

	modifier onlyOwner(address _owner) {
	    require(msg.sender == _owner);
	    _;
	}

    // Add a todo to the list
	function addTodo(bytes32 _content) public {
		Todo memory myNote = Todo(lastId, _content, msg.sender, false, now);
		todos[msg.sender][lastId] = myNote;
		if(lastId >= maxAmountOfTodos) lastId = 0;
		else lastId++;
	}

    // Mark a todo as completed
	function markTodoAsCompleted(uint256 _todoId) public onlyOwner(todos[msg.sender][_todoId].owner) {
	    require(_todoId < maxAmountOfTodos);
		require(!todos[msg.sender][_todoId].isCompleted);

		todos[msg.sender][_todoId].isCompleted = true;
	}
}

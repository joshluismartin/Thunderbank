export class ExpenseItem {
	constructor(name, cost, owner) {
		this.id = Date.now(); // Unique identifier based on timestamp
		this.name = name;
		this.cost = cost;
		this.owner = owner;
	}

	update(name, cost) {
		this.name = name;
		this.cost = cost;
	}
}

export class User {
	constructor(email, password, name, accountBalance) {
		this.email = email;
		this.password = password; // In real app, password should be hashed
		this.name = name;
		this.accountBalance = accountBalance;
		this.expenseItems = [];
	}

	addExpenseItem(name, cost) {
		const expenseItem = new ExpenseItem(name, cost, this.email);
		this.expenseItems.push(expenseItem);
		this.accountBalance -= cost; // Deduct the cost from the account balance
	}

	deleteExpenseItem(expenseItemId) {
		this.expenseItems = this.expenseItems.filter(item => item.id !== expenseItemId);
	}

	listExpenseItems() {
		return this.expenseItems;
	}
}

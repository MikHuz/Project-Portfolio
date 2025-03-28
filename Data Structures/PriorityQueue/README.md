# Service Center Queue Simulation

This program simulates a **service center** where people are added to a queue based on their **priority**. The person with the **highest priority** (smallest number) is served first, following a **FIFO approach** for people with the same priority. It assumes input is correct and does not check for duplicate names.

### Features:
- **Priority-based queueing** where people with the lowest priority number are served first.
- **FIFO** (First In, First Out) approach for people with the same priority number.
  
### Commands:
1. **`Add <name> <priority>`** – Adds a person to the queue with the specified **priority**.
2. **`Delete`** – Removes and prints the highest priority person from the queue.
3. **`List`** – Displays all people in the queue in order of **priority**.

### Usage:
1. The program starts by reading an **integer** representing the number of people to be added to the queue.
2. Then, it reads **name-priority pairs** (e.g., "Alice 2") for each person.
3. Next, it reads an **integer** representing the number of commands to process.
4. Commands such as **Add**, **Delete**, and **List** are executed based on user input.

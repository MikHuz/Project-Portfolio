## Hash Table Implementation with Separate Chaining and Dynamic Resizing

This program implements a **hash table** using **separate chaining** to handle collisions. The table is represented as an **ArrayList of LinkedLists**, where each bucket stores a linked list of integer values that hash to the same index.

### Features:
- **Handles collisions** using separate chaining.
- **Dynamically resizes (rehashing)** when the load factor exceeds **0.75**.
- **Efficient insertion, deletion, and search operations**.

### Supported Operations:
1. **`insert <value>`** – Adds a value to the hash table. Triggers **rehashing** if the load factor exceeds **0.75**.
2. **`delete <value>`** – Removes the specified value from the hash table.
3. **`search <value>`** – Checks if a value exists in the hash table and returns `true` or `false`.
4. **`displayStatus <bucketIndex>`** – Displays the contents of a specific **bucket**.
5. **`tableSize`** – Returns the **current size** of the hash table.

### Usage:
- The **initial table size** is provided by the user.
- A series of commands can be used to **manipulate the hash table**.

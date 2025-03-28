## Max Heap

This program simulates a **max-heap** data structure. It allows the user to perform various operations, such as:

- Inserting new elements
- Deleting the maximum element (root)
- Checking if the current structure is a valid heap
- Displaying the heap's contents

The program uses **heapify methods** to maintain the heap property during insertions and deletions.

### Input Format:
1. `<length of heap>`  
2. `<heap values>`  
3. `<number of commands>`  
4. Any of the following commands can be used:
   - **`display`** - Displays the current elements in the heap.
   - **`displayMax`** - Displays the maximum element (root) of the heap.
   - **`insert <value>`** - Inserts a new element into the heap.
   - **`deleteMax`** - Removes the maximum element and re-adjusts the heap.

## Max Heap
 *This program simulates a max-heap int data structure. It allows the user to perform operations 
 * such as inserting new elements, deleting the maximum element (root), checking if the 
 * current structure is a valid heap, and displaying the heap's contents. The program uses 
 * heapify methods to maintain the heap property during insertions and deletions. 
 * Input:
 *   <length of heap>
 *   <heap values>
 *   <number of commands>
 *   Any of the following commands can be inputted:
 *  - "display" - Displays the current elements in the heap.
 *  - "displayMax" - Displays the maximum element (root) of the heap.
 *  - "insert <value>" - Inserts a new element into the heap.
 *  - "deleteMax" - Removes the maximum element from the heap and re-adjusts the structure.
 * Example:
 *  5
 *  10 20 30 40 70
 *  5
 *  displayMax
 *  insert 50
 *  insert 15
 *  deleteMax
 *  display
 * 
 *  Output:
 *   This is NOT a heap.
 *   70
 *   50 40 30 10 20 15
 

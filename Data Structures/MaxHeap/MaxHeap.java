//Michael Huziy
/*
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
 */
import java.util.*;
class MaxHeap
{

    public static void heapify(int[] arr, int parent){
        int leftChild = 2*parent;
        int rightChild = 2*parent+1;
        int val = arr[parent];
        int index = parent;

        if (leftChild <= arr.length-1 && arr[index] < arr[leftChild]){
            index= leftChild;
        }
        if (rightChild <= arr.length-1 && arr[index] < arr[rightChild]){
            index = rightChild;
        }
        if (index != parent){
            int temp = arr[parent];
            arr[parent] = arr[index];
            arr[index] = temp;
            heapify(arr, index);
        }    

       
    }
    public static void createHeap(int[] array){
        int lastChild = array.length-1;
    
        for (int lastParent = array.length / 2;lastParent>0;lastParent--){
            heapify(array, lastParent);
        }

    }

    public static String determineHeap(int[] array){
        int lastParent = array.length / 2;
        int lastChild = array.length-1;
       // System.out.println("All parents and their children:");
        for (int i =1;i<=lastParent;i++){
           // System.out.print("Parent " + array[i] + " has children  ");
            if (2*i <= lastChild) {
                if (array[i] < array[2*i]){
                    createHeap(array);
                    return "This is NOT a heap.";
                }
                //System.out.print(array[2*i]); 
            }
            
            if (2*i+1 <= lastChild) {
                if (array[i] < array[2*i+1]){
                    createHeap(array);
                    return "This is NOT a heap.";
                   
                }
                //System.out.print(" and " + array[2*i+1]); 
            }
            //System.out.println();
        }
        return "This is a heap.";
    }

    public static String display(int[] heap){
        String temp = "";
        for(int i =1;i<heap.length;i++){
            temp += heap[i] + " ";
        }
      return temp;
    }

    public static void heapifyUp(int[] heap, int currentIndex){
        if (currentIndex > 1){
        int parentIndex = currentIndex / 2;
        if (heap[parentIndex] < heap[currentIndex]){
            int temp = heap[parentIndex];
            heap[parentIndex] = heap[currentIndex];
            heap[currentIndex] = temp;
            currentIndex = parentIndex;
            heapifyUp(heap, currentIndex);
        }
    }
    }
    public static int[] insert(int[] heap, int num,int newIndex){
        int[] newHeap = Arrays.copyOf(heap, heap.length+1);
        newHeap[newIndex] = num;
        heapifyUp(newHeap,newIndex);
        return newHeap;
    }

    public static int displayMax(int[] heap){
        return heap[1];
    }
    public static void heapifyDown(int[] heap, int currentIndex){
        int leftChild = 2*currentIndex;
        int rightChild = 2*currentIndex+1;
        int indexLargest = currentIndex;
        if (leftChild <=heap.length-1 && heap[leftChild] > heap[indexLargest]){
            indexLargest = leftChild;
        }
        if (rightChild <= heap.length-1 && heap[rightChild] > heap[indexLargest]){
            indexLargest = rightChild;
        }

        if (indexLargest != currentIndex){
            int parent = heap[currentIndex];
            heap[currentIndex] = heap[indexLargest];
            heap[indexLargest] = parent;
            heapifyDown(heap,indexLargest);
        }
    }
    public static int[] deleteMax(int[] heap){
        int lastChild = heap.length-1;
        heap[1] = heap[lastChild];
        int[] newHeap = Arrays.copyOf(heap,heap.length-1);
        heapifyDown(newHeap,1);
        return newHeap;

    }
    public static void main(String[] args) 
    {

        Scanner scan = new Scanner(System.in);
        int size = scan.nextInt();scan.nextLine();
        String line = scan.nextLine();
        String nums[] = line.split(" ");
        int array[] = new int[size+1];

        for (int i = 0;i<size;i++){
            array[i+1] = Integer.parseInt(nums[i]);
        }
        String builder = "";
        builder += determineHeap(array) + "\n";
        int numCommands = scan.nextInt();scan.nextLine();
      
        
        for (int i = 0; i < numCommands; i++) {
            line = scan.nextLine();
            String[] command = line.split(" ");
            
            switch (command[0]) {
                case "display":
                    builder += display(array) + "\n";
                    break;
                case "displayMax":
                    builder += displayMax(array) + "\n";
                    break;
                case "insert":
                    array = insert(array, Integer.parseInt(command[1]), array.length);
                    break;
                case "deleteMax":
                    array = deleteMax(array);
                    break;
                default:
                    System.out.println("Unknown command: " + command[0]) ;i--;
                    break;
            }
        }
        System.out.println(builder);
      
    }
}


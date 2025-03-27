/* HashTable Implementation with Separate Chaining and Dynamic Resizing (Rehashing)
 * 
 * This is an implemention of a a basic hash table using separate chaining to handle collisions. The table 
 * is implemented as an ArrayList of LinkedLists where each bucket stores a linked list of integer values 
 * that hash to the same index.
 * 
 * The hash table supports the following operations:
 * 1. Insert: Adds a value to the hash table, rehashing if the load factor exceeds 0.75.
 * 2. Delete: Removes a specified value from the hash table.
 * 3. Search: Searches for a value in the hash table and returns whether it's found.
 * 4. DisplayStatus: Displays the contents of a specific bucket.
 * 5. TableSize: Returns the current size of the hash table.
 * 
 *  Usage:
 * - The user provides the initial table size and a series of commands to manipulate the hash table.
 * - Commands supported include "insert <value>", "delete <value>", "search <value>", 
 *   "displayStatus <bucketIndex>", and "tableSize".*/

import java.util.*;

class HashTable {
    private static ArrayList<LinkedList<Integer>> table;  
    private static int size = 0;
    private static double numKeys = 0;
    private static int prime = 0;
    private static double loadFactor = 0.75;
    
    HashTable(int size) {
        if (size > 5) {
            while (!determinePrime(size)) {
                size += 1;
            }
        } else if (size == 4) {
            this.size = 5;
            prime = 5;
        }
        this.size = size;
        prime = size;
        
        table = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            table.add(new LinkedList<Integer>());
        }
    }
    
    private static boolean determinePrime(int number) {
        for (int i = 2; i <= Math.sqrt(number); i++)
            if (number % i == 0) {
                return false;
            }
        return true;
    }
    
    private static int hashCode(int key) {
        return key % prime;
    }

    public static void insert(int newValue) {
        int bucketIndex = hashCode(newValue);
        if (table.get(bucketIndex).isEmpty()) {
            table.get(bucketIndex).push(newValue);
        } else {
            table.get(bucketIndex).addFirst(newValue);
        }
        numKeys += 1;
        double currentLoadFactor = numKeys / size;
        if (currentLoadFactor > loadFactor) {
            rehash();
        }
    }

    private static void rehash() {
        size = size * 2;
        if (size > 5) {
            while (!determinePrime(size)) {
                size += 1;
            }
        } else if (size == 4) {
            size = 5;
            prime = 5;
        }
        prime = size;
        ArrayList<LinkedList<Integer>> newTable = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            newTable.add(new LinkedList<Integer>());
        }

        for (LinkedList<Integer> list : table) {
            if (!list.isEmpty()) {
                ListIterator<Integer> it = list.listIterator();
                while (it.hasNext()) {
                    int oldVal = it.next();
                    int bucketIndex = hashCode(oldVal);
                    if (newTable.get(bucketIndex).isEmpty()) {
                        newTable.get(bucketIndex).push(oldVal);
                    } else {
                        newTable.get(bucketIndex).addFirst(oldVal);
                    }
                }
            }
        }
        table = new ArrayList<>(newTable);
    }
    
    public static void delete(int value) {
        int bucketIndex = hashCode(value);
        int i = 0;
        for (Integer num : table.get(bucketIndex)) {
            if (num == value) {
                table.get(bucketIndex).remove(i);
                break;
            }
            i += 1;
        }
    }

    public static String search(int searchVal) {
        int bucketIndex = hashCode(searchVal);
        for (Integer num : table.get(bucketIndex)) {
            if (num == searchVal) {
                return searchVal + " Found";
            }
        }
        return searchVal + " Not found";
    }

    public static String displayStatus(int entry) {
        String temp = "";
        if (table.get(entry).isEmpty()) {
            return "Empty";
        }
        ListIterator<Integer> it = table.get(entry).listIterator();
        temp += it.next();
        while (it.hasNext()) {
            temp += "->";
            int value = it.next();
            temp += value;
        }
        return temp;
    }

    public static int tableSize() {
        return size;
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int tableSize = scan.nextInt(); scan.nextLine();

        HashTable table = new HashTable(tableSize);
        int numCommands = scan.nextInt(); scan.nextLine();
        String builder = "";
        for (int i = 0; i < numCommands; i++) {
            String nextCommand = scan.nextLine();
            String[] data = nextCommand.split(" ");
            if (data[0].equals("insert")) {
                table.insert(Integer.parseInt(data[1]));
            } else if (data[0].equals("delete")) {
                table.delete(Integer.parseInt(data[1]));
            } else if (data[0].equals("search")) {
                builder += table.search(Integer.parseInt(data[1])) + "\n";
            } else if (data[0].equals("displayStatus")) {
                builder += table.displayStatus(Integer.parseInt(data[1])) + "\n";
            } else if (data[0].equals("tableSize")) {
                builder += table.tableSize() + "\n";
            } else {
                System.out.println("Unknown Command");
                i--;
            }
        }
        System.out.println(builder);
    }
}

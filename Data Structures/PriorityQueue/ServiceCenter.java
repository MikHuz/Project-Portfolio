/*
 * Abstract: This program simulates a service center where people are added to a queue based on their priority.
 *           The person with the highest priority (smallest number) is served first, following a FIFO approach
 *           for people with the same priority. It does not check for duplicate names, assuming input is correct.
 *
 * Usage:
 * - The program first reads an integer representing the number of people to be added.
 * - Then, it reads name-priority pairs (e.g., "Alice 2").
 * - Next, it reads an integer representing the number of commands to process.
 * - Commands:
 *   - "Add <name> <priority>": Adds a person with a given priority.
 *   - "Delete": Removes and prints the highest priority person.
 *   - "List": Displays all people in order of priority.
 *
 * Example Input:
 *   3
 *   Alice 5
 *   Bob 2
 *   Chris 3
 *   7
 *   List
 *   Add Davis 4
 *   Delete
 *   Add Monica 3
 *   Delete
 *   Delete
 *   List
*/


import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.TreeMap;

class ServiceCenter{
        private TreeMap<Integer, Queue<String> > people = new TreeMap<>();
      
        ServiceCenter(int numPeople, Scanner scan){
            String[] data = new String[2];
            String person = "";
            int priority = 0;
           
            for (int i = 0;i < numPeople;i++){
                String line = scan.nextLine();
                data = line.split(" ");
                person = data[0];
                priority = Integer.parseInt(data[1]);
                addPerson(person, priority);
            }
        }

        public  String addPerson(String person, int priority){
            if (people.containsKey(priority)){
                people.get(priority).add(person);
            }
            else{
                Queue newQueue = new LinkedList<>();
                newQueue.add(person);
                people.put(priority, newQueue);
            }
            return person;
        }

        public String deletePerson(){
            String person = "Empty Center. No more people to delete.";
            for (Integer firstPriority: people.keySet()){
                person = people.get(firstPriority).peek();
                people.get(firstPriority).remove();
                if (people.get(firstPriority).isEmpty()){
                    people.remove(firstPriority);
                }
                break;
            }
            return person;
        }

        public  String listPeople(){
            String allPeople = "";
            if (people.isEmpty()){
                return "Empty Center. No people to list.";
            }
            for (Integer priority : people.keySet()){
                for (String person: people.get(priority)){
                    allPeople += person + " " + priority + "\n";
                    //System.out.println(person + " " + priority);
                }
            }
            return allPeople;
        }

        
     public static void main(String[] args) 
     {

        Scanner scan = new Scanner(System.in);
        int numPeople = scan.nextInt();scan.nextLine();

        ServiceCenter SC = new ServiceCenter(numPeople,scan);
        int numCommands = scan.nextInt();scan.nextLine();
        String builder = "";
        for (int i = 0;i<numCommands;i++){
            String nextCommand = scan.nextLine();
            String[] data = nextCommand.split(" ");
            if (data[0].equals("Add")){
                SC.addPerson(data[1], Integer.parseInt(data[2]));
                builder += (data[1] + " added\n");
            } 
            else if (data[0].equals("Delete")){
                builder += (SC.deletePerson() + " deleted\n");
            }
            else if (data[0].equals("List")){
                builder += SC.listPeople();
            }
            else {
                System.out.println("Unknown Command: " + data[0]);
                i--;
            }
        }
        System.out.println(builder);
     }
 }

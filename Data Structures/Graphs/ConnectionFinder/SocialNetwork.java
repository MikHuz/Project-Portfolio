//Michael Huziy
/*
 * Program: Social Network Connection Finder
 * 
 * Abstract:
 * This program creates a unidirectional graph to represent social connections between people 
 * in a social networking service. It then finds and outputs the people who are connected to a 
 * given source person within a specified degree of separation using a breadth-first search (BFS) approach.
 * 
 * How It Works:
 * 1. The user inputs the number of people in the network
 * 2. The user provides a list of people's names
 * 3. The user inputs the number of direct connections, followed by connection pairs
 * 4. The user specifies a source person and the degree of separation to search for
 * 5. The program outputs all individuals who are exactly the specified degree away from the source person.
 * 6. If no one is found at the specified degree, it prints "NONE."
 * 
 * User Input Format:
 * <num_people>
 * <person_1>
 * <person_2>
 * <person_n>
 * <num_connections>
 * <person_A> <person_B> (denotes A is directly connected to B)
 * ...
 * <source_person>
 * <degree>//How many connections deep do we search
 * INPUT:
 * Alice
 * Bob
 * Chris
 * David
 * 7
 * Alice Bob
 * Bob David
 * Bob Chris
 * David Alice
 * Chris Alice
 * Chris Bob
 * Chris David
 * Alice
 * 2
 * 
 * OUTPUT:
 * Chris,David
 */
 import java.util.ArrayList;
 import java.util.Collections;
 import java.util.HashMap;
 import java.util.LinkedList;
 import java.util.Queue;
 import java.util.Scanner;
 import java.util.TreeMap;
  
 
  class SocialNetwork {
     static class Graph { 
         static TreeMap<String, ArrayList<String>> adjacencyList = new TreeMap<>();
         static HashMap<String, Integer> mark = new HashMap<>();
         private static int numPeople = 0;
         private static int numConnections = 0;
 
         Graph(int V) {
             numPeople = V;
             //System.out.println("INSIDE CON, vertices: " + V);
         }
 
         public static void addPerson(String sourcePerson) { 
             adjacencyList.putIfAbsent(sourcePerson, new ArrayList<>());
             mark.put(sourcePerson, -1);
         }
         public static void resetMark(ArrayList<String> peopleMarked){
             for (int i =0;i<peopleMarked.size();i++){
                     mark.put(peopleMarked.get(i), -1);
             }
         }
 
         public static void addConnection(String connection){
             String[] names = connection.split(" ");
             String sourcePerson = names[0];
             String destPerson = names[1];
             adjacencyList.get(sourcePerson).add(destPerson);
 
             //System.out.println(adjacencyList.get(sourcePerson));
         }
         public static void sortPeople(){
             for (String people : adjacencyList.keySet()){
                 Collections.sort(adjacencyList.get(people));
             }
         }
         public static ArrayList<String> findConnections(String sourcePerson, int degree){
             sortPeople();
             Queue<String> queue = new LinkedList<>();
             ArrayList<String> people = new ArrayList<>();
             ArrayList<String> peopleMarked = new ArrayList<>();
             mark.put(sourcePerson, 0);
             peopleMarked.add(sourcePerson);
             queue.add(sourcePerson);
 
             while (!queue.isEmpty()) {
                 String currPerson = queue.peek();
                 int currDegree = mark.get(currPerson);
     
                 if (currDegree == degree) {
                     if (degree == 0){
                         people.add(sourcePerson);
                     }
                     break;
                 }
         
                 for (String person : adjacencyList.get(currPerson)) {
                     if (mark.get(person) == -1){
                         queue.add(person);
                         mark.put(person, currDegree + 1);
                         peopleMarked.add(person);
                     }
                     if (currDegree + 1 == degree && mark.get(person) == degree) {
                         people.add(person);
                     }
                 }
                 queue.poll();
             }
             resetMark(peopleMarked);
             return people;
         }
 
         public static void printPeople() {
             sortPeople();
             for (String person : adjacencyList.keySet()) {
                 int size = adjacencyList.get(person).size();
                 System.out.println("\n" + person + " has " + size + " connections which are:");
                 for (String innerPerson : adjacencyList.get(person) ){
                     System.out.println(innerPerson);
                 }
             }
         }
     }
 
     public static void main(String[] args) {
         Scanner scan = new Scanner(System.in);
         int numOfPeople = scan.nextInt(); 
         Graph SNS = new Graph(numOfPeople);//SNS or Social Networking Service
         scan.nextLine();
 
         for (int i =0;i<numOfPeople;i++){
             String person = scan.nextLine();
             SNS.addPerson(person);
         }
 
         int numConnections = scan.nextInt();
         scan.nextLine();
 
         for (int i = 0;i<numConnections;i++){
             String connection = scan.nextLine();
             SNS.addConnection(connection);
         }
 
         //SNS.printPeople();
         //SNS.sortPeople();;
         //scan.nextLine();
         String sourcePerson = scan.nextLine();
         int degree = scan.nextInt();
         ArrayList<String> people = SNS.findConnections(sourcePerson, degree);
         System.out.println();
 
         if (people.size() == 0){
             System.out.println("NONE");
         }
         else{
             for (int i = 0;i<people.size();i++){
                 System.out.print(people.get(i));
                 if (i < people.size()-1){
                     System.out.print(",");
                 }
             }
         }
     }
 }
 
 
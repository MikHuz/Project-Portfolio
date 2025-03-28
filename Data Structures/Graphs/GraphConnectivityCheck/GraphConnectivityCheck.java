//Michael Huziy
/*
 * Title: Graph Connectivity and Edge Suggestion
 * Abstract: This program takes user input for vertices and edges to create an undirected graph. It then checks if the graph is connected. 
 *           If the graph is not connected, it suggests additional edges to make the graph connected using a Depth-First Search (DFS) traversal.
 * 
 * How It Works:
 * 1. The user inputs the number of vertices and edges in the graph.
 * 2. The graph is created and stored as an adjacency list using a TreeMap.
 * 3. The DFS algorithm is used to traverse the graph and find any disconnected components.
 * 4. If the graph is connected, no additional edges are needed.
 * 5. If the graph is disconnected, the program identifies the separate components and suggests new edges to connect them.
 * 
*   Input:
 * <number of vertices>
 * <number of edges>
 * <edge1_vertex1> <edge1_vertex2>
 * <edge2_vertex1> <edge2_vertex2>
 * Output Format:
 * The program prints "This graph is connected:" if the graph is already connected.
 * If the graph is disconnected, the program prints the suggested edges to connect the graph.
 * 
 * 
 * Input:
 * 5
 * 3
 * 0 1
 * 1 2
 * 3 4
 * 
 * Output:
 * Edge:2-3 //This makes the two disconnected sub components form the input intp a connected graph using depth first search*/

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Scanner;
import java.util.Stack;
import java.util.TreeMap;

class GraphConnectivityCheck
{
     static class Graph { 
         static TreeMap<Integer, ArrayList<Integer>> adjacencyList = new TreeMap<>();
         static HashMap<Integer, Integer> mark = new HashMap<>();
         static HashSet<Integer> markReseter = new HashSet<>();
         static Stack<Integer> stack = new Stack<>();
         private static int numVertices = 0;
         private static int numEdges= 0;
         private static int count = 0;
 
         Graph(int V) {
             numVertices = V;
             //System.out.println("INSIDE CON, vertices: " + V);
         }
 
         public static void addVertex(int vertex) { 
             adjacencyList.putIfAbsent(vertex, new ArrayList<>());
             mark.put(vertex, 0);
         }
         public static void resetMark(){
            Iterator<Integer> it = mark.keySet().iterator();
            while (it.hasNext()){
                mark.put(it.next(),0);
            }
         }

         public static void sortGraph(){
            for (Integer vertex : adjacencyList.keySet()){
                Collections.sort(adjacencyList.get(vertex));
            }
        }
 
         public static void addEdge(String connection){
             String[] vertices = connection.split(" ");
             Integer sourceVertex = Integer.parseInt(vertices[0]);
             Integer destVertex= Integer.parseInt(vertices[1]);
             adjacencyList.get(sourceVertex).add(destVertex);
             //System.out.println(adjacencyList.get(sourcePerson));
         }
       
         public static String DFS(int vertex){
            String traversal = "";
            traversal += vertex + " -> ";
            stack.push(vertex);
            count += 1;
            mark.put(vertex,count);
            for (Integer adjacentVertex: adjacencyList.get(vertex)){
                if (mark.get(adjacentVertex) == 0){
                    traversal += DFS(adjacentVertex);
                    //System.out.println("TEST");
                }
            }
            stack.pop();
            return traversal;
            }

         public static ArrayList<Integer> findEdges(){
            String traversal = "";
            ArrayList<Integer> edgesToConnect = new ArrayList<>();
            for (int vertex =0;vertex<numVertices;vertex++){
                if (mark.get(vertex) == 0){
                    traversal += DFS(vertex);
                    edgesToConnect.add(vertex);
                }
            }
            resetMark();
            return edgesToConnect;
         }
 
         public static void printEdges() {
             for (Integer Vertex : adjacencyList.keySet()) {
                 int size = adjacencyList.get(Vertex).size();
                 System.out.println("\nVertex " +Vertex + " has " + size + " edges which are:");
                 for (Integer connectedVertex: adjacencyList.get(Vertex) ){
                    System.out.println(connectedVertex);
                }
             }
         }
     }
 
    public static void main(String[] args) 
    {
        Scanner scan = new Scanner(System.in);
        int numVertices = scan.nextInt(); 
        Graph Graph = new Graph(numVertices);
        scan.nextLine();
 
        for (int vertex =0;vertex<numVertices;vertex++){;
            Graph.addVertex(vertex);
         }

        int numEdges= scan.nextInt();
        scan.nextLine();
 
        for (int i = 0;i<numEdges;i++){
            String edge= scan.nextLine();
            Graph.addEdge(edge);
        }
        Graph.sortGraph();
        //Graph.printEdges();
        ArrayList<Integer> edgesToConnect = Graph.findEdges();
        if (edgesToConnect.size() == 1){
            System.out.println("This graph is connected");
        }
        else{
            for (int i =0, j=1; j<edgesToConnect.size();i++,j++){
                System.out.println("Edge:" + edgesToConnect.get(i) + "-" + edgesToConnect.get(j) +'\n');
            }
        }
    }
}


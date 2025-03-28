// Michael Huziy
/*
 * Description: This program constructs a weighted directed graph based on user input 
 * and outputs the graph in the form of an adjacency list
 * 
 * How it works:
 * - The user provides the number of vertices and edges as input
 * - The user then enters edges in the format: <source> <destination> <weight>
 * - The program stores the edges in a TreeMap-based adjacency list
 * - The program prints the adjacency list representation of the graph
 *
 * User Input Format:
 * - First line: <num_vertices> <num_edges>
 * - Next `num_edges` lines: <source> <destination> <weight>
 * 
 * Example Input:
 * 4 5
 * 0 1 2
 * 0 2 4
 * 1 2 1
 * 2 3 3
 * 3 0 5
 * 
 * Expected Output:
 * 0->1,2->2,4
 * 1->2,1
 * 2->3,3
 * 3->0,5
 * 
 */
import java.util.Scanner;
import java.util.TreeMap;
class Main 
{
   static class DirectedGraph{
    TreeMap<Integer, TreeMap<Integer, Integer>> adjList = new TreeMap<>();
        public DirectedGraph(){
            //System.out.println("IN Constructor");
            adjList = new TreeMap<>();
        }
        public void addEdge(int source, int destination, int weight){
            adjList.putIfAbsent(source, new TreeMap<>());
            adjList.get(source).put(destination, weight);
        }
        public Integer getWeight(int source, int destination){
                return adjList.get(source).get(destination);
        }
        public void printAdjacencyList(int numVertices,int numEdges){
            for (int srcVertice =0; srcVertice < numVertices; srcVertice++){
                if (adjList.containsKey(srcVertice)){
                    System.out.print(srcVertice + "->");
                    int currentDestinations = 0;
                    int totalDestinations = adjList.get(srcVertice).size();
                    for (Integer destination : adjList.get(srcVertice).keySet()){
                        currentDestinations += 1;
                        int weight =  getWeight(srcVertice, destination);
                        System.out.print(destination +  "," + weight);
                        
                        if (totalDestinations > currentDestinations){
                            System.out.print("->");
                        }
                    }
                }
                else{
                    System.out.print(srcVertice);
                }
                System.out.println();
            }
        }
        public void print() { 
            for (Integer source : adjList.keySet()) {
                for (Integer dest : adjList.get(source).keySet()) {
                    int weight = adjList.get(source).get(dest);
                    System.out.println("Source : " + source + ", Dest: " + dest + ", Weight: " + weight);
                }
            }
        }
    }
    public static void main(String[] args) 
    {
        
        Scanner scan = new Scanner(System.in);
        int verts = 0;
        int edges = 0;
       // System.out.print("Vertices: ");
        verts = scan.nextInt();
        //System.out.print("Edges: ");
        edges =scan.nextInt();
        int src = 0; int dest = 0; int weight = 0;String line = "0";
        DirectedGraph DirectedGraph = new DirectedGraph();
        scan.nextLine();
        for(int i =0;i<edges;i++){
            line = scan.nextLine();
            String arr[] = line.split(" ");
            src = Integer.parseInt(arr[0]);
            dest = Integer.parseInt(arr[1]);
            weight = Integer.parseInt(arr[2]);

            DirectedGraph.addEdge(src, dest, weight);

        }
        //System.out.println("Done");
        //DirectedGraph.print();
        System.out.println();
        DirectedGraph.printAdjacencyList(verts,edges);
        scan.close();
        
    }
}


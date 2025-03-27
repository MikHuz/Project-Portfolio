//Michael Huziy
/*
 * This program implements a Binary Search Tree (BST) and provides operations for:
 *  - Adding a node to the tree
 *  - Preorder traversal
 *  - Postorder traversal
 *  - Calculating the height of the tree
 *  - Counting the number of leaves (nodes with no children)
 *  - Counting the number of nodes with exactly one child
 * 
 * The program allows user input via commands to manipulate the tree and retrieve information about it.
 *  
 *  <add> <value>                // Adds a node with the specified value to the tree.
    <height>                     // Returns the height of the tree.
    <preOrder>                   // Returns the preorder traversal of the tree.
    <postOrder>                  // Returns the postorder traversal of the tree.
    <countLeaves>                // Counts and returns the number of leaf nodes in the tree.
    <countOneChildNodes>         // Counts and returns the n
    Example combination:
    7
    add 15
    add 10
    add 50
    preOrder
    add 45
    height
    postOrder

    15 10 50
    2
    10 45 50 15*/

import java.util.Scanner;

class Node {
    public int data;
    public Node left;
    public Node right;
    
    public Node(int data, Node left, Node right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
} 

class BinarySearchTree
{
    private Node root;

    public Node getRoot() {
            return root;
    }
    public int getHeight(){
        int height = height(root);
        return height;
    }
    public String getPreOrder(){
        return preOrder(root);
    }
    public String getPostOrder(){
        return postOrder(root);
    }

    public int getLeaves(){
        return countLeaves(root);
    }

    public int getOneChildNodes(){
        return countOneChildNodes(root);
    }
    private int height(Node root){
        int height = -1;
        if (root == null){
            return height;
        }
        else{
            return Math.max(height(root.left),height(root.right)) + 1;
        }
    }

    public void add(int item) {
        Node newNode = new Node(item, null, null);
        if (root == null) {
            root = newNode;
        }
        else {
            insert(newNode, root);
        }
    }
    
    private void insert(Node newNode, Node subTree) {
        if (newNode.data < subTree.data) {
            if(subTree.left == null) {
                subTree.left = newNode;
            }
            else {
                insert(newNode, subTree.left);
            }
            }
        else { 
            if(subTree.right == null) {
                subTree.right = newNode;
            }
            else {
                insert(newNode, subTree.right);
            }
        }
    }

    private String preOrder(Node root){
        String order = "";
        if (root == null){
            return "";
        }
        else{
           order += root.data + " ";
           order += preOrder(root.left);
           order += preOrder(root.right);
        }
        return order; 
    }

    private String postOrder(Node root){
        String order = "";
        if (root == null){
            return "";
        }
        else{
           order += postOrder(root.left);
           order += postOrder(root.right);
           order += root.data ;
        }
        return order + " ";  
    }
    private int countLeaves(Node root){
        if (root == null){
            return 0;
        }
        int leftCount = countLeaves(root.left);
        int rightCount = countLeaves(root.right);
        if (root.left == null && root.right == null){
            return 1;
        }
        return leftCount + rightCount;
    }

    private int countOneChildNodes(Node root){
        if (root == null){
            return 0;
        }

        int leftCount = countOneChildNodes(root.left);
        int rightCount = countOneChildNodes(root.right);
        if ( (root.left != null && root.right == null) || (root.left == null && root.right != null)){
            return leftCount + rightCount + 1;
        }
        return leftCount + rightCount;
    }
    public static void main(String[] args) 
    {
        Scanner scan = new Scanner(System.in);
        int numCommands = scan.nextInt();scan.nextLine();
        BinarySearchTree tree = new BinarySearchTree();
        String builder = "";
        for (int i = 0; i < numCommands; i++) {
            String line = scan.nextLine();
            String[] command = line.split(" ");
            
            switch (command[0]) {
                case "add":
                    int num = Integer.parseInt(command[1]);
                    tree.add(num);
                    break;
                case "height":
                    String height = tree.getHeight() + "\n";
                    builder += height;
                    break;
                case "preOrder":
                    String preOrder = tree.getPreOrder() + "\n";
                    builder += preOrder;
                    break;
                case "postOrder":
                    String postOrder = tree.getPostOrder() + "\n";
                    builder += postOrder;
                    break;
                case "countLeaves":
                    int leaves = tree.getLeaves();
                    builder += leaves + "\n";
                    break;
                case "countOneChildNodes":
                    int oneChildNodes = tree.getOneChildNodes();
                    builder += oneChildNodes + "\n";
                    break;
                default:
                    // Optional: handle invalid command
                    System.out.println("Invalid command: " + command[0]);
                    i--;
                    break;
            }
        }
        System.out.println();
        System.out.println(builder);
        scan.close();
    }
}


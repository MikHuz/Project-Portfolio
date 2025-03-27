//Michael Huziy
/*Abstract: Creates an integer binary tree using a level order approach and implements several functionalities:
 *           append, height of tree, pre/post/in/level order traversal, determine if the tree is a binary search tree (BST),
 *           and output the first node of the inorder traversal Then the command results are all compiled and outputted.
 * Input:
 * <root node integer>.
 * <number of commands>.
 *  Each subsequent line may contain any command:
 *   - append <item>: Adds a node with the specified value to the tree.
 *   - height: Prints the height of the tree.
 *   - preOrder: Prints the tree nodes in preorder traversal.
 *   - postOrder: Prints the tree nodes in postorder traversal.
 *   - inOrder: Prints the tree nodes in inorder traversal.
 *   - levelOrder: Prints the tree nodes in level order traversal.
 *   - isBST: Prints 'true' if the tree is a binary search tree, 'false' otherwise.
 *   - findFirstNode: Prints the first node in the inorder traversal.
 */
import java.util.*;
class Node{
    public int data;
    public Node left;
    public Node right;
    
    public Node(int data, Node left, Node right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree
{

    private Node root = null;

    BinaryTree(int root){
        this.root = new Node(root,null,null);
    }
    
    public void append(int item) {
        if (root == null){
            root = new Node(item, null, null);
            return;
        }
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()){
            Node traverse = q.poll();
            if (traverse.left == null){
                traverse.left = new Node(item, null, null);
                return;
            }
            else{
                q.add(traverse.left);
            }
            if (traverse.right == null){
                traverse.right = new Node(item, null, null);
                return;
            }
            else{
                q.add(traverse.right);
            }
        }   
    }
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
    public String getInOrder(){
        return inOrder(root);
    }
    public String getLevelOrder() {
        return levelOrder(root);
    }
    public boolean isBST(){
        boolean isBST = true;
        String order = inOrder(root);
        String[] split = order.split(" ");
        int num = 0;
        int currentNum = Integer.parseInt(split[0]);
        for (int i = 1;i<split.length;i++){
            num = Integer.parseInt(split[i]);
            if (num < currentNum){
                isBST = false;
                break;
            }
            else{
                currentNum = num;
            }
        }
        return isBST;
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

    private String inOrder(Node root){
        String order = "";
        if (root == null) {
            return "";
        }
        else{
            order += inOrder(root.left);
            order += root.data + " ";
            order += inOrder(root.right);
        }
        return order;
   }

    private String levelOrder(Node root){
        String order = "";
        if (root == null){
           return null;
        }
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()){
            Node traverse = q.poll();
            order += traverse.data + " ";
            if (traverse.left == null){
               
            }
            else{
                q.add(traverse.left);
            }
            if (traverse.right == null){

            }
            else{
                q.add(traverse.right);
            }
        }
        return order;
    }
    public int findFirstNode(){
        Node traverse = root;
        if (root.left == null){
            return root.data;
        }
        else{
            while (traverse.left != null){
                traverse = traverse.left;
            }
        }
        return traverse.data;
    }
    public static void main(String[] args) 
    {
       Scanner scan = new Scanner(System.in);
       int root = scan.nextInt();scan.nextLine();
       BinaryTree tree = new BinaryTree(root);
       int numCommands = scan.nextInt();scan.nextLine();
       String builder = "";

       for (int i =0;i<numCommands;i++){
        String line= scan.nextLine();
        String[] command= line.split(" ");
        if (command[0].equals("append")){
            int num = Integer.parseInt(command[1]);
            tree.append(num);
        }
        else if (command[0].equals("height")){
            String height = tree.getHeight() + "\n";
            builder += height;
        }
        else if (command[0].equals("preOrder")){
            String preOrder = tree.getPreOrder() +"\n";
            builder += preOrder;
        }
        else if (command[0].equals("postOrder")){
            String postOrder = tree.getPostOrder() +"\n";
            builder += postOrder;
        }
        else if (command[0].equals("inOrder")){
            String postOrder = tree.getInOrder() +"\n";
            builder += postOrder;
        }
        else if (command[0].equals("levelOrder")){
            String levelOrder = tree.getLevelOrder() +"\n";
            builder += levelOrder;
        }
        else if (command[0].equals("isBST")){
            boolean isBST = tree.isBST();
            builder += isBST + "\n";
        }
        else if (command[0].equals("findFirstNode")){
            int firstNode = tree.findFirstNode();
            builder += firstNode +"\n";
        }
    }
    System.out.println("\n" + builder);
    scan.close();
}
}


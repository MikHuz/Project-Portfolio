import java.util.*;
//mainbranch comment
class Node{
    HashMap<Character,Node> children;
    boolean isWord;
    Node() {
        children = new HashMap<>();
        isWord = false;
    }
}
public class Trie {
    private Node root;
    Trie(){
        root = new Node();
    }

    Trie(String[] words){
        root = new Node();
        for (String word : words){
            insert(word);
        }
    }

    public void insert(String word){
        Node node = root;
        for (char c : word.toCharArray()){
            node.children.putIfAbsent(c, new Node());
            node = node.children.get(c);
        }
        node.isWord = true;
    }

    public boolean search(String word){
        Node node = root;
        boolean containsWord = false;
        for (char c : word.toCharArray()){
            if (!node.children.containsKey(c)){ return containsWord;}
            node = node.children.get(c);
        }
        if (node.isWord){containsWord = true;}
        return containsWord;
    }

    public boolean hasPrefix(String prefix){
        Node node = root;
        boolean hasPrefix= true;
        for (char c : prefix.toCharArray()){
            if (!node.children.containsKey(c)){ return false;}
            node = node.children.get(c);
        }
        return true;
    }

    public String longestCommonPrefix(){
        String prefix = "";
        Node node = root;
        while (node != null){
            if (node.children.size() != 1){break;}
            char c = node.children.keySet().iterator().next();
            prefix = prefix + c;
            node = node.children.get(c);
        }
        if (prefix.equals("")){prefix = "No common prefix exists";}
        return prefix;
    }   
    public static void main(String[] args) {
        System.out.println("Hello!");

        Trie trie = new Trie();
        String s = "apple";
        String s2 = "app";
        String s3 = "ape";
        trie.insert(s);
        trie.insert(s2);
        trie.insert(s3);
        System.out.println(trie.longestCommonPrefix());
        //System.out.println(trie.search(s3));
        //System.out.println(trie.search(s));
        //System.out.println(trie.hasPrefix("applf"));

        String[] strs = {"flower","flow","flight"};
        String[] strs2 = {"dog","racecar","car"};
        trie = new Trie(strs2);
        System.out.println(trie.search("flight"));
        System.out.println(trie.longestCommonPrefix());


     
        
    }
}

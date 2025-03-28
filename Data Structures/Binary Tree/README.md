## Integer Binary Tree Implementation

This program constructs an **integer binary tree** using a **level-order approach** and provides several functionalities, including traversal methods, height calculation, and BST validation.

### Features:
- **Append nodes** to the tree.
- **Determine the height** of the tree.
- **Perform tree traversals**: Preorder, Postorder, Inorder, and Level Order.
- **Check if the tree is a Binary Search Tree (BST)**.
- **Find the first node** in an inorder traversal.
- **Compile and output the results** of executed commands.

### Input Format:
1. **Root node integer** – Specifies the initial root node of the tree.
2. **Number of commands** – Defines how many operations will be executed.
3. **Command list** – A set of commands (one per line) to interact with the tree.

### Supported Commands:
- **`append <item>`** – Adds a node with the specified value to the tree.
- **`height`** – Prints the height of the tree.
- **`preOrder`** – Prints the tree nodes in **preorder traversal**.
- **`postOrder`** – Prints the tree nodes in **postorder traversal**.
- **`inOrder`** – Prints the tree nodes in **inorder traversal**.
- **`levelOrder`** – Prints the tree nodes in **level-order traversal**.
- **`isBST`** – Prints `true` if the tree is a **binary search tree**, `false` otherwise.
- **`findFirstNode`** – Prints the first node in the **inorder traversal**.

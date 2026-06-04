**What was hard:** Implementing the recursive DFS (`collectWords`) to accurately traverse the nested objects in the Trie and reconstruct the matching words without leaking state or duplicating code.

**What is the easiest way to do this task:** The absolute easiest way in JavaScript is `data.filter(word => word.startsWith(prefix))`. 

**What requirement prevented that:** The task description explicitly banned linear array filtering and binary search, strictly mandating the creation of a Prefix Tree (Trie) class for optimal lookup performance on large datasets.
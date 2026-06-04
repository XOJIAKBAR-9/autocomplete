class TrieNode {
  children: Record<string, TrieNode> = {};
  indices: number[] = [];
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, index: number): void {
    let current = this.root;
    const lowerWord = word.toLowerCase(); // Navigate using lowercase
    
    for (const char of lowerWord) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.indices.push(index);
  }

  private collectIndices(node: TrieNode, results: number[]): void {
    results.push(...node.indices);
    for (const char in node.children) {
      if (Object.prototype.hasOwnProperty.call(node.children, char)) {
        this.collectIndices(node.children[char], results);
      }
    }
  }

  findWords(prefix: string, originalData: string[]): string[] {
    // Safety check: instantly return empty array if input is garbage or empty
    if (!prefix || typeof prefix !== 'string') {
      return [];
    }

    let current = this.root;
    const lowerPrefix = prefix.toLowerCase(); // Search using lowercase
    
    for (const char of lowerPrefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    const indices: number[] = [];
    this.collectIndices(current, indices);
    
    indices.sort((a, b) => a - b);
    
    return indices.map(i => originalData[i]);
  }
}

function createAutoComplete(data: string[]): (prefix: string) => string[] {
  const trie = new Trie();
  for (let i = 0; i < data.length; i++) {
    trie.insert(data[i], i);
  }

  return function (prefix: string): string[] {
    return trie.findWords(prefix, data);
  };
}

export { createAutoComplete };
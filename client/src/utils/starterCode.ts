const defaultCode = [
  {
    value: "javascript",
    label: "JavaScript",
    script: `// JavaScript Editor

// You can write your JavaScript code here
function main() {
  // Your code goes here
  console.log('Hello, World!');
}

// Call the main function
main();`
  },
  {
    value: "typescript",
    label: "TypeScript",
    script: `// TypeScript Editor

// Define your types here
type Person = {
  name: string;
  age: number;
};

// Write your TypeScript code
function main(): void {
  // Your code goes here
  console.log('Hello, TypeScript!');
}

// Call the main function
main();`
  },
  {
    value: "python",
    label: "Python",
    script: `# Python Editor

def main():
    # Your Python code goes here
    print('Hello, World!')

# Using if __name__ == '__main__' idiom
if __name__ == '__main__':
    main()`
  },
  {
    value: "java",
    label: "Java",
    script: `// Java Editor

public class Main {
    public static void main(String[] args) {
        // Your Java code goes here
        System.out.println("Hello, World!");
    }
}`
  },
  {
    value: "cpp",
    label: "C++",
    script: `// C++ Editor

#include <iostream>
using namespace std;

int main() {
    // Your C++ code goes here
    cout << "Hello, World!" << endl;
    return 0;
}`
  },
  {
    value: "c",
    label: "C",
    script: `// C Editor

#include <stdio.h>

int main() {
    // Your C code goes here
    printf("Hello, World!\\n");
    return 0;
}`
  }
];

export default defaultCode;
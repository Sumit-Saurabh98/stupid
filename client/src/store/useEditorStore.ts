import { create } from 'zustand';
import defaultCode from '@/utils/starterCode';

interface ExecutionResult {
  output: string;
  error: string | null;
}

interface EditorState {
  code: string;
  language: string;
  theme: string;
  isExecuting: boolean;
  input: string;
  executionResult: ExecutionResult | null;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setInput: (input: string) => void;
  executeCode: () => Promise<void>;
}

// Helper function to get default code for a language
const getDefaultCodeForLanguage = (language: string): string => {
  const template = defaultCode.find(temp => temp.value === language);
  return template ? template.script : '// Start coding here';
};

export const useEditorStore = create<EditorState>((set, get) => ({
  code: getDefaultCodeForLanguage('javascript'),
  language: 'javascript',
  theme: 'vs-dark',
  isExecuting: false,
  input: '', // Added initial state for input
  executionResult: null,
  
  setCode: (code) => set({ code }),
  
  setLanguage: (language) => set({ 
    language,
    code: getDefaultCodeForLanguage(language) // Update code when language changes
  }),
  
  setTheme: (theme) => set({ theme }),
  
  setInput: (input) => set({ input }), // Added setter for input
  
  executeCode: async () => {
    const { code, language, input } = get(); // Get input from state
    set({ isExecuting: true, executionResult: null });
    
    try {
      // Map editor languages to Piston runtime names
      const languageMap: { [key: string]: string } = {
        javascript: 'javascript',
        typescript: 'typescript',
        python: 'python3',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
      };
      
      const runtime = languageMap[language] || language;
      
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: runtime,
          version: '*',
          files: [{
            content: code,
          }],
          stdin: input, // Added input to the request
        }),
      });
      
      const data = await response.json();
      
      set({
        executionResult: {
          output: data.run.output,
          error: data.run.stderr || null,
        },
        isExecuting: false,
      });
    } catch (error: unknown) {
      set({
        executionResult: {
          output: '',
          error: `Failed to execute code. Please try again.\n${error}`,
        },
        isExecuting: false,
      });
    }
  },
}));
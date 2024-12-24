import {create} from 'zustand'

interface ExecutionResult {
  output: string;
  error: string | null;
}

interface EditorState {
  code: string;
  language: string;
  theme: string;
  isExecuting: boolean;
  executionResult: ExecutionResult | null;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  executeCode: () => Promise<void>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  code: '// Start coding here',
  language: 'javascript',
  theme: 'vs-dark',
  isExecuting: false,
  executionResult: null,
  
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  
  executeCode: async () => {
    const { code, language } = get();
    set({ isExecuting: true, executionResult: null });
    
    try {
      // Map editor languages to Piston runtime names
      const languageMap: { [key: string]: string } = {
        javascript: 'node',
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
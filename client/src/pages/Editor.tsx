import MonacoEditor from '@monaco-editor/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Play, RotateCcw, RefreshCw, Loader2 } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Editor = () => {
  const {
    code,
    input,
    language,
    theme,
    isExecuting,
    executionResult,
    setCode,
    setInput,
    setLanguage,
    setTheme,
    executeCode,
    resetCode,
    resetOutput
  } = useEditorStore();

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast Dark' }
  ];

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Code Editor</h1>
            <div className="flex items-center gap-2">
              <Select onValueChange={setTheme} defaultValue={theme}>
                <SelectTrigger className="w-40 text-white">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {themes.map(t => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-40 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
    >
      <Copy className="w-4 h-4 mr-2" />
      Copy
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
    >
      <Download className="w-4 h-4 mr-2" />
      Download
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={resetCode}
      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
    >
      <RefreshCw className="w-4 h-4 mr-2" />
      Reset Code
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={executeCode}
      disabled={isExecuting}
      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
    >
      {isExecuting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Play className="w-4 h-4 mr-2" />
      )}
      Run
    </Button>
          </div>
        </div>
        
        <div className="flex">
          {/* Editor Panel */}
          <div className="w-1/2 border-r border-gray-700">
            <MonacoEditor
              height="80vh"
              theme={theme}
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 10 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: "on",
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>
          
          {/* Output and Input Panel */}
          <div className="w-1/2">
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="w-full bg-gray-700">
                <TabsTrigger value="output" className="w-1/2">Output</TabsTrigger>
                <TabsTrigger value="input" className="w-1/2">Input</TabsTrigger>
              </TabsList>
              
              <TabsContent value="output" className="mt-0">
                <Button
          variant="outline"
          size="sm"
          onClick={resetOutput}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear Output
        </Button>
                <div className="h-[80vh] bg-gray-900 p-4 overflow-auto">
                  <div className="font-mono text-sm">
                    {isExecuting ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      </div>
                    ) : executionResult ? (
                      <div>
                        {executionResult.error ? (
                          <div className="text-red-500 whitespace-pre-wrap">
                            {executionResult.error}
                          </div>
                        ) : (
                          <div className="text-green-500 whitespace-pre-wrap">
                            {executionResult.output || 'No output'}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 flex items-center justify-center h-full">
                        Run your code to see the output here
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="input" className="mt-0">
                <div className="h-[80vh] bg-gray-900 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-200">Program Input</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearInput}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your program input here..."
                    className="h-[calc(80vh-4rem)] bg-gray-800 border-gray-700 text-gray-200 resize-none font-mono"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Editor;
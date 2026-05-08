"use client"

import NavbarLayout from '../../components/NavbarLayout';
import { useState } from 'react';

export default function SummarizePage() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setSummary('Error: ' + (data.error || 'Failed to generate summary'));
      }
    } catch (error) {
      setSummary('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavbarLayout>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Text Summarizer</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="flex flex-col">
              <label htmlFor="inputText" className="block text-lg font-medium mb-2">
                Enter Text to Summarize
              </label>
              <textarea
                id="inputText"
                className="flex-grow w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                rows={15}
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSummarize}
                disabled={isLoading}
              >
                {isLoading ? 'Summarizing...' : 'Summarize'}
              </button>
            </div>

            {/* Output Section */}
            <div className="flex flex-col">
              <label htmlFor="summaryOutput" className="block text-lg font-medium mb-2">
                Summary
              </label>
              <textarea
                id="summaryOutput"
                className="flex-grow w-full p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
                value={summary}
                readOnly
                placeholder="Your summary will appear here..."
                rows={15}
              />
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>

  );
}

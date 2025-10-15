import { Save, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface EditorScreenProps {
  filename: string;
  originalText: string;
  translatedText: string;
  onTranslationChange: (text: string) => void;
  onSave: () => void;
  onExport: (format: 'docx' | 'pdf' | 'txt') => void;
}

export default function EditorScreen({
  filename,
  originalText,
  translatedText,
  onTranslationChange,
  onSave,
  onExport,
}: EditorScreenProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900">
                Editing: <span className="text-gray-700">{filename}</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onSave}
                className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  Export
                  <ChevronDown size={18} />
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => {
                        onExport('docx');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Export as .docx
                    </button>
                    <button
                      onClick={() => {
                        onExport('pdf');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Export as .pdf
                    </button>
                    <button
                      onClick={() => {
                        onExport('txt');
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Export as .txt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1800px] mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-2 gap-6 h-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Original Text (Source)
              </h2>
            </div>
            <div className="flex-1 px-6 py-4 overflow-auto">
              <div className="text-gray-800 leading-relaxed text-lg font-serif select-text whitespace-pre-wrap">
                {originalText}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                English Translation (Editable)
              </h2>
            </div>
            <div className="flex-1 px-6 py-4 overflow-auto">
              <textarea
                value={translatedText}
                onChange={(e) => onTranslationChange(e.target.value)}
                className="w-full h-full resize-none border-none outline-none text-gray-800 leading-relaxed text-lg focus:ring-0"
                placeholder="English translation will appear here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FileText, Plus } from 'lucide-react';
import { Document } from '../types';

interface DashboardProps {
  onUploadClick: () => void;
  recentDocuments: Document[];
  onDocumentClick: (doc: Document) => void;
}

export default function Dashboard({ onUploadClick, recentDocuments, onDocumentClick }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            ScriptTranslate AI
          </h1>
          <p className="text-gray-600 text-lg">
            Professional document translation from Nepalese and Sinhalese to English
          </p>
        </div>

        <div className="flex justify-center mb-20">
          <button
            onClick={onUploadClick}
            className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-5 rounded-lg text-lg font-medium transition-colors flex items-center gap-3 shadow-lg"
          >
            <Plus size={24} />
            Upload New Document
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentDocuments.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No recent projects. Upload a document to get started.
              </div>
            ) : (
              recentDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentClick(doc)}
                  className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <FileText className="text-blue-900" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate">{doc.filename}</p>
                    <p className="text-sm text-gray-500">Last modified: {doc.lastModified}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

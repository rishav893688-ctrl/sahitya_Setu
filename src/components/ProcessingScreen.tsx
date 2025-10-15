import { Loader2 } from 'lucide-react';
import { ProcessingStage } from '../types';

interface ProcessingScreenProps {
  stage: ProcessingStage;
  progress: number;
}

export default function ProcessingScreen({ stage, progress }: ProcessingScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="text-blue-900 animate-spin" size={32} />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Processing Document
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Please wait while we process your document
            </p>

            <div className="w-full mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {stage.step} of {stage.total}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-900 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-medium text-center">
                {stage.message}
              </p>
            </div>

            <div className="mt-8 text-sm text-gray-500 space-y-2">
              <div className={stage.step >= 1 ? 'text-blue-900' : ''}>
                Step 1/3: Enhancing Document Quality...
              </div>
              <div className={stage.step >= 2 ? 'text-blue-900' : ''}>
                Step 2/3: Recognizing Source Text (OCR)...
              </div>
              <div className={stage.step >= 3 ? 'text-blue-900' : ''}>
                Step 3/3: Translating to English...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

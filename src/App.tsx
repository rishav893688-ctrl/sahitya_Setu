import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import UploadModal from './components/UploadModal';
import ProcessingScreen from './components/ProcessingScreen';
import EditorScreen from './components/EditorScreen';
import { AppScreen, Document, ProcessingStage } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([
    {
      id: '1',
      filename: 'Legal_Contract_1987.pdf',
      lastModified: 'March 15, 2025',
    },
    {
      id: '2',
      filename: 'Historical_Document_1965.pdf',
      lastModified: 'March 12, 2025',
    },
    {
      id: '3',
      filename: 'Research_Paper_Translation.pdf',
      lastModified: 'March 8, 2025',
    },
  ]);

  const [processingStage, setProcessingStage] = useState<ProcessingStage>({
    step: 1,
    total: 3,
    message: 'Step 1/3: Enhancing Document Quality...',
  });
  const [progress, setProgress] = useState(0);

  const [currentFilename, setCurrentFilename] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    if (currentScreen === 'processing') {
      const stages = [
        { step: 1, message: 'Step 1/3: Enhancing Document Quality...' },
        { step: 2, message: 'Step 2/3: Recognizing Source Text (OCR)...' },
        { step: 3, message: 'Step 3/3: Translating to English...' },
      ];

      let currentStage = 0;
      let currentProgress = 0;

      const interval = setInterval(() => {
        currentProgress += 2;

        if (currentProgress >= 33 && currentStage === 0) {
          currentStage = 1;
          setProcessingStage({ ...stages[1], total: 3 });
        } else if (currentProgress >= 66 && currentStage === 1) {
          currentStage = 2;
          setProcessingStage({ ...stages[2], total: 3 });
        }

        setProgress(Math.min(currentProgress, 100));

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentScreen('editor');
          }, 500);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const handleUpload = (file: File) => {
    setCurrentFilename(file.name);
    setShowUploadModal(false);
    setProgress(0);
    setProcessingStage({
      step: 1,
      total: 3,
      message: 'Step 1/3: Enhancing Document Quality...',
    });
    setCurrentScreen('processing');

    setOriginalText(
      'नेपालको संविधान\n\nयो संविधान नेपालको सर्वोच्च कानून हो। यस संविधानमा लेखिएको कुनै पनि व्यवस्था विपरीत हुने अन्य कानुन यो संविधान प्रारम्भ भएको मितिदेखि स्वत: निष्क्रिय हुनेछ।\n\nनेपालको जनता आफ्नो राष्ट्रिय एकता, अखण्डता र स्वतन्त्रता सुरक्षित राख्न दृढ संकल्प छ।'
    );
    setTranslatedText(
      'Constitution of Nepal\n\nThis Constitution is the supreme law of Nepal. Any other law that is inconsistent with any provision written in this Constitution shall automatically become void from the date of commencement of this Constitution.\n\nThe people of Nepal are determined to safeguard their national unity, territorial integrity, and independence.'
    );
  };

  const handleDocumentClick = (doc: Document) => {
    setCurrentFilename(doc.filename);
    setOriginalText(
      'नेपालको संविधान\n\nयो संविधान नेपालको सर्वोच्च कानून हो। यस संविधानमा लेखिएको कुनै पनि व्यवस्था विपरीत हुने अन्य कानुन यो संविधान प्रारम्भ भएको मितिदेखि स्वत: निष्क्रिय हुनेछ।\n\nनेपालको जनता आफ्नो राष्ट्रिय एकता, अखण्डता र स्वतन्त्रता सुरक्षित राख्न दृढ संकल्प छ।'
    );
    setTranslatedText(
      'Constitution of Nepal\n\nThis Constitution is the supreme law of Nepal. Any other law that is inconsistent with any provision written in this Constitution shall automatically become void from the date of commencement of this Constitution.\n\nThe people of Nepal are determined to safeguard their national unity, territorial integrity, and independence.'
    );
    setCurrentScreen('editor');
  };

  const handleSave = () => {
    alert('Changes saved successfully!');
  };

  const handleExport = (format: 'docx' | 'pdf' | 'txt') => {
    alert(`Exporting as .${format}...`);
  };

  return (
    <>
      {currentScreen === 'dashboard' && (
        <Dashboard
          onUploadClick={() => setShowUploadModal(true)}
          recentDocuments={recentDocuments}
          onDocumentClick={handleDocumentClick}
        />
      )}

      {currentScreen === 'processing' && (
        <ProcessingScreen stage={processingStage} progress={progress} />
      )}

      {currentScreen === 'editor' && (
        <EditorScreen
          filename={currentFilename}
          originalText={originalText}
          translatedText={translatedText}
          onTranslationChange={setTranslatedText}
          onSave={handleSave}
          onExport={handleExport}
        />
      )}

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </>
  );
}

export default App;

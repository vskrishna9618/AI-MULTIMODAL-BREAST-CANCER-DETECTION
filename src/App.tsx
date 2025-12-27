import { useState } from 'react';
import Home from './components/Home';
import DiagnosticInterface from './components/DiagnosticInterface';
import Results from './components/Results';
import History from './components/History';
import { supabase } from './lib/supabase';

type View = 'home' | 'diagnostic' | 'results' | 'history';

interface AnalysisResult {
  classification: string;
  confidence: number;
  imageAnalysis: {
    suspicious_areas: number;
    density: string;
    calcifications: boolean;
  };
  textAnalysis: {
    severity: string;
    key_symptoms: string[];
    risk_factors: string[];
  };
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const simulateAnalysis = async (imageFile: File | null, complaint: string): Promise<AnalysisResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const symptoms = complaint.toLowerCase();
    const hasLump = symptoms.includes('lump') || symptoms.includes('mass');
    const hasPain = symptoms.includes('pain') || symptoms.includes('ache');
    const hasDischarge = symptoms.includes('discharge') || symptoms.includes('nipple');
    const hasChanges = symptoms.includes('change') || symptoms.includes('dimpl') || symptoms.includes('size');

    const riskScore = [hasLump, hasPain, hasDischarge, hasChanges].filter(Boolean).length;
    const isMalignant = riskScore >= 2 || hasLump;

    const keySymptoms: string[] = [];
    if (hasLump) keySymptoms.push('Palpable mass');
    if (hasPain) keySymptoms.push('Breast pain');
    if (hasDischarge) keySymptoms.push('Nipple discharge');
    if (hasChanges) keySymptoms.push('Structural changes');
    if (keySymptoms.length === 0) keySymptoms.push('General discomfort');

    const riskFactors: string[] = [];
    if (symptoms.includes('family')) riskFactors.push('Family history');
    if (symptoms.includes('age') || symptoms.includes('old')) riskFactors.push('Age factor');
    if (symptoms.includes('previous') || symptoms.includes('before')) riskFactors.push('Previous history');
    if (riskFactors.length === 0) riskFactors.push('No significant risk factors identified');

    return {
      classification: isMalignant ? 'Malignant' : 'Benign',
      confidence: isMalignant ? 75 + Math.random() * 15 : 80 + Math.random() * 15,
      imageAnalysis: {
        suspicious_areas: isMalignant ? Math.floor(Math.random() * 3) + 1 : 0,
        density: ['Fatty', 'Scattered', 'Heterogeneous', 'Dense'][Math.floor(Math.random() * 4)],
        calcifications: isMalignant ? Math.random() > 0.5 : false
      },
      textAnalysis: {
        severity: isMalignant ? (riskScore >= 3 ? 'High' : 'Moderate') : 'Low',
        key_symptoms: keySymptoms,
        risk_factors: riskFactors
      }
    };
  };

  const handleAnalyze = async (imageFile: File | null, complaint: string) => {
    const result = await simulateAnalysis(imageFile, complaint);
    setAnalysisResult(result);

    try {
      const { error } = await supabase
        .from('analysis_records')
        .insert({
          patient_complaint: complaint,
          result: result.classification,
          confidence_score: result.confidence,
          image_features: result.imageAnalysis,
          text_features: result.textAnalysis,
          image_url: imageFile ? 'uploaded_image' : ''
        });

      if (error) {
        console.error('Error saving record:', error);
      }
    } catch (err) {
      console.error('Failed to save analysis:', err);
    }

    setCurrentView('results');
  };

  return (
    <>
      {currentView === 'home' && (
        <Home onStartAnalysis={() => setCurrentView('diagnostic')} />
      )}
      {currentView === 'diagnostic' && (
        <DiagnosticInterface
          onAnalyze={handleAnalyze}
          onBack={() => setCurrentView('home')}
        />
      )}
      {currentView === 'results' && analysisResult && (
        <Results
          result={analysisResult}
          onBack={() => setCurrentView('diagnostic')}
          onViewHistory={() => setCurrentView('history')}
        />
      )}
      {currentView === 'history' && (
        <History onBack={() => setCurrentView('home')} />
      )}
    </>
  );
}

export default App;

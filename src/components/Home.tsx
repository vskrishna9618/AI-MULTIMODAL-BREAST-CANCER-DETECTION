import { Activity, Brain, FileText } from 'lucide-react';

interface HomeProps {
  onStartAnalysis: () => void;
}

export default function Home({ onStartAnalysis }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Activity className="w-20 h-20 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MultiBCD
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Multimodal Breast Cancer Detection System
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            AI-powered diagnostic assistance combining mammographic image analysis with patient symptom evaluation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
            <Brain className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Advanced AI Analysis
            </h3>
            <p className="text-gray-600">
              Dual-head autoencoder architecture analyzes mammographic images without manual lesion annotation
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
            <FileText className="w-12 h-12 text-cyan-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Natural Language Processing
            </h3>
            <p className="text-gray-600">
              GPT-4 integration extracts diagnostic information from patient complaint narratives
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-500">
            <Activity className="w-12 h-12 text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Clinical Accuracy
            </h3>
            <p className="text-gray-600">
              Achieves 80.15% F1 score and 90.68% recall rate, outperforming traditional methods
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg text-lg shadow-lg transition-all hover:shadow-xl"
          >
            Start New Analysis
          </button>
        </div>

        <div className="mt-16 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Medical Disclaimer:</strong> This system is designed for research and educational purposes.
            All diagnostic results should be reviewed by qualified healthcare professionals.
            This tool does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
}

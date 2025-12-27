import { AlertCircle, CheckCircle, Activity, ArrowLeft, History } from 'lucide-react';

interface ResultsProps {
  result: {
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
  };
  onBack: () => void;
  onViewHistory: () => void;
}

export default function Results({ result, onBack, onViewHistory }: ResultsProps) {
  const isMalignant = result.classification.toLowerCase() === 'malignant';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            New Analysis
          </button>
          <button
            onClick={onViewHistory}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <History className="w-5 h-5 mr-2" />
            View History
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`p-8 ${isMalignant ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isMalignant ? (
                  <AlertCircle className="w-12 h-12 text-red-600 mr-4" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Classification: {result.classification}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Analysis completed with multimodal AI system
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">
                  {result.confidence.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Image Analysis Results
                </h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Suspicious Areas Detected:</span>
                  <span className={`font-semibold ${result.imageAnalysis.suspicious_areas > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {result.imageAnalysis.suspicious_areas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Breast Density:</span>
                  <span className="font-semibold text-gray-900">{result.imageAnalysis.density}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Calcifications Present:</span>
                  <span className={`font-semibold ${result.imageAnalysis.calcifications ? 'text-orange-600' : 'text-green-600'}`}>
                    {result.imageAnalysis.calcifications ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-cyan-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Clinical Text Analysis
                </h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <span className="text-gray-700 font-medium block mb-2">Severity Assessment:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    result.textAnalysis.severity === 'High' ? 'bg-red-100 text-red-700' :
                    result.textAnalysis.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {result.textAnalysis.severity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium block mb-2">Key Symptoms Identified:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.textAnalysis.key_symptoms.map((symptom, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-700 font-medium block mb-2">Risk Factors:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.textAnalysis.risk_factors.map((factor, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-6 border-l-4 p-6 rounded-lg ${
          isMalignant ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'
        }`}>
          <p className={`text-sm font-semibold mb-2 ${isMalignant ? 'text-red-900' : 'text-green-900'}`}>
            {isMalignant ? 'Recommended Actions:' : 'Clinical Recommendation:'}
          </p>
          <p className={`text-sm ${isMalignant ? 'text-red-800' : 'text-green-800'}`}>
            {isMalignant ? (
              'Immediate consultation with an oncologist is recommended. Further diagnostic testing including biopsy should be considered. This result requires urgent medical attention.'
            ) : (
              'Continue regular screening schedule. Maintain healthy lifestyle practices. Schedule routine follow-up examination as per standard clinical guidelines.'
            )}
          </p>
        </div>

        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> These results are generated by an AI system for research purposes.
            Final diagnosis must be confirmed by qualified medical professionals through comprehensive clinical evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Upload, FileText, Loader, ArrowLeft } from 'lucide-react';

interface DiagnosticInterfaceProps {
  onAnalyze: (imageFile: File | null, complaint: string) => Promise<void>;
  onBack: () => void;
}

export default function DiagnosticInterface({ onAnalyze, onBack }: DiagnosticInterfaceProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [complaint, setComplaint] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint.trim()) {
      alert('Please enter patient complaint');
      return;
    }

    setIsAnalyzing(true);
    try {
      await onAnalyze(imageFile, complaint);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Diagnostic Analysis
          </h2>
          <p className="text-gray-600 mb-8">
            Upload mammographic images and enter patient symptoms for multimodal analysis
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Mammographic Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-600">
                      Click to upload mammogram image
                    </span>
                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG, DICOM up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Patient Complaint
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Enter detailed patient symptoms, concerns, and medical history..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  rows={6}
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Include details about pain, lumps, discharge, duration, and any other relevant symptoms
              </p>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !complaint.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg shadow-lg transition-all hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This analysis combines image processing with natural language understanding
            to provide comprehensive diagnostic assistance. Results are generated using ensemble machine learning models.
          </p>
        </div>
      </div>
    </div>
  );
}

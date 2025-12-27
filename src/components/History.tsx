import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { supabase, AnalysisRecord } from '../lib/supabase';

interface HistoryProps {
  onBack: () => void;
}

export default function History({ onBack }: HistoryProps) {
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('analysis_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Analysis History
          </h2>
          <p className="text-gray-600 mb-8">
            View all previous diagnostic analyses
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              Error: {error}
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No analysis records found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => {
                const isMalignant = record.result.toLowerCase() === 'malignant';
                const date = new Date(record.created_at);

                return (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          {isMalignant ? (
                            <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                          ) : (
                            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                          )}
                          <span className={`text-xl font-semibold ${
                            isMalignant ? 'text-red-700' : 'text-green-700'
                          }`}>
                            {record.result}
                          </span>
                          <span className="ml-4 text-sm text-gray-500">
                            Confidence: {record.confidence_score.toFixed(1)}%
                          </span>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700 block mb-1">
                            Patient Complaint:
                          </span>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {record.patient_complaint}
                          </p>
                        </div>

                        {record.patient_id && (
                          <div className="text-sm text-gray-500">
                            Patient ID: {record.patient_id}
                          </div>
                        )}
                      </div>

                      <div className="ml-6 text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {date.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {date.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

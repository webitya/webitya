'use client';
import { useState } from 'react';
import { CloudUpload, SaveAlt } from '@mui/icons-material';

export default function ReceiverInput() {
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const extractEmails = (text) => {
    return text
      .split(/[\s,;]+/)
      .map(e => e.trim())
      .filter(e => isValidEmail(e));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Only .csv files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      const emailList = extractEmails(text);
      if (emailList.length === 0) {
        setError('No valid emails found in CSV.');
      } else {
        setEmails((prev) => {
          const prevEmails = extractEmails(prev);
          const combined = [...new Set([...prevEmails, ...emailList])];
          return combined.join(', ');
        });
        setError('');
        setFileName(file.name);
      }
    };
    reader.readAsText(file);
  };

  const saveReceivers = () => {
    const emailList = extractEmails(emails);
    if (emailList.length === 0) {
      setError('No valid emails to save.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('receivers', emailList.join(','));
    }

    setError('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-xl rounded-2xl p-6 my-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📧 Add Client Emails
      </h3>

      {/* Manual Entry */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Manual Entry</label>
      <textarea
        placeholder="Enter emails separated by commas or spaces"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* CSV Upload */}
      <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Or Upload CSV</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <CloudUpload className="text-blue-600" />
      </div>
      {fileName && (
        <p className="text-sm text-gray-500 mt-1">📎 Uploaded: {fileName}</p>
      )}

      {/* Error or Success */}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {showSuccess && (
        <div className="text-green-600 text-sm mt-2 animate-pulse">
          ✅ Emails saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={saveReceivers}
        className="mt-5 w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow transition-all duration-200"
      >
        <SaveAlt fontSize="small" /> Save Emails
      </button>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Modal from '../SendEmailFunctionModal'; // Adjust this import as needed

const DEFAULT_TEMPLATE = `
  <h2>Welcome to Webitya!</h2>
  <p>Thank you for choosing our web services. 🚀</p>
  <p>We’re here to help you build your online presence.</p>
  <p>~ Team Webitya</p>
`;

export default function TemplateEditor() {
  const [template, setTemplate] = useState('');
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    icon: 'info',
    iconColor: 'blue',
  });

  const showModal = ({ title, message, icon = 'info', iconColor = 'blue' }) => {
    setModal({ isOpen: true, title, message, icon, iconColor });
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  // Load saved template or use default
  useEffect(() => {
    const storedTemplate = localStorage.getItem('template');
    setTemplate(storedTemplate || DEFAULT_TEMPLATE);
  }, []);

  // Save to localStorage
  const saveTemplate = () => {
    if (!template.trim()) {
      showModal({
        title: 'Empty Template',
        message: 'Please enter some content before saving.',
        icon: 'warning',
        iconColor: 'orange',
      });
      return;
    }

    localStorage.setItem('template', template);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    showModal({
      title: 'Saved!',
      message: '✅ Your email template has been saved.',
      icon: 'check_circle',
      iconColor: 'green',
    });
  };

  // Reset template
  const resetTemplate = () => {
    setTemplate(DEFAULT_TEMPLATE);
    localStorage.setItem('template', DEFAULT_TEMPLATE);
    showModal({
      title: 'Reset Successful',
      message: '🧹 The template has been reset to default.',
      icon: 'refresh',
      iconColor: 'gray',
    });
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 space-y-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-200 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-blue-700 text-center">Email Template Editor</h3>

        <textarea
          placeholder="Write your email template here using HTML or plain text..."
          value={template}
          onChange={e => setTemplate(e.target.value)}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
        />

        <div className="flex space-x-4">
          <button
            onClick={saveTemplate}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            💾 Save Template
          </button>
          <button
            onClick={resetTemplate}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            ♻️ Reset to Default
          </button>
        </div>

        {saved && <div className="text-green-600 font-medium">✅ Template saved successfully!</div>}

        <div className="w-full border-t pt-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-2">📧 Live Preview</h4>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
            <div
              dangerouslySetInnerHTML={{ __html: template }}
            />
            <p className="mt-2 text-xs text-gray-400 italic">
              ⚠️ This is a live preview using HTML. Make sure to test formatting before sending.
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        icon={modal.icon}
        iconColor={modal.iconColor}
        onClose={closeModal}
      />
    </>
  );
}

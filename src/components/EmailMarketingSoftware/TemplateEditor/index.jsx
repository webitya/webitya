'use client';

import { useEffect, useState } from 'react';
import Modal from '../SendEmailFunctionModal';

import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EmailIcon from '@mui/icons-material/Email';

const DEFAULT_TEMPLATE = `
  <h2 style="color:#2563EB;">Welcome to Webitya!</h2>
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

  useEffect(() => {
    const storedTemplate = localStorage.getItem('template');
    setTemplate(storedTemplate || DEFAULT_TEMPLATE);
  }, []);

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
      <div className="mx-auto p-6 bg-white border border-gray-200 shadow-xl rounded-2xl mt-12 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700 flex justify-center items-center gap-2">
            <EmailIcon fontSize="large" /> Email Template Editor
          </h2>
          <p className="text-sm text-gray-500 mt-1">Design your client email template using HTML or plain text.</p>
        </div>

        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Content</label>
          <textarea
            placeholder="Write your email template here using HTML or plain text..."
            value={template}
            onChange={e => setTemplate(e.target.value)}
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button
            onClick={saveTemplate}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg shadow hover:brightness-110 transition"
          >
            <SaveIcon fontSize="small" /> Save Template
          </button>
          <button
            onClick={resetTemplate}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg border hover:bg-gray-200 transition"
          >
            <RestartAltIcon fontSize="small" /> Reset to Default
          </button>
        </div>

        {/* Save feedback */}
        {saved && (
          <div className="text-green-600 text-sm font-medium flex items-center gap-1">
            ✅ Template saved successfully!
          </div>
        )}

        {/* Live Preview */}
        <div className="border-t pt-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-1">
            📧 Live Preview
          </h4>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: template }} />
            <p className="mt-3 text-xs text-gray-400 italic">
              ⚠️ This preview renders your HTML directly. Always test your email before sending it to clients.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
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

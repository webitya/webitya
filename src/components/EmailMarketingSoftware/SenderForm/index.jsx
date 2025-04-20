'use client';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Trash2, Info } from 'lucide-react';
import Modal from '../SendEmailFunctionModal'; // Adjust the path to your modal

export default function SenderForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [senders, setSenders] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [validationError, setValidationError] = useState('');

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

  const loadSenders = () => {
    const storedSenders = JSON.parse(localStorage.getItem('senders') || '[]');
    setSenders(storedSenders);
  };

  useEffect(() => {
    loadSenders();
    const saved = localStorage.getItem('selectedSender');
    if (saved) setSelectedEmail(saved);
  }, []);

  const saveSender = () => {
    if (!email || !password) {
      setValidationError('⚠️ Please enter both email and app password.');
      return;
    }

    const exists = senders.some(sender => sender.email === email);
    if (exists) {
      showModal({
        title: 'Duplicate Sender',
        message: 'This sender email is already saved.',
        icon: 'info',
        iconColor: 'blue',
      });
      return;
    }

    const newSender = { email, pass: password.replace(/\s/g, '') };
    const updatedSenders = [...senders, newSender];
    localStorage.setItem('senders', JSON.stringify(updatedSenders));
    localStorage.setItem('selectedSender', email);

    setSenders(updatedSenders);
    setEmail('');
    setPassword('');
    setSelectedEmail('');
    setValidationError('');

    showModal({
      title: 'Saved!',
      message: '✅ Sender email saved successfully.',
      icon: 'check_circle',
      iconColor: 'green',
    });
  };

  const handleSelect = (selected) => {
    setSelectedEmail(selected);
    localStorage.setItem('selectedSender', selected);
    const found = senders.find(sender => sender.email === selected);
    if (found) {
      setEmail(found.email);
      setPassword(found.pass);
    }
  };

  const deleteSender = (emailToDelete) => {
    const updated = senders.filter(sender => sender.email !== emailToDelete);
    localStorage.setItem('senders', JSON.stringify(updated));
    setSenders(updated);
    localStorage.removeItem('selectedSender');

    if (selectedEmail === emailToDelete) {
      resetForm();
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setSelectedEmail('');
    setValidationError('');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-2xl p-6 my-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📧 Manage Sender Emails</h2>
        <p className="text-sm text-gray-500 mb-4">Total Saved: {senders.length}</p>

        {/* Info Box */}
        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-sm flex items-start gap-2 mb-5 border-l-4 border-blue-400">
          <Info className="w-5 h-5 mt-0.5" />
          <p>
            Use an <strong>App Password</strong> instead of your regular email password.
            You can generate this in your email account settings for secure access.
          </p>
        </div>

        {/* Saved Sender Dropdown */}
        {senders.length > 0 && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">📂 Select a Saved Sender</label>
            <div className="flex gap-2">
              <select
                value={selectedEmail}
                onChange={(e) => handleSelect(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Sender --</option>
                {senders.map((sender, index) => (
                  <option key={index} value={sender.email}>
                    {sender.email}
                  </option>
                ))}
              </select>
              {selectedEmail && (
                <button
                  onClick={() => deleteSender(selectedEmail)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Sender"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
          <input
            type="email"
            placeholder="e.g. sender@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">App Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="App-specific password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="text-red-600 text-sm mb-4">{validationError}</div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={saveSender}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            💾 Save Sender
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Modal Component */}
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

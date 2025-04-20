'use client';
import { useState, useEffect } from 'react';
import Modal from '../SendEmailFunctionModal'; // ⬅️ Adjust path as needed

export default function SendEmailsFunction() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState([]); // Corrected line: no type annotations
  const [successCount, setSuccessCount] = useState(0);
  const [sendersCount, setSendersCount] = useState(0);
  const [receiversCount, setReceiversCount] = useState(0);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    icon: 'info',
    iconColor: 'blue',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const senders = JSON.parse(localStorage.getItem('senders') || '[]');
      const receivers = localStorage.getItem('receivers') || '';
      setSendersCount(senders.length);
      setReceiversCount(receivers.split(',').filter(Boolean).length);
    }
  }, []);

  const showModal = ({ title, message, icon = 'info', iconColor = 'blue' }) => {
    setModal({ isOpen: true, title, message, icon, iconColor });
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  const sendEmails = async () => {
    setLoading(true);
    setProgress(0);
    setErrors([]);
    setSuccessCount(0);

    if (typeof window === 'undefined') return;

    const senders = JSON.parse(localStorage.getItem('senders') || '[]');
    const receivers = localStorage.getItem('receivers') || '';
    const template = localStorage.getItem('template') || '';

    if (senders.length === 0 || !receivers || !template) {
      showModal({
        title: 'Missing Data',
        message: 'Please ensure sender, receivers, and template are all provided.',
        icon: 'warning',
        iconColor: 'orange',
      });
      setLoading(false);
      return;
    }

    const sender = senders[0];
    const toList = receivers.split(',').map(email => email.trim()).filter(Boolean);

    try {
      for (let i = 0; i < toList.length; i++) {
        const to = toList[i];
        const enhancedHtml = `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            ${template}
            <br/><br/>
            <hr/>
            <p style="font-size: 12px; color: #777;">
              You're receiving this email from <strong>${sender.email}</strong>.<br/>
              If you didn't request this, please ignore.<br/>
              To unsubscribe, reply with "unsubscribe".
            </p>
          </div>
        `;

        const res = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to,
            subject: "📢 Important Update from Webitya",
            html: enhancedHtml,
            senderEmail: sender.email,
            senderPass: sender.pass,
          }),
        });

        const result = await res.json();
        if (result.success) {
          setSuccessCount(prev => prev + 1);
        } else {
          setErrors(prev => [...prev, `❌ ${to}: ${result.error}`]);
        }

        setProgress(Math.round(((i + 1) / toList.length) * 100));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      showModal({
        title: 'Emails Sent!',
        message: `Successfully sent emails to ${successCount} recipient(s).`,
        icon: 'check_circle',
        iconColor: 'green',
      });

    } catch (err) {
      showModal({
        title: 'Unexpected Error',
        message: `Something went wrong: ${err.message}`,
        icon: 'error',
        iconColor: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          {/* <span className="material-icons text-green-600">send</span> */}
          Send Email Campaign
        </h3>

        <div className="mb-4 text-gray-600 text-sm">
          <p><span className="material-icons text-base text-blue-600 mr-1 align-middle">person</span> Senders loaded: <strong>{sendersCount}</strong></p>
          <p><span className="material-icons text-base text-orange-600 mr-1 align-middle">group</span> Receivers count: <strong>{receiversCount}</strong></p>
        </div>

        <button
          onClick={sendEmails}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2 rounded-md text-white font-medium ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} transition`}
        >
          <span className="material-icons">{loading ? 'autorenew' : ''}</span>
          {loading ? 'Sending...' : 'Send Campaign'}
        </button>

        {loading && (
          <div className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
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

export default function SendEmailFunctionModal({ isOpen, onClose, title, message, icon = "info", iconColor = "blue" }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white w-96 rounded-lg p-6 shadow-xl relative">
          <div className={`flex items-center mb-4 text-${iconColor}-600`}>
            <span className="material-icons text-3xl mr-3">{icon}</span>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-gray-700">{message}</p>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    );
  }
  
function QRCodeModal({ isOpen, onClose, url }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
  
          <h2 className="mb-4 text-2xl font-bold text-white">
            QR Code
          </h2>
  
          <div className="flex justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${url}`}
              alt="QR Code"
              className="rounded-xl bg-white p-2"
            />
          </div>
  
          <p className="mt-4 break-all text-center text-sky-400">
            {url}
          </p>
  
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 py-3 font-semibold text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  export default QRCodeModal;
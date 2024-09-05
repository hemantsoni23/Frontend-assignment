import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, challengeId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-1/3 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Challenge</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this challenge? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => onDelete(challengeId)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

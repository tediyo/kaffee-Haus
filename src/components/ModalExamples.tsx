'use client';

import { useState } from 'react';
import { Coffee, Star, Heart, MessageCircle, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import CommonModal, { ModalButton } from './CommonModal';
import { useModal } from '../hooks/useModal';

const ModalExamples = () => {
  const [customModal, setCustomModal] = useState(false);
  const alertModal = useModal();
  const successModal = useModal();
  const confirmModal = useModal();

  const handleConfirm = () => {
    console.log('Confirmed!');
    confirmModal.close();
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    confirmModal.close();
  };

  const alertButtons: ModalButton[] = [
    {
      text: 'OK',
      onClick: alertModal.close,
      variant: 'primary',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const successButtons: ModalButton[] = [
    {
      text: 'Great!',
      onClick: successModal.close,
      variant: 'success',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const confirmButtons: ModalButton[] = [
    {
      text: 'Cancel',
      onClick: handleCancel,
      variant: 'secondary'
    },
    {
      text: 'Confirm',
      onClick: handleConfirm,
      variant: 'danger',
      icon: <AlertCircle className="h-4 w-4" />
    }
  ];

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Modal Examples</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setCustomModal(true)}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
        >
          Custom Modal
        </button>
        
        <button
          onClick={alertModal.open}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Alert Modal
        </button>
        
        <button
          onClick={successModal.open}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Success Modal
        </button>
        
        <button
          onClick={confirmModal.open}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Confirm Modal
        </button>
      </div>

      {/* Custom Modal */}
      <CommonModal
        isOpen={customModal}
        onClose={() => setCustomModal(false)}
        title="Custom Modal"
        subtitle="This is a custom modal with custom content"
        icon={<Coffee className="h-6 w-6" />}
        size="lg"
        headerColor="amber"
        buttons={[
          {
            text: 'Action 1',
            onClick: () => console.log('Action 1'),
            variant: 'primary',
            icon: <Star className="h-4 w-4" />
          },
          {
            text: 'Action 2',
            onClick: () => console.log('Action 2'),
            variant: 'secondary'
          }
        ]}
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Custom Content</h3>
          <p className="text-gray-600 mb-4">
            This modal demonstrates how you can create custom content for any purpose.
            You can add forms, images, lists, or any other React components.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Customizable header colors</li>
              <li>Multiple sizes (sm, md, lg, xl, full)</li>
              <li>Flexible button configurations</li>
              <li>Custom icons and content</li>
              <li>Keyboard navigation support</li>
            </ul>
          </div>
        </div>
      </CommonModal>

      {/* Alert Modal */}
      <CommonModal
        isOpen={alertModal.isOpen}
        onClose={alertModal.close}
        title="Alert"
        subtitle="This is an alert message"
        icon={<AlertCircle className="h-6 w-6" />}
        size="sm"
        headerColor="blue"
        buttons={alertButtons}
      >
        <div className="p-6 text-center">
          <AlertCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">This is an important alert message that requires your attention.</p>
        </div>
      </CommonModal>

      {/* Success Modal */}
      <CommonModal
        isOpen={successModal.isOpen}
        onClose={successModal.close}
        title="Success!"
        subtitle="Operation completed successfully"
        icon={<CheckCircle className="h-6 w-6" />}
        size="sm"
        headerColor="green"
        buttons={successButtons}
      >
        <div className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Your action has been completed successfully!</p>
        </div>
      </CommonModal>

      {/* Confirm Modal */}
      <CommonModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        title="Confirm Action"
        subtitle="Are you sure you want to proceed?"
        icon={<AlertCircle className="h-6 w-6" />}
        size="sm"
        headerColor="red"
        buttons={confirmButtons}
      >
        <div className="p-6 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">This action cannot be undone. Are you sure you want to continue?</p>
        </div>
      </CommonModal>
    </div>
  );
};

export default ModalExamples;

'use client';

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotifier: React.FC = () => {
  React.useEffect(() => {
    toast.info('Use 100% for the most optimized version!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return <ToastContainer />;
};

export default ToastNotifier;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface ToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const getStyleAndIcon = (type: string) => {
    switch (type) {
      case 'success':
        return {
          wrapper: 'bg-slate-900 border-slate-800 text-white shadow-xl',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        };
      case 'warning':
        return {
          wrapper: 'bg-amber-50 border-amber-200 text-amber-900 shadow-lg',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        };
      case 'error':
        return {
          wrapper: 'bg-red-50 border-red-200 text-red-900 shadow-lg',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        };
      default:
        return {
          wrapper: 'bg-slate-950 border-slate-800 text-white shadow-xl',
          icon: <Info className="w-5 h-5 text-blue-400" />,
        };
    }
  };

  const currentStyle = getStyleAndIcon(message.type);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle max-w-sm w-full">
      <div className={`flex items-center justify-between p-4 rounded-xl border ${currentStyle.wrapper} shadow-2xl transition-all duration-300`}>
        <div className="flex items-center gap-3">
          {currentStyle.icon}
          <p className="text-xs font-semibold leading-relaxed pr-2">
            {message.text}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 hover:bg-white/10 rounded transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

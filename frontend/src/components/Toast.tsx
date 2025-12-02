import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props =>
        props.$type === 'success' ? '#4caf50' :
            props.$type === 'error' ? '#f44336' :
                '#2196f3'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 2000;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  min-width: 300px;
`;

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <ToastContainer $type={type}>
            <span>
                {type === 'success' && '✅'}
                {type === 'error' && '❌'}
                {type === 'info' && 'ℹ️'}
            </span>
            {message}
        </ToastContainer>
    );
};

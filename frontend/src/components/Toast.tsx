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

const progressBar = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const ToastContainer = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #333;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  animation: ${slideIn} 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  min-width: 320px;
  border-left: 5px solid ${props =>
    props.$type === 'success' ? '#00b894' :
      props.$type === 'error' ? '#d63031' :
        '#0984e3'};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: ${props =>
    props.$type === 'success' ? '#00b894' :
      props.$type === 'error' ? '#d63031' :
        '#0984e3'};
    animation: ${progressBar} 3s linear forwards;
  }
`;

const Icon = styled.span<{ $type: 'success' | 'error' | 'info' }>`
  font-size: 1.5rem;
  color: ${props =>
    props.$type === 'success' ? '#00b894' :
      props.$type === 'error' ? '#d63031' :
        '#0984e3'};
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
      <Icon $type={type}>
        {type === 'success' && '✨'}
        {type === 'error' && '🚫'}
        {type === 'info' && '💡'}
      </Icon>
      {message}
    </ToastContainer>
  );
};

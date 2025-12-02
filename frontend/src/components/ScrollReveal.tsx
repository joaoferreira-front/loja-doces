import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: string;
    width?: string;
    style?: React.CSSProperties;
}

const RevealWrapper = styled.div<{ $isVisible: boolean; $delay: string; $width?: string }>`
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: translateY(${props => (props.$isVisible ? 0 : '30px')});
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: ${props => props.$delay};
  width: ${props => props.$width || 'auto'};
`;

export const ScrollReveal = ({ children, delay = '0s', width, style }: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animate only once
                }
            },
            {
                threshold: 0.15, // Trigger when 15% of element is visible
                rootMargin: '0px 0px -50px 0px' // Offset slightly so it doesn't trigger at the very bottom edge
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <RevealWrapper ref={ref} $isVisible={isVisible} $delay={delay} $width={width} style={style}>
            {children}
        </RevealWrapper>
    );
};

'use client'
import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Reveal from './motions/Reveal';

interface ModalProps {
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const elRef = useRef<HTMLDivElement | null>(null);

	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal');
		if (modalRoot) {
			modalRoot.appendChild(elRef.current!);
		}

		// When component will unmount
		return () => {
			if (modalRoot) {
				modalRoot.removeChild(elRef.current!);
			}
		};
	}, []);

	return createPortal(<Reveal
		hidden={{ opacity: 0, y: 100, x: 0 }}
		visible={{ opacity: 100, y: 0, x: 0 }}
		transition={{ duration: 0.1, delay: 0.2 }}
	>{children}</Reveal>, elRef.current!);
};

export default Modal;

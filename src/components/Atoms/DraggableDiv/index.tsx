import { useEffect, useRef, useState } from 'react';
import useStateRef from 'react-usestateref';

export default function DraggableDiv({
  divStyles,
  divClassNames,
  children,
  hidden
}: {
  divStyles?: React.CSSProperties;
  divClassNames?: string;
  children: React.ReactNode;
  hidden: boolean;
}) {
  const [isDragging, setIsDragging, isDraggingRef] = useStateRef(false);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const divRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && divRef.current) {
        const divRect = divRef.current.getBoundingClientRect();
        const body = document.getElementById('app') as HTMLDivElement;

        if (
          e.clientX > divRect.left &&
          e.clientX < divRect.right &&
          e.clientY > divRect.top &&
          e.clientY < divRect.bottom
        ) {
          e.preventDefault();
        }

        setPosition({
          x: body?.offsetWidth - e.clientX - divRect.width / 2,
          y: body?.offsetHeight - e.clientY - divRect.height / 2
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (divRef.current) {
      divRef.current.addEventListener('mousedown', handleMouseDown);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener('mousedown', handleMouseDown);
        divRef.current.removeEventListener('mousemove', handleMouseMove);
        divRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isDragging]);

  useEffect(() => {}, [isDragging]);
  return (
    <div
      ref={divRef}
      className={divClassNames}
      style={{ ...divStyles, position: 'fixed', right: position.x, bottom: position.y, cursor: 'move' }}
      hidden={hidden}
    >
      {children}
    </div>
  );
}

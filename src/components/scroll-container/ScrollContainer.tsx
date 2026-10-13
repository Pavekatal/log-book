// 'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollContainerType {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollContainer({
  children,
  className = 'h-96 w-full',
}: ScrollContainerType) {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef({
    isDragging: false,
    startY: 0,
    startScrollTop: 0,
  });

  useEffect(() => {
    const content = contentRef.current;
    const thumb = thumbRef.current;

    if (!content) return;

    const updateScroll = () => {
      const totalHeight = content.scrollHeight;
      const visibleHeight = content.clientHeight;
      const scrollTop = content.scrollTop;

      if (totalHeight <= visibleHeight) {
        setIsScroll(false);
        return;
      }

      setIsScroll(true);
      if (!thumb) return;

      const thumbHeight = Math.max(
        (visibleHeight / totalHeight) * visibleHeight,
        30,
      );
      thumb.style.height = `${thumbHeight}px`;

      const maxScrollTop = totalHeight - visibleHeight;
      const maxThumbTop = visibleHeight - thumbHeight;
      const thumbTop =
        maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    content.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);

    const resizeObserver = new ResizeObserver(updateScroll);
    resizeObserver.observe(content);

    const timer = setTimeout(updateScroll, 50);

    return () => {
      content.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [isScroll]);

  // Клик мыши на бегунок (начало перетаскивания)
  const thumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!contentRef.current) return;

    dragRef.current = {
      isDragging: true,
      startY: e.clientY,
      startScrollTop: contentRef.current.scrollTop,
    };

    // Меняем курсор во время перетаскивания
    document.body.style.cursor = 'grabbing';
    document.addEventListener('mousemove', thumbMouseMove);
    document.addEventListener('mouseup', thumbMouseUp);
  };

  const thumbMouseMove = (e: MouseEvent) => {
    const content = contentRef.current;
    const thumb = thumbRef.current;
    if (!dragRef.current.isDragging || !content || !thumb) return;

    const deltaY = e.clientY - dragRef.current.startY;

    const totalHeight = content.scrollHeight;
    const visibleHeight = content.clientHeight;
    const thumbHeight = thumb.clientHeight;

    const maxScrollTop = totalHeight - visibleHeight;
    const maxThumbTop = visibleHeight - thumbHeight;

    if (maxThumbTop <= 0) return;

    const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;
    content.scrollTop = dragRef.current.startScrollTop + scrollDelta;
  };

  const thumbMouseUp = () => {
    dragRef.current.isDragging = false;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', thumbMouseMove);
    document.removeEventListener('mouseup', thumbMouseUp);
  };

  return (
    <div className={`relative group flex flex-col ${className}`}>
      <div
        ref={contentRef}
        className="w-full max-h-[inherit] overflow-y-auto pr-4 [ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden flex flex-col gap-3"
      >
        {children}
      </div>

      {isScroll && (
        <div className="absolute top-0 bottom-0 right-0 w-2 rounded-full bg-white/5 backdrop-blur-sm ">
          <div
            ref={thumbRef}
            onMouseDown={thumbMouseDown}
            className="w-full rounded-full bg-white/30 backdrop-blur-md shadow-sm transition-all duration-75 cursor-grab active:cursor-grabbing "
          ></div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>/\\|[]{}';

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  speed?: number;
}

const TextScramble = ({ text, className, style, delay = 0, speed = 1 }: TextScrambleProps) => {
  const rafRef = useRef(0);
  const tidRef = useRef(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const runAnimation = () => {
      const nonSpace = text.replace(/[\s·&\-]/g, '').length;
      const totalFrames = Math.max(20, Math.round((nonSpace * 3) / speed));
      let frame = 0;

      const animate = () => {
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (' ·&\n-'.includes(ch)) { out += ch; continue; }
          const lockAt = Math.floor((i / text.length) * totalFrames);
          out += frame >= lockAt ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        if (spanRef.current) spanRef.current.textContent = out;
        frame++;
        if (frame <= totalFrames) rafRef.current = requestAnimationFrame(animate);
      };

      tidRef.current = window.setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    };

    const check = () => {
      if (played.current) return;
      const rect = span.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        played.current = true;
        window.removeEventListener('scroll', check);
        runAnimation();
      }
    };

    check();
    window.addEventListener('scroll', check, { passive: true });

    return () => {
      window.removeEventListener('scroll', check);
      clearTimeout(tidRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, speed]);

  return <span ref={spanRef} className={className} style={style}>{text}</span>;
};

export default TextScramble;

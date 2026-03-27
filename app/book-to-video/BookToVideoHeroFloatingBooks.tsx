'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Hero banner overlays: left book enters from the right; right book enters from the left. */
export default function BookToVideoHeroFloatingBooks() {
  const reduce = useReducedMotion();
  const slide = reduce ? 0 : 72;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-[12] left-[3%] sm:left-[5%] md:left-[6%] bottom-[8%] sm:bottom-[10%] md:bottom-[11%] h-[32%] sm:h-[35%] md:h-[38%] max-h-[200px] sm:max-h-[248px] md:max-h-[292px] w-auto max-w-[22vw] sm:max-w-[18%] md:max-w-[16%]"
        initial={reduce ? false : { x: slide, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2, ease: easeOutExpo }}
      >
        <Image
          src="/youtube-page/book-1.png"
          alt=""
          width={320}
          height={460}
          className="h-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] scale-[1.04]"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute z-[12] right-[3%] sm:right-[5%] md:right-[6%] bottom-[8%] sm:bottom-[10%] md:bottom-[11%] h-[32%] sm:h-[35%] md:h-[38%] max-h-[200px] sm:max-h-[248px] md:max-h-[292px] w-auto max-w-[22vw] sm:max-w-[18%] md:max-w-[16%]"
        initial={reduce ? false : { x: -slide, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.32, ease: easeOutExpo }}
      >
        <Image
          src="/youtube-page/book-2.png"
          alt=""
          width={320}
          height={460}
          className="h-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] scale-[1.04]"
        />
      </motion.div>
    </>
  );
}

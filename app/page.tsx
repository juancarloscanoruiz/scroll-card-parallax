'use client'

import Image from 'next/image';
import styles from './main.styles.module.scss';
import { projects } from './data/projects';
import { Card } from './components/Card';
import { useRef} from 'react';
import { useScroll, useSpring } from 'framer-motion';

export default function Home() {

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  })

  return (
    <main ref={containerRef} className={styles.main}>
      {projects.map((project, index) => {
        const targetScale = 1 - ((projects.length - index) * 0.05)
        return <Card key={`p_${index}`} {...project} index={index} range={[index * 0.25, 1]} targetScale={targetScale} progress={scrollYProgressSpring} />;
      })}
    </main>
  );
}

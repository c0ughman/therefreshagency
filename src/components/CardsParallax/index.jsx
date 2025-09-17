'use client'
import Image from 'next/image';
import styles from './styles.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal from '../ProjectModal';

const Card = ({i, title, description, src, url, color, progress, range, targetScale, stickyTop, onClick}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div className={styles.cardContainer} style={{ top: stickyTop, zIndex: i + 1 }}>
      <motion.div 
        style={{backgroundColor: color, scale}} 
        className={styles.card}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <span>
              <a href={url} target="_blank">See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.inner}>
              <Image
                fill
                src={`/${src}`}
                alt="image" 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const CardsParallax = () => {
  const container = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'] // Changed back to ensure sticky positioning works
  })

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      title: "Briefed",
      description: "An intelligent briefing and project management tool that helps teams stay organized, informed, and aligned with real-time updates and smart notifications.",
      extendedDescription: "Briefed revolutionizes how teams handle project briefings and management. Our platform combines AI-powered insights with intuitive project tracking, ensuring that every team member has the context they need to excel. From initial brief creation to final delivery, Briefed streamlines the entire process with smart notifications, progress tracking, and collaborative tools that keep everyone on the same page.",
      src: "briefed.png",
      url: "#",
      color: "#365446"
    },
    {
      title: "RG Business and Property Law Firm",
      description: "A modern legal services platform specializing in business law and property transactions, providing expert legal counsel and streamlined case management.",
      extendedDescription: "RG Business and Property Law Firm represents the future of legal services, combining traditional legal expertise with cutting-edge technology. Our platform provides comprehensive solutions for business law and property transactions, offering clients transparent case management, real-time updates, and expert legal counsel. We've built a system that makes complex legal processes accessible and efficient.",
      src: "rg.png",
      url: "#",
      color: "#ef6a3d"
    },
    {
      title: "Edecoration",
      description: "A comprehensive interior design and decoration platform that transforms spaces with innovative design solutions and personalized styling recommendations.",
      extendedDescription: "Edecoration brings professional interior design expertise to everyone. Our platform combines AI-driven design recommendations with expert consultation, helping users transform their spaces with confidence. From concept to completion, Edecoration provides personalized styling solutions, 3D visualizations, and access to curated furniture and decor collections that make interior design accessible and enjoyable.",
      src: "edecoration.png",
      url: "#",
      color: "#5d0e25"
    },
    {
      title: "Gather",
      description: "A collaborative workspace platform that brings teams together with integrated communication tools, project tracking, and seamless file sharing capabilities.",
      extendedDescription: "Gather is more than just a workspace platform—it's a complete ecosystem for modern teams. We've created an environment where communication, project management, and collaboration flow seamlessly together. With integrated chat, video conferencing, file sharing, and project tracking, Gather eliminates the need for multiple tools and provides teams with everything they need to work effectively together.",
      src: "gather.png",
      url: "#",
      color: "#0b173d"
    }
  ];

  return (
    <div ref={container} className={styles.main}>
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05);
        const stickyTop = `${i * 30}px`; // Each card sticks 30px below the previous one
        
        console.log(`Card ${i} (${project.title}): stickyTop = ${stickyTop}`);
        
        // Adjust range for the last card to ensure it completes within the scroll
        const range = i === projects.length - 1 
          ? [i * .15, 1] // Last card completes at the end of scroll
          : [i * .15, (i + 1) * .15]; // Other cards have their own ranges
        
        return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={range} targetScale={targetScale} stickyTop={stickyTop} onClick={() => handleCardClick(project)}/>
      })}
      
      <ProjectModal 
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default CardsParallax;

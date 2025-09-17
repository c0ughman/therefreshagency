'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './styles.module.scss';

const ProjectModal = ({ isOpen, project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            style={{ backgroundColor: project.color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Modal content */}
            <div className={styles.modalBody}>
              <div className={styles.content}>
                <h1 className={styles.title}>{project.title}</h1>
                
                <div className={styles.description}>
                  <p>{project.description}</p>
                  <p className={styles.extendedDescription}>
                    {project.extendedDescription || 
                      "This project represents our commitment to innovation and excellence. Through careful planning and execution, we've created a solution that not only meets current needs but anticipates future challenges. Our team has worked tirelessly to ensure every detail is perfect, from the initial concept to the final implementation."}
                  </p>
                </div>

                <div className={styles.imageContainer}>
                  <Image
                    src={`/${project.src}`}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={styles.image}
                  />
                </div>

                <div className={styles.footer}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    View Project
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

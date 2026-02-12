'use client'

import styles from '../ZoomParallax/styles.module.scss';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Shared review card renderer (used by both desktop and mobile)
function ReviewCard({text, author, position, image, images, orientation, styles: s}) {
    return (
        <div className={s.reviewContainer}>
            {orientation === "landscape" ? (
                <>
                    <div className={s.reviewImage + " " + s.landscape}>
                        <img src={image} alt={`${author} review`} />
                    </div>
                    <div className={s.reviewContent}>
                        <div className={s.stars}>★★★★★</div>
                        <p className={s.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                        <div className={s.reviewer}>
                            <strong>{author}</strong>
                            <span>{position}</span>
                        </div>
                    </div>
                </>
            ) : orientation === "landscape-bottom" ? (
                <>
                    <div className={s.reviewContent}>
                        <div className={s.stars}>★★★★★</div>
                        <p className={s.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                        <div className={s.reviewer}>
                            <strong>{author}</strong>
                            <span>{position}</span>
                        </div>
                    </div>
                    <div className={s.reviewImage + " " + s.landscape}>
                        <img src={image} alt={`${author} review`} />
                    </div>
                </>
            ) : orientation === "portrait" ? (
                <>
                    <div className={s.reviewContent}>
                        <div className={s.stars}>★★★★★</div>
                        <p className={s.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                        <div className={s.reviewer}>
                            <strong>{author}</strong>
                            <span>{position}</span>
                        </div>
                    </div>
                    <div className={s.reviewImage + " " + s.portrait + (images ? " " + s["multiple-images"] : "")}>
                        {images ? (
                            images.map((imgSrc, imgIndex) => (
                                <img key={imgIndex} src={imgSrc} alt={`${author} review ${imgIndex + 1}`} />
                            ))
                        ) : (
                            <img src={image} alt={`${author} review`} />
                        )}
                    </div>
                </>
            ) : (
                <div className={s.reviewContent}>
                    <div className={s.stars}>★★★★★</div>
                    <p className={s.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                    <div className={s.reviewer}>
                        <strong>{author}</strong>
                        <span>{position}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function Index() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 0.4], [1.17, 2.2]);
    const scale5 = useTransform(scrollYProgress, [0, 0.4], [0.9, 1.9]);
    const scale6 = useTransform(scrollYProgress, [0, 0.4], [0.9, 3.4]);
    const scale8 = useTransform(scrollYProgress, [0, 0.4], [0.9, 2.6]);
    const scale9 = useTransform(scrollYProgress, [0, 0.4], [0.9, 3]);

    const reviews = [
        {
            text: "Our conversion rate skyrocketed to 20% in just days. Combined with the dozens of new leads every week, this has become an <strong>important pillar of our business</strong>.",
            author: "Edecoration",
            position: "Google Ads",
            scale: scale4,
            image: "/review-images/edeco-cro.png",
            orientation: "landscape-bottom"
        },
        {
            text: "The website is an <strong>elegant, media-packed, beautiful</strong> piece of design. Like a digital showroom that goes beyond anything else in the market. Great job... Keep it up!",
            author: "Edecoration",
            position: "Website",
            scale: scale5,
            image: "/review-images/edecoration-website.png",
            orientation: "landscape-bottom"
        },
        {
            text: "The Refresh Agency has created a <strong>dramatic increase in SEO presence</strong> for the law firm from basically zero to a multitude of clicks and impressions every week. The website was built with SEO in mind from the beginning. And it shows.",
            author: "RG Business & Property Law Firm",
            position: "SEO",
            scale: scale6,
            image: "/review-images/rglawfirm-seo.png",
            orientation: "landscape"
        },
        {
            text: "The Refresh Agency really helped us create a unique brand identity and apply it seamlessly to our <strong>website and product</strong>. The result is a beautiful, well-thought-out interface for our future customers to enjoy.",
            author: "Briefed",
            position: "Website and product",
            scale: scale6,
            images: [
                "/review-images/briefed-product-1.webp",
                "/review-images/briefed-product-2.png",
                "/review-images/briefed-product-3.png"
            ],
            orientation: "portrait"
        },
        {
            text: "Without us having to micromanage everything, the agency <strong>works independently</strong>, bringing real results to our business and building amazing things really fast. A true strategic partner.",
            author: "RG Business & Property Law Firm",
            position: "Website + Marketing",
            scale: scale5,
            image: null,
            orientation: "text-only"
        },
        {
            text: "Working with The Refresh Agency is a <strong>true collaborative process</strong>. Exploring the visual language of our product and how it materializes in every aspect of the user interface has been an extraordinary experience.",
            author: "Gather",
            position: "UI/UX",
            scale: scale8,
            image: "/review-images/gather-website.png",
            orientation: "landscape-bottom"
        },
        {
            text: "The e-commerce store design that The Refresh Agency created for us is <strong>different from anything we've ever seen in the market</strong>. It's beautiful, striking, and undeniably attractive.",
            author: "DesignerKnit",
            position: "Ecommerce Design",
            scale: scale9,
            image: "/review-images/designerknit-sales.png",
            orientation: "portrait"
        },
    ]

    // Mobile: simple scrollable card list, no Framer Motion, no scale transforms
    if (isMobile) {
        return (
            <div className={styles.mobileContainer}>
                {reviews.map(({text, author, position, image, images, orientation}, index) => (
                    <div key={index} className={styles.mobileCard}>
                        <ReviewCard
                            text={text}
                            author={author}
                            position={position}
                            image={image}
                            images={images}
                            orientation={orientation}
                            styles={styles}
                        />
                    </div>
                ))}
            </div>
        )
    }

    // Desktop: original Framer Motion parallax zoom
    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {
                    reviews.map( ({text, author, position, scale, image, images, orientation}, index) => {
                        const isHuellaReal = author === "Huella Real";
                        return <motion.div
                            key={index}
                            style={{
                                scale,
                                zIndex: isHuellaReal ? 1 : 10
                            }}
                            className={styles.el}
                        >
                            <ReviewCard
                                text={text}
                                author={author}
                                position={position}
                                image={image}
                                images={images}
                                orientation={orientation}
                                styles={styles}
                            />
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}

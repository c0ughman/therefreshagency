import styles from './styles.module.scss';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

export default function Index() {
    
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
            text: "Our conversion rate has shot up to 20% in a matter of days. That coupled with the dozens of new leads each week has become a <strong>big pillar of our business</strong>.",
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
            text: "The Refresh Agency has created a <strong>sharp increase in the SEO presence</strong> of the law firm from basically zero to a multitude of clicks and impressions every week. The website was built with SEO in mind from the beginning. And it shows.",
            author: "RG Business & Property Law Firm",
            position: "SEO",
            scale: scale6,
            image: "/review-images/rglawfirm-seo.png",
            orientation: "landscape"
        },
        {
            text: "The Refresh Agency really helped us in coming up with a unique brand identity and applying it seamlessly to our <strong>website and product</strong>. The result is a beautiful, well-thought-out interface for our future customers to enjoy.",
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
            text: "Without us having to micromanage everything, the research agency <strong>works independently</strong>, bringing real results to our business and building out amazing things really fast. A real strategic partner.",
            author: "RG Business & Property Law Firm",
            position: "Website + Marketing",
            scale: scale5,
            image: null,
            orientation: "text-only"
        },
        {
            text: "Working with The Refresh Agency is a <strong>real process of collaboration</strong>. Exploring the visual language of our product and the way it instantiates itself in every aspect of the user interface has been an extraordinary experience.",
            author: "Gather",
            position: "UI/UX",
            scale: scale8,
            image: "/review-images/gather-website.png",
            orientation: "landscape-bottom"
        },
        {
            text: "The e-commerce store design that the refresh agency built out for us is <strong>different from anything we've ever seen in the market</strong>. It's beautiful, striking, and undeniably attractive.",
            author: "DesignerKnit",
            position: "Ecommerce Design",
            scale: scale9,
            image: "/review-images/designerknit-sales.png",
            orientation: "portrait"
        },
    ]

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
                            <div className={styles.reviewContainer}>
                                {orientation === "landscape" ? (
                                    <>
                                        <div className={styles.reviewImage + " " + styles.landscape}>
                                            <img src={image} alt={`${author} review`} />
                                        </div>
                                        <div className={styles.reviewContent}>
                                            <div className={styles.stars}>★★★★★</div>
                                            <p className={styles.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                                            <div className={styles.reviewer}>
                                                <strong>{author}</strong>
                                                <span>{position}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : orientation === "landscape-bottom" ? (
                                    <>
                                        <div className={styles.reviewContent}>
                                            <div className={styles.stars}>★★★★★</div>
                                            <p className={styles.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                                            <div className={styles.reviewer}>
                                                <strong>{author}</strong>
                                                <span>{position}</span>
                                            </div>
                                        </div>
                                        <div className={styles.reviewImage + " " + styles.landscape}>
                                            <img src={image} alt={`${author} review`} />
                                        </div>
                                    </>
                                ) : orientation === "portrait" ? (
                                    <>
                                        <div className={styles.reviewContent}>
                                            <div className={styles.stars}>★★★★★</div>
                                            <p className={styles.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                                            <div className={styles.reviewer}>
                                                <strong>{author}</strong>
                                                <span>{position}</span>
                                            </div>
                                        </div>
                                        <div className={styles.reviewImage + " " + styles.portrait + (images ? " " + styles["multiple-images"] : "")}>
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
                                    <div className={styles.reviewContent}>
                                        <div className={styles.stars}>★★★★★</div>
                                        <p className={styles.reviewText} dangerouslySetInnerHTML={{ __html: text }}></p>
                                        <div className={styles.reviewer}>
                                            <strong>{author}</strong>
                                            <span>{position}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}

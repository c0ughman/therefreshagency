import styles from '../ZoomParallax/styles.module.scss';
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
            text: "Nuestra tasa de conversión se disparó al 20% en cuestión de días. Eso combinado con las decenas de nuevos leads cada semana se ha convertido en un <strong>pilar importante de nuestro negocio</strong>.",
            author: "Edecoration",
            position: "Google Ads",
            scale: scale4,
            image: "/review-images/edeco-cro.png",
            orientation: "landscape-bottom"
        },
        {
            text: "El sitio web tiene un diseño <strong>elegante, llamativo y lleno de fotos y videos</strong>. Como un showroom digital que va más allá de cualquier otra cosa en el mercado. Gran trabajo... ¡Sigan así!",
            author: "Edecoration",
            position: "Website",
            scale: scale5,
            image: "/review-images/edecoration-website.png",
            orientation: "landscape-bottom"
        },
        {
            text: "The Refresh Agency ha creado un <strong>aumento pronunciado en la presencia SEO</strong> del bufete de abogados desde básicamente cero hasta una multitud de clics e impresiones cada semana. El sitio web fue construido con SEO en mente desde el principio. Y se nota.",
            author: "RG Business & Property Law Firm",
            position: "SEO",
            scale: scale6,
            image: "/review-images/rglawfirm-seo.png",
            orientation: "landscape"
        },
        {
            text: "The Refresh Agency realmente nos ayudó a crear una identidad de marca única y aplicarla perfectamente a nuestro <strong>sitio web y producto</strong>. El resultado es una interfaz hermosa y bien pensada para que nuestros futuros clientes disfruten.",
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
            text: "Sin que tengamos que microgestionar todo, la agencia <strong>trabaja de forma independiente</strong>, trayendo resultados reales a nuestro negocio y construyendo cosas increíbles muy rápido. Un verdadero socio estratégico.",
            author: "RG Business & Property Law Firm",
            position: "Website + Marketing",
            scale: scale5,
            image: null,
            orientation: "text-only"
        },
        {
            text: "Trabajar con The Refresh Agency es un <strong>verdadero proceso de colaboración</strong>. Explorar el lenguaje visual de nuestro producto y la forma en que se materializa en cada aspecto de la interfaz de usuario ha sido una experiencia extraordinaria.",
            author: "Gather",
            position: "UI/UX",
            scale: scale8,
            image: "/review-images/gather-website.png",
            orientation: "landscape-bottom"
        },
        {
            text: "El diseño de la tienda e-commerce que The Refresh Agency creó para nosotros es <strong>diferente a cualquier cosa que hayamos visto en el mercado</strong>. Es hermoso, llamativo e innegablemente atractivo.",
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

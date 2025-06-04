import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const quotes = [
    {
        text: "MADDİ VE MANEVİ İLİM YOLUNDA GAYRET EDENLERE, HER SAHADA İMDAD OLUNUR.",
        author: "M.B.",
    },
    {
        text: "SİZİN BURADA ALDIĞINIZ NOT TEKAMÜLE VERDİĞİNİZ ÖNEM VE HAZRETİMİZE OLAN BAĞLILIĞINIZIN KADRİDİR MİKTARIDIR.",
        author: "M.B.",
    },
    {
        text: "BİZİ İKİ ŞEY MUTLU EDER: İNANMAK VE ÇALIŞMAK.",
        author: "M.B.",
    },
    {
        text: "BU NETİCELER (İMTİHAN NETİCELERİ) İHLAS, SAMİMİYET VE RABITANIN NETİCELERİDİR.",
        author: "M.B.",
    },
    {
        text: "BU İMTİHAN, BİR HİMMET VE TEVECCÜH MÜSABAKASIDIR.",
        author: "A.A.D.",
    },
    {
        text: "BİR İNSAN AKADEMİSYEN OLSA PROFESÖR OLSA BİLGİN OLSA YİNE DE ASLI VE KÖKÜ BU DERSLERDİR.",
        author: "A.A.D.",
    },
];

export default function AutoSlider() {
    const sliderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
    };

    return (
        <div className="slider-container">
            <Slider ref={sliderRef} {...settings}>
                {quotes.map(({ text, author }, index) => (
                    <div key={index} className="slide">
                        <div className="slide-border-effect"></div>
                        <div className="quote-box">
                            <p className="quote-text">“{text}”</p>
                            <p className="quote-author">— {author}</p>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* CSS'i bileşen içinde tanımlıyoruz */}
            <style>
                {`
                .slider-container {
                    max-width: 64rem; /* Tailwind: max-w-4xl */
                    margin-left: auto;
                    margin-right: auto;
                }

                .slide {
                    position: relative;
                    border-radius: 1.5rem; /* Tailwind: rounded-3xl */
                    padding: 2.5rem;
                    height: 450px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background-color: #003c4a;
                    color: #f1821f;
                    overflow: hidden;
                    border: 1px solid transparent;
                    box-shadow: 0 0 0 4px rgba(241, 130, 31, 0.3); /* Tailwind ring */
                }

                .slide-border-effect {
                    position: absolute;
                    inset: 0;
                    border-radius: 1.5rem;
                    border: 4px solid transparent;
                    background: linear-gradient(to right, #f1821f, #ffc400);
                    opacity: 0.1;
                    pointer-events: none;
                }

                .quote-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    max-width: 48rem; /* Tailwind: max-w-3xl */
                    margin-left: auto;
                    margin-right: auto;
                    border: 1px solid rgba(241, 130, 31, 0.5);
                    background-color: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(4px);
                    box-shadow: 0 10px 15px rgba(0,0,0,0.25);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .quote-text {
                    font-size: 2.25rem; /* Tailwind: text-4xl */
                    font-weight: 600;
                    font-style: italic;
                    line-height: 1.625;
                    white-space: pre-line;
                }

                .quote-author {
                    font-size: 1.875rem; /* Tailwind: text-3xl */
                    font-weight: 500;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
                    margin-top: 1rem;
                    align-self: flex-end;
                }
                `}
            </style>
        </div>
    );
}

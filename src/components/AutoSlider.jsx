import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const quotes = [
    {
        text: "MADDİ VE MANEVİ İLİM YOLUNDA GAYRET EDENLERE, HER SAHADA İMDAD OLUNUR.",
        author: "M.B.",
        bgGradient: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
    },
    {
        text: "SİZİN BURADA ALDIĞINIZ NOT TEKAMÜLE VERDİĞİNİZ ÖNEM VE HAZRETİMİZE OLAN BAĞLILIĞINIZIN KADRİDİR MİKTARIDIR.",
        author: "M.B.",
        bgGradient: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
    },
    {
        text: "BİZİ İKİ ŞEY MUTLU EDER: İNANMAK VE ÇALIŞMAK.",
        author: "M.B.",
        bgGradient: "bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500"
    },
    {
        text: "BU NETİCELER (İMTİHAN NETİCELERİ) İHLAS, SAMİMİYET VE RABITANIN NETİCELERİDİR.",
        author: "M.B.",
        bgGradient: "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
    },
    {
        text: "BU İMTİHAN, BİR HİMMET VE TEVECCÜH MÜSABAKASIDIR.",
        author: "A.A.D.",
        bgGradient: "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
    },
    {
        text: "BİR İNSAN AKADEMİSYEN OLSA PROFESÖR OLSA BİLGİN OLSA YİNE DE ASLI VE KÖKÜ BU DERSLERDİR.",
        author: "A.A.D.",
        bgGradient: "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
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
        <div className="max-w-4xl mx-auto">
            <Slider ref={sliderRef} {...settings}>
                {quotes.map(({ text, author }, index) => (
                    <div
                        key={index}
                        className="relative rounded-3xl p-10 h-[450px] flex items-center justify-center text-center
                 bg-[#003c4a] text-[#f1821f] overflow-hidden border border-transparent 
                 ring-4 ring-[#f1821f]/30"
                    >
                        {/* Dış Çerçeve Işık Efekti */}
                        <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-[#f1821f] to-[#ffc400] opacity-10 pointer-events-none"></div>

                        {/* Metni ve yazarı birlikte ortalayacak alan */}
                        <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto border border-[#f1821f]/50 bg-white/5 backdrop-blur-sm drop-shadow-lg rounded-xl p-6">
                            <p className="text-4xl font-semibold italic leading-relaxed whitespace-pre-line ">
                                “{text}”
                            </p>
                            <p className="text-3xl font-medium drop-shadow-md mt-4 self-end">
                                — {author}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>


        </div>
    );
}

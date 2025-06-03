import React, { useEffect } from 'react';

export default function Countdown(props) {
  useEffect(() => {
    // Script zaten yüklü mü kontrol et
    if (!document.querySelector('script[src="https://cdn.logwork.com/widget/countdown.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.logwork.com/widget/countdown.js';
      script.async = true;
      document.body.appendChild(script);

      // İstersen onload ile işlem yapabilirsin
      script.onload = () => {
        // widget refresh veya init işlemi varsa burada yapılabilir
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      <a
        href="https://logwork.com/countdown-xyz"
        className="countdown-timer text-xl font-bold tracking-tight"
        data-language="tr"
        data-style="column"
        data-timezone="Europe/Istanbul"
        data-date={props.date}
        data-background="#234747"
        data-digitscolor="#f1821f"
      >
        <span>TAHRİRİ İMTİHANA SON</span>
      </a>
    </div>
  );
}

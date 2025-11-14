'use client';

import Script from 'next/script';

const TawkTo = () => {
  return (
    <>
      {/* Start of Tawk.to Script */}
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68c879bff929da1929585a38/1j57hn5b4';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
      {/* End of Tawk.to Script */}
    </>
  );
};

export default TawkTo;


import '@/styles/globals.css'
import { Toaster } from "react-hot-toast";
import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/router';

const progress = new ProgressBar({
  size: 2,
  color: '#F27F0C',
  className: 'z-50',
  delay: 20,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Toaster
        position='top-right'
      />  
      <Component {...pageProps} />
    </div>   
  )
}

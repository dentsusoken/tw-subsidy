import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import '@/styles/globals.css';
import ErrorFallback from '@/components/ErrorFallback';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <div>
          <Head>
            <title>Trusted Web Subsidy</title>
            <meta name="description" content="Trusted Web Subsidy" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="pl-2 pt-2">
            <Component {...pageProps} />
          </main>
        </div>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default MyApp;

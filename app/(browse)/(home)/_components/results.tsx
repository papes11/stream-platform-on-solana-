import { getStreams } from '@/lib/feed-service';
import { ResultCard } from './result-card';
import AppWalletProvider from '@/app/wallet/AppWalletProvider';
import Home from '@/app/wallet/Wallb';
import { ToastContainer } from 'react-toastify';

export const Results = async () => {
  const data = await getStreams();

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-4 items-start">
        <h2 className="text-lg mt-5 font-semibold">
          Streams to APEit🥵
        </h2>
        <div className="mt-2 sm:mt-0">
        {/* <ToastContainer/>
          <AppWalletProvider>
            <Home />
          </AppWalletProvider> */}
        </div>
      </div>
      {data.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          No streams found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {data.map((result) => (
            <ResultCard key={result.id} data={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ResultSkeleton = () => {
  return <div></div>;
};

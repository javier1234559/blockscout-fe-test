import React from 'react';

import type { NextPageWithLayout } from 'nextjs/types';

import PageNextJs from 'nextjs/PageNextJs';

import Home from 'ui/pages/Home';
import LayoutHome from 'ui/shared/layout/LayoutHome';

const Page: NextPageWithLayout = () => {
  return (
    <PageNextJs pathname="/">
      <Home/>
      <section>
      <section className="bg-gradient-to-r from-[#a72168] to-[#36087d] pb-[3.5rem] pt-4">
      <div className="container">
        <h1 className="text-center text-5xl font-semibold text-white lg:text-[4rem]">
        Explore STO Blockchain
        </h1>
        <div className="relative mx-auto mt-[2.25rem] flex max-w-[680px]">
          <input
            className="min-h-[43px] flex-1 rounded border border-solid border-[#D8D8D8] bg-transparent px-4 text-sm text-white placeholder:text-[#A0A6B4] focus:outline-none"
            placeholder="Search by Address/ Token symbol/ Name / Transaction hash / Block number"
          />
          <button>Search</button>
        </div>
      </div>
    </section>
      <div className="container flex flex-col gap-5 py-4">
        {/* <div className="grid xl:grid-cols-3 xl:gap-5">
          <Overview dictionary={dictionary} className="xl:col-span-2" />
          <TransactionHistory dictionary={dictionary} />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex-1">
            <LatestBlocks dictionary={dictionary} />
          </div>
          <div className="flex-1">
            <LatestTransactions dictionary={dictionary} />
          </div>
        </div> */}
      </div>
    </section>
    </PageNextJs>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutHome>
      { page }
    </LayoutHome>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';

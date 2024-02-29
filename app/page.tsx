'use client';
import { useRouter } from 'next/navigation';
import scrapeHeaders from './utils/scrapeHeaders';
import { useEffect, useState } from 'react';

export default function Home() {
  const [headers, setHeaders] = useState<string | string[] | null>(null);
  const [inputVal, setInputVal] = useState('');
  const router = useRouter();

  const handleClick = async (e: any) => {
    e.preventDefault();
    const heads = await scrapeHeaders(inputVal);
    setHeaders(heads);
    router.refresh();
  };

  return (
    <div className='container-fluid flex justify-center'>
      <form className='w-6/12 py-12' onSubmit={handleClick}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='username'
                  className='block italic font-medium leading-6 text-gray-900'
                >
                  Search URL
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      type='text'
                      name='url'
                      id='url'
                      autoComplete='url'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='www.bbc.com'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go!
          </button>
        </div>
        <div>
          {Array.isArray(headers) && (
            <ul>
              {headers.map((h) => {
                return <li>{h}</li>;
              })}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

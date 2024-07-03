import Footer from '@/components/Footer';
import IndexNavBar from '@/components/IndexNavBar';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const index = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <IndexNavBar />

      <div className="flex-grow content flex flex-col items-center mt-40">
        <span className="font-bold text-4xl mb-5 text-center">
          Be seamlessly productive.
        </span>

        <Link href="/register" passHref>
          <Button variant="contained" color="primary" style={{ backgroundColor: 'purple', color: 'white' }}>
            Join now!
          </Button>
        </Link>

        <span className="font-bold text-4xl mt-20 mb-5 text-center">
          What is Wave?
        </span>

        <div className="mt-2 max-w-2xl text-center">
            <span className="text-lg mb-5 block">
                Wave is your one-stop solution to studying and tracking deadlines.
            </span>

            {/* <img src="/assets/images/study1.png" alt="studying" className="w-64 h-auto mt-5"/>

            <span className="text-lg mb-5 block">
                With Wave, you can do many things such as set up your courses and even log all
                the tasks needed to be completed for each course. Need help studying? Well the built-in
                pomodoro timer is there for you. Wave is your one-stop spot for academic success!
            </span> */}
        </div>
{/* 
        <span className="font-bold text-4xl mt-20 mb-5 text-center">
          Who is Wave For?
        </span>

        <span className="font-bold text-4xl mt-20 mb-5 text-center">
          Why Wave?
        </span>

        <span className="font-bold text-4xl mt-20 mb-5 text-center">
          How Does it Work?
        </span> */}
      </div>

      <Footer/>
    </div>
  );
}

export default index;

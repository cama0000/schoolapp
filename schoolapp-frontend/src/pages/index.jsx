import Footer from '@/components/Footer';
import IndexNavBar from '@/components/IndexNavBar';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const index = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-purple-50 to-white">
      <IndexNavBar />

      <div className="flex-grow content flex flex-col items-center mt-20">
        <span className="font-bold text-6xl mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
          Be seamlessly productive.
        </span>

        <p className="text-xl text-purple-700 mb-8 max-w-2xl text-center">
          Your all-in-one solution for academic success.
        </p>

        <Link href="/register" passHref>
          <Button 
            variant="contained" 
            className="!px-8 !py-3 !text-lg !rounded-full hover:!scale-105 transition-transform"
            style={{ 
              backgroundColor: '#6B21A8',
              color: 'white',
              boxShadow: '0 4px 14px 0 rgba(107, 33, 168, 0.39)'
            }}
          >
            Get Started
          </Button>
        </Link>

        <div className="mt-32 w-full max-w-6xl px-4">
          <h2 className="font-bold text-5xl mb-12 text-center text-purple-900">
            What is Prism?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">📚</div>
              <h3 className="font-bold text-xl mb-3 text-purple-900">Course Management</h3>
              <p className="text-purple-700">Track courses and take notes.</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">⏰</div>
              <h3 className="font-bold text-xl mb-3 text-purple-900">Pomodoro Timer</h3>
              <p className="text-purple-700">Lock in with the built-in Pomodoro Timer.</p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-4xl mb-4">✅</div>
              <h3 className="font-bold text-xl mb-3 text-purple-900">Task Tracking</h3>
              <p className="text-purple-700">Never miss a deadline.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl px-4 py-24 space-y-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-purple-900 mb-6">Smart Task Management</h2>
              <div className="space-y-4 text-lg text-purple-700">
                <p>• Organize tasks by course, priority, and due date</p>
                <p>• Set recurring tasks for regular assignments</p>
                <p>• Get intelligent reminders before deadlines</p>
                <p>• Track your completion progress</p>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white rounded-2xl shadow-xl">
              <div className="aspect-video bg-purple-100 rounded-lg"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-purple-900 mb-6">Digital Notebook System</h2>
              <div className="space-y-4 text-lg text-purple-700">
                <p>• Create rich-text notes with markdown support</p>
                <p>• Organize notes by courses and topics</p>
                <p>• Add images, diagrams, and attachments</p>
                <p>• Search across all your notes instantly</p>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white rounded-2xl shadow-xl">
              <div className="aspect-video bg-purple-100 rounded-lg"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-purple-900 mb-6">Course Organization</h2>
              <div className="space-y-4 text-lg text-purple-700">
                <p>• Track assignments, readings, and lectures</p>
                <p>• Monitor grades and calculate GPA</p>
                <p>• Set course-specific study goals</p>
                <p>• View weekly schedule at a glance</p>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white rounded-2xl shadow-xl">
              <div className="aspect-video bg-purple-100 rounded-lg"></div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default index;

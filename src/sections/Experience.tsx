import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

interface Job {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills?: string[];
}

export const Experience: React.FC = () => {
  const experiences: Job[] = [
    {
      role: 'Fullstack Developer',
      company: 'Asiades',
      duration: 'November 2025 - Current',
      description: [
        'Created a new website platform for Asiades B2B customer orders (asiades.pro).',
        'Created REST APIs for asiades.pro to support mobile application developments on both Google Play Store and Apple App Store.',
        'Developed a new website platform for Rey7 B2B customer orders.',
        'Designed modern UI/UX layouts for both B2B customer platforms.'
      ],
      skills: ['Laravel', 'MySQL', 'PHP', 'UI/UX']
    },
    {
      role: 'Fullstack Developer Freelance',
      company: "Friend's Bakery (PT Pangan Mekar Jaya)",
      duration: 'January 2025 - February 2025',
      description: [
        'Built a custom web portal using ReactJS for the HR department to record employee performance and manage training schedules.',
        'Developed REST APIs using NodeJS for database operations and manipulation.',
        'Created a mobile application using React Native for employees to view training schedules and track performance metrics.',
        'Designed the UI/UX blueprints and interactive prototypes for both the web and mobile products.',
        'Configured cloud infrastructure on DigitalOcean to deploy the web application, mobile app backend, and PostgreSQL database.'
      ],
      skills: ['React', 'React Native', 'ExpressJS', 'Android', 'PostgreSQL', 'Javascript', 'UI/UX Design']
    },
    {
      role: 'Bachelor of Computer Science',
      company: 'Petra Christian University',
      duration: 'Graduated January 2024',
      description: [
        'Graduated with Cum Laude honors, achieving an overall GPA of 3.73 / 4.00.',
        'Focused on Software Engineering, Database Systems, and Mobile Architectures.'
      ]
    },
    {
      role: 'Software Developer Internship',
      company: 'PT Japfa Comfeed Tbk.',
      duration: 'July 2022 - December 2022',
      description: [
        'Contributed to the Japfa Loyalty application solving core organizational problems for BestMeat consumers and the Japfa IT Sidoarjo team.',
        'Created UI/UX layouts for the loyalty project (mobile app and admin panel website).',
        'Participated in modeling the relational database structure for the loyalty project.',
        'Built frontend systems for both the Mobile Application and the web-based Administrator Panel.',
        'Served as the Intern Frontend Team Leader, delegating tasks and reviewing code quality.',
        'Associated frontend systems with backend services.',
        'Successfully completed 90% of the Admin Panel website and 70% of the mobile application prior to finalization by the Japfa IT Team and Google Play Store deployment.'
      ],
      skills: ['Javascript', 'VueJS', 'PostgreSQL', 'UI/UX Design', 'ExpressJS', 'Ionic']
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">03 // CHRONOLOGY</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="experience-timeline">
          {experiences.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.role}`}
              className="experience-item"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{job.role}</h3>
                  <span className="experience-company">{job.company}</span>
                </div>
                <span className="experience-duration">{job.duration}</span>
              </div>
              <ul className="experience-desc">
                {job.description.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
              
              {job.skills && (
                <div className="experience-skills">
                  {job.skills.map((skill) => (
                    <span key={skill} className="experience-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import { ScrambleTitle } from '../components/ScrambleTitle';
import './Skills.css';

import reactIcon from '../assets/tech/react.svg';
import vueIcon from '../assets/tech/vue.svg';
import laravelIcon from '../assets/tech/laravel.svg';
import nodejsIcon from '../assets/tech/nodejs.svg';
import flutterIcon from '../assets/tech/flutter.svg';
import reactNativeIcon from '../assets/tech/reactnative.svg';
import ionicIcon from '../assets/tech/ionic.svg';
import androidStudioIcon from '../assets/tech/androidstudio.svg';
import mysqlIcon from '../assets/tech/mysql.svg';
import postgresqlIcon from '../assets/tech/postgresql.svg';
import firebaseIcon from '../assets/tech/firebase.svg';
import csharpIcon from '../assets/tech/csharp.svg';
import cplusplusIcon from '../assets/tech/cplusplus.svg';
import javascriptIcon from '../assets/tech/javascript.svg';
import typescriptIcon from '../assets/tech/typescript.svg';
import dartIcon from '../assets/tech/dart.svg';
import kotlinIcon from '../assets/tech/kotlin.svg';
import phpIcon from '../assets/tech/php.svg';

interface Tech {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  techs: Tech[];
}

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Web Development',
      techs: [
        { name: 'React', icon: reactIcon },
        { name: 'Vue', icon: vueIcon },
        { name: 'Laravel', icon: laravelIcon },
        { name: 'NodeJS', icon: nodejsIcon },
      ]
    },
    {
      title: 'Mobile App Dev',
      techs: [
        { name: 'Flutter', icon: flutterIcon },
        { name: 'React Native', icon: reactNativeIcon },
        { name: 'Ionic', icon: ionicIcon },
        { name: 'Android Studio', icon: androidStudioIcon },
      ]
    },
    {
      title: 'Database',
      techs: [
        { name: 'MySQL', icon: mysqlIcon },
        { name: 'PostgreSQL', icon: postgresqlIcon },
        { name: 'Firebase', icon: firebaseIcon },
      ]
    },
    {
      title: 'Programming Language',
      techs: [
        { name: 'C#', icon: csharpIcon },
        { name: 'C++', icon: cplusplusIcon },
        { name: 'JavaScript', icon: javascriptIcon },
        { name: 'TypeScript', icon: typescriptIcon },
        { name: 'Dart', icon: dartIcon },
        { name: 'Kotlin', icon: kotlinIcon },
        { name: 'PHP', icon: phpIcon },
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">02 // COMPETENCIES</span>
          <ScrambleTitle className="section-title">Skills & Tech Stack</ScrambleTitle>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skills-category"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={catIndex}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-logos-grid">
                {category.techs.map((tech) => (
                  <MagneticButton key={tech.name} className="logo-item" strength={0.5}>
                    <img src={tech.icon} alt={`${tech.name} logo`} className="logo-icon" />
                    <span className="logo-name">{tech.name}</span>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import LogoLoop from './LogoLoop';
import theme from './styles/theme';
import { 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiFastapi, 
  SiFlask, 
  SiPandas, 
  SiNumpy, 
  SiScikitlearn, 
  SiHuggingface,
  SiOpencv,
  SiDocker,
  SiGit 
} from 'react-icons/si';

const techLogos = [
    { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
    { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org/" },
    { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org/" },
    { node: <SiHuggingface />, title: "Hugging Face", href: "https://huggingface.co/" },
    { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com/" },
    { node: <SiFlask />, title: "Flask", href: "https://flask.palletsprojects.com/" },
    { node: <SiPandas />, title: "Pandas", href: "https://pandas.pydata.org/" },
    { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org/" },
    { node: <SiScikitlearn />, title: "Scikit-Learn", href: "https://scikit-learn.org/" },
    { node: <SiOpencv />, title: "OpenCV", href: "https://opencv.org/" },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com/" },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
];

export default function Technologies() {
    const { colors, fonts } = theme;

    return (
        <section className="py-20 relative">
            <div className="max-w-6xl mx-auto px-4">
                {/* 1. Added Title matching About.jsx */}
                <h2 
                    className="text-4xl mb-12 text-center animate-fadeInUp"
                    style={{ 
                        fontFamily: fonts.family.heading,
                        fontWeight: fonts.weight.bold,
                        background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}
                >
                    Technologies
                </h2>

                <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
                    <LogoLoop
                        logos={techLogos}
                        speed={100} 
                        direction="left"
                        logoHeight={60} 
                        gap={80}        
                        hoverSpeed={10}  
                        useCustomRender={false}
                    />
                </div>
            </div>
        </section>
    );
}
import React from 'react';
import { Heart, Github, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-2 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-gray-800">
                {/* Year */}
                <span>© {currentYear}</span>

                {/* Made with love */}
                <div className="flex items-center gap-1.5">
                    <span>Made with</span>
                    <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-red-500" />
                    <span>by</span>
                    <a
                        href="https://github.com/ksmelnad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-800 hover:text-gray-600 transition-colors font-medium"
                    >
                        <Github className="w-3 h-3 md:w-4 md:h-4" />
                        ksmelnad
                    </a>
                </div>

                {/* Buy Me a Coffee Button */}
                <a
                    href="https://www.buymeacoffee.com/keshavmelnad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-md bg-[#FFDD00] hover:bg-[#FFED4E] transition-colors border-2 border-black text-xs md:text-sm"
                    style={{ fontFamily: 'Cookie, cursive' }}
                >
                    <Coffee className="w-3 h-3 md:w-4 md:h-4 text-black fill-white" />
                    <span className="text-black font-medium">Buy me a coffee</span>
                </a>
            </div>
        </footer>
    );
};

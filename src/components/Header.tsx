import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-teal-600 py-4 px-4 shadow-md">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                    Indic Transliteration Tool
                </h1>
            </div>
        </header>
    );
};

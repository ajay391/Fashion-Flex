import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({ title, content, isOpen, onToggle }) => {
    return (
        <div className="border-b overflow-hidden mb-0">
            {/* Accordion Header */}
            <button 
                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 transition"
                onClick={onToggle}
            >
                <span className="font-medium text-gray-800">{title}</span>
                <FaChevronDown 
                    className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                />
            </button>

            {/* Accordion Content */}
            {isOpen && (
                <div className="p-4 text-gray-700 transition-all">
                    {typeof content === "string" ? <p>{content}</p> : content}
                </div>
            )}
        </div>
    );
};

export default Accordion;

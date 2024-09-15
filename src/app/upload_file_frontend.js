"use client";

import { useRef, useState } from 'react';

export default function FileUpload() {
    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    // Handle file upload
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            setUploadStatus(`File uploaded successfully: ${result.fileName}`);
        } catch (error) {
            setUploadStatus(`Error: ${error.message}`);
        }
    };

    // Trigger file input click
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <h1>Upload a File</h1>
            <button type="button" onClick={handleButtonClick}>
                Upload your Instagram Data!
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
                accept="*/*"
            />
            <p>{uploadStatus}</p>
        </div>
    );
}
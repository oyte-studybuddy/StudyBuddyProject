"use client"
import React, { useState, useEffect } from 'react';
import logger from 'logging-library';
import FileViewer from 'react-file-viewer';


const file = 'https://study-group-resources.s3.amazonaws.com/PIAIC+Student+Portal.pdf'
const type = 'png'


const FileViewerComponent = () => {
  const [error, setError] = useState(null);
  useEffect(() => {
    // Handle potential errors during initial file loading
    const handleError = (e) => {
      logger.logError(e, 'error in file-viewer');
      setError(e); // Store the error for rendering
    };
    // Fetch and potentially handle file asynchronously (if needed)
    // ... (replace with your file fetching logic)
    return () => {
        // console.log("=====>>>>")
      // Clean up resources (if necessary)
    };
  }, []);

  return (
    <div>
      {error ? (
        <> Test </> // Render custom error component
      ) : (
        <FileViewer fileType={"pdf"} filePath={file} errorComponent={()=><>error</>} />
      )}
    </div>
  );
};

export default FileViewerComponent;
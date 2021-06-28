import React, { useState, Fragment, useEffect } from 'react';
import './ImageUpload.css';


const ImageUpload = ({ onSaveFile }) => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(false)

    const filesSelectedHandler = e => {
        e.preventDefault();
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];

        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result)
                // console.log("reader.result",reader.result)
            }
            reader.readAsDataURL(selected);
            // console.log('selected', selected);

        } else {
            setError(true);
        }
    }

    useEffect(() =>  {
        onSaveFile(file);
        console.log(file);
    }, [file]);

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files[0];
        // console.log(files);
    }
    //img style
    const imgStyle = {
        display: 'block',
        width: '250px',
        objectFit: 'cover',
        borderRadius: '19% 81% 40% 60% / 73% 83% 17% 27%',
    };
    return (
        <div className='ImageUploadComp'>
            <div
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                className='container'>
                {error && <p className='errorMsg'>File not supported</p>}
                <div
                    className='imgPreview'
                    style={{
                        background: file
                            ? `url("${file}") no-repeat center/cover`
                            : "#131313"
                    }}
                >
                    {!file && (
                        <Fragment>
                            <p>Add an Image</p>
                            <label htmlFor='fileUpload' className='customFileUpload'>
                                Choose file
                        </label>
                            <input
                                type="file"
                                id='fileUpload'
                                onChange={filesSelectedHandler}
                            />
                            <span>(jpg,jpeg,png)</span>
                        </Fragment>
                    )}
                </div>
                {file && <button onClick={() => setFile(null)}>Remove image</button>}
            </div>
        </div>
    );
};

export default ImageUpload;


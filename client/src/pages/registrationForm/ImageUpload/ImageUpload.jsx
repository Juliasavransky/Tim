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

    useEffect(() => {
        onSaveFile(file);
        console.log(file);
    }, [file]);



    return (
        <div className='ImageUploadComp'>
            <div

                className='container'>
                {error && <p
                    className='errorMsg'>File not supported</p>}
                <div
                    className='imgPreview'
                    style={{
                        borderRadius: '19% 81% 40% 60% / 73% 83% 17% 27%',
                        background: file
                            ? `url("${file}") no-repeat center/cover`
                            : "var(--green)"
                    }}
                >
                    {!file && (
                        <Fragment>
                            <div className="fileUpload--text">
                                <p>Add an Image</p>
                                <label htmlFor='fileUpload'
                                    className='customFileUpload'>
                                    Choose file
                                </label>
                                <input
                                    type="file"
                                    id='fileUpload'
                                    onChange={filesSelectedHandler}
                                />
                                <span>{" "}(jpg,jpeg,png)</span>
                            </div>
                        </Fragment>
                    )}
                </div>
                {file && <button className='imageUploadComp-button' onClick={() => setFile(null)}>Remove image</button>}
            </div>
        </div>
    );
};

export default ImageUpload;


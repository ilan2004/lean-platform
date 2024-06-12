import React, { useState } from 'react';
import './SuggestionCard.css';

const SuggestionCard = ({ handleSubmit, login = true }) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [attachDisabled, setAttachDisabled] = useState(false);

    const isMessageEmpty = message.trim() === '';
    const isEmailValid = isValidEmail(email);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Validate email and set error message accordingly
        if (!isValidEmail(newEmail)) {
            setEmailError('Invalid email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmission = () => {
        // Check if email is valid before submitting
        if (!login && !isEmailValid) {
            setEmailError('Invalid email');
            return;
        }
        // Proceed with submission
        handleSubmit('Thanks for your valuable suggestion!');
    };

    const handleAttach = (event) => {
        const files = event.target.files;
        if (files.length > 0 && attachedFiles.length < 2) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 50;
                    canvas.height = 50;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const resizedDataUrl = canvas.toDataURL('image/jpeg');
                    setAttachedFiles([...attachedFiles, resizedDataUrl]);
                    if (attachedFiles.length === 1) {
                        setAttachDisabled(true);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = (index) => {
        const updatedFiles = attachedFiles.filter((file, i) => i !== index);
        setAttachedFiles(updatedFiles);
        setAttachDisabled(false);
    };

    return (
        <div className='suggestion-card'>
            <header className='suggestion-card__header'>
                <p>Share your <span>Suggestions</span> with us<br />for a chance to earn rewards!</p>
            </header>
            <div className='suggestion-card__content'>
                <div className='suggestion-card__section'>
                    <label>Choose a section</label>
                    <select>
                        <option value="">Select</option>
                        <option value="option0">Concept Cards</option>
                        <option value="option1">Interview Questions</option>
                        <option value="option2">Practice Questions</option>
                        <option value="option3">Quizzes</option>
                    </select>
                </div>
                <div className="suggestion-card__container">
                <div className="suggestion-detail__container">
                    <p className="suggestion-detail__label">
                Describe the suggestion in detail
                <span className="suggestion-detail__astrix">{astrix()}</span>
            </p>
        </div>
            {/* Text Area */}
            <textarea
                onChange={(e) => setMessage(e.target.value)}
                className={`suggestion-card__textarea ${login ? 'large' : 'small'}`}
                placeholder="Write here..."
                maxLength={1000}
            />
            
            {/* Attach Button */}
            <label className={`suggestion-card__attach-button ${attachDisabled ? 'disabled' : ''}`}>
                <span>{attach()}</span>
                Attach
                <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleAttach} />
            </label>

            {/* Attached Files */}
            <div className="suggestion-card__attached-files">
                {attachedFiles.map((file, index) => (
                    <div key={index} className="suggestion-card__file">
                        <img src={file} alt="Attached File" className="suggestion-card__file-image" />
                        <button onClick={() => removeFile(index)} className="suggestion-card__file-remove">
                            {close()}
                        </button>
                    </div>
                ))}
            </div>
        </div>
                {!login && (
                    <div className='suggestion-card__email'>
                        <label>Enter your email to receive an update</label>
                        <input
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='Enter your Email'
                        />
                        {emailError && <p className="suggestion-card__error">{emailError}</p>}
                    </div>
                )}
                <button
                    onClick={handleSubmission}
                    disabled={isMessageEmpty || (!login && !isEmailValid)}
                    className={`suggestion-card__submit ${isMessageEmpty || (!login && !isEmailValid) ? "disabled" : ""}`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};




export default SuggestionCard;


function astrix() {
    return (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00013 4V12M11.4641 6L4.53613 10M4.53613 6L11.4641 10" stroke="#FD443A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

function attach() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4995 6.7478V17.3278C16.4995 19.4178 14.9695 21.2778 12.8895 21.4778C12.3339 21.5333 11.7727 21.4717 11.2424 21.2968C10.712 21.122 10.2243 20.8379 9.81055 20.4628C9.39684 20.0878 9.0664 19.6301 8.84058 19.1194C8.61475 18.6086 8.49856 18.0562 8.49951 17.4978V5.1378C8.49951 3.8278 9.43951 2.6378 10.7395 2.5078C11.0881 2.47134 11.4406 2.50861 11.7738 2.61718C12.1071 2.72576 12.4139 2.90321 12.6742 3.13802C12.9344 3.37282 13.1424 3.65974 13.2846 3.98014C13.4268 4.30054 13.5 4.64726 13.4995 4.9978V15.4978C13.4995 16.0478 13.0495 16.4978 12.4995 16.4978C11.9495 16.4978 11.4995 16.0478 11.4995 15.4978V6.7478C11.4995 6.3378 11.1595 5.9978 10.7495 5.9978C10.3395 5.9978 9.99951 6.3378 9.99951 6.7478V15.3578C9.99951 16.6678 10.9395 17.8578 12.2395 17.9878C12.5881 18.0243 12.9406 17.987 13.2738 17.8784C13.6071 17.7698 13.9139 17.5924 14.1742 17.3576C14.4344 17.1228 14.6424 16.8359 14.7846 16.5155C14.9268 16.1951 15 15.8483 14.9995 15.4978V5.1678C14.9995 3.0778 13.4695 1.2178 11.3895 1.0178C10.834 0.96307 10.2732 1.02527 9.7432 1.20039C9.2132 1.37551 8.72574 1.65968 8.3122 2.03459C7.89866 2.40951 7.56821 2.86687 7.34213 3.37722C7.11605 3.88757 6.99934 4.43961 6.99951 4.9978V17.2678C6.99951 20.1378 9.09951 22.7078 11.9595 22.9778C15.2495 23.2778 17.9995 20.7178 17.9995 17.4978V6.7478C17.9995 6.3378 17.6595 5.9978 17.2495 5.9978C16.8395 5.9978 16.4995 6.3378 16.4995 6.7478Z" fill="#333333" />
        </svg>

    )
}

function close() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66675 1.66675L8.33341 8.33341M1.66675 8.33341L8.33341 1.66675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

// Function to validate email
const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

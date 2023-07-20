"use client"
import { useState } from "react";
import { storage } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function App() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // generate a unique id for each file
    const id = uuidv4();
    const file = e.target[3]?.files[0]; // Uncomments and add index 3 to access the file input element
    if (!file) return;

    const storageRef = ref(storage, `files/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file, { customMetadata: { id: id } });

    const formData = {
      fileName: id,
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='form'>
        <label>
          Name:
          <input type='text' required />
        </label>
        <label>
          Email:
          <input type='email' required />
        </label>
        <label>
          Password:
          <input type='password' required />
        </label>
        <input type='file' required />
        <button type='submit'>Upload</button>
      </form>
      {!imgUrl && (
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      {imgUrl && <img src={imgUrl} alt='uploaded file' height={200} />}
    </div>
  );
}

export default App;

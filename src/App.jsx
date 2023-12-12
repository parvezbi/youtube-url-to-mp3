import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utiles"

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value)
    console.log(youtubeID);
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {id: youtubeID},
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))
      inputUrlRef.current.value = '';
  }
  return (
    <div className='app'>
      <span className="logo">youtube2mp3</span>
      <section className="content">
        <h1 className="content_title">Youtube to mp3 converter</h1>
        <p className="content_description">Transform Youtube videos into mp3 in just a few clicks</p>
        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder='Paste a youtube video url link...' className='form_input' type="text" />
          <button type='submit' className='form_button'>Submit</button>
        </form>
        {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult} className='download_btn'>Download MP3</a> : ''}
      </section>
    </div>
  )
}

export default App

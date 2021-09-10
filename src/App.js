import { GiphyFetch } from '@giphy/js-fetch-api'
import {useState} from 'react'
import TextList from './components/TextList'
import Error from './components/Error'
import './App.css';

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)

function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSubmit(e);
    }
  }

  const handleSubmit = (e) => {
    if(text.length === 0) {
      
      //set error state to true
      setErr(true)
      return
    }


    const apiCall = async () => {
      setLoading(true)
      const res = await giphy.animate(text, {limit: 20})
      setResults(res.data)
      setLoading(false)
      console.log("response: ",results)
    }
    
    apiCall()
    setText('')
    setErr(false)

  }

  const loadingScreen = () =>{
    let style = {}

    if(loading){
      style = {display:"block"}
    }
    if(!loading){
      style = {display:"none"}
    }
    return style
  }
  
  return (
    <div className="grid grid-cols-4 gap-4 px-4 text-center mb-10 md:max-w-screen-sm md:mx-auto lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl">
      <picture className="-my-10 col-span-4 mx-auto"> 
        <source  media="(min-width: 768px)" srcSet="https://text.media.giphy.com/v1/media/giphy-preview.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJwcm9kLTIwMjAtMDQtMjIiLCJzdHlsZSI6InBhcnR5dGltZSIsInRleHQiOiJBbmltYXRlZCB0ZXh0IGdlbmVyYXRvciIsImlhdCI6MTYzMTE1NDc5Mn0.Lr-I4TXqlui20Psc_qvfGY38Vk3_drSyNeCWMoUWu3I&cid=58b58c32305f3f7998303f9743e3ad7a159c507276fff98b&dynamic_style=partytime&rid=giphy-preview.gif&ct=t" />
        <img src="https://text.media.giphy.com/v1/media/giphy-preview.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJwcm9kLTIwMjAtMDQtMjIiLCJzdHlsZSI6InBhcnR5dGltZSIsInRleHQiOiJBbmltYXRlZCB0ZXh0IGdlbmVyYXRvciIsImlhdCI6MTYzMTE1NDc5Mn0.Lr-I4TXqlui20Psc_qvfGY38Vk3_drSyNeCWMoUWu3I&cid=58b58c32305f3f7998303f9743e3ad7a159c507276fff98b&dynamic_style=partytime&rid=giphy-preview.webp&ct=t" alt="animated text generator" />
      </picture>
      <h3 className="mb-3 col-span-4">Type text into the form and hit submit or press return</h3>
      <input placeholder="type text to animate" type="text" className="border-2 border-gray-300 col-span-3" value={text} onChange={handleInput} onKeyDown={handleKeyDown} />
      <button className="border-2 border-gray-300 rounded hover:border-gray-500 col-span-1" onClick={handleSubmit}>Submit</button>
      <Error isError={err} className="col-span-4" text="need length longer than 0 for input"/>
      <div className="col-span-4 mx-auto" style={loadingScreen()} >
        <img src="./loading.gif" alt="loading image" />
      </div>
      {results && <TextList gifs={results} />}
      <div className="col-span-4 sticky bottom-0 bg-white py-3 bg-red-100">
        <h3>Made with ❤ by Bily</h3>
      </div>
    </div>
  );
}
export default App;
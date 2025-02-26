// css
import './App.css'

// components
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import Map from './components/map/Map'



function App() {
 

  return (
   <div className='app-container'>
      <Header/>
      <Map/>
      <Content/>
      <Footer/>
   </div>
  )
}

export default App

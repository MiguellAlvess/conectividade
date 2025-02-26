import './Header.css'

const Header = () => {
  const scrollToContato = () => {
    const contatoSection = document.getElementById('contato');
    contatoSection.scrollIntoView({ behavior: 'smooth' });
  }
  const scrollToSobre = () => {
    const contatoSection = document.getElementById('content');
    contatoSection.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className='header'>

        <div id='bar'>
          
        </div>
        <nav id='navbar'>
          <h2>PROJETO CONECTIVIDADE</h2>

          <ul>
            <li onClick={scrollToSobre}>SOBRE</li>
            <li onClick={scrollToContato}>CONTATO</li>
          </ul>
        </nav>
    </div>
  )
}

export default Header

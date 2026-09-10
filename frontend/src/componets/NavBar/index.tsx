import Img from './EMPREGOS (2).png';
const NavBar = () => {
    return (
        < div  className = "d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm" >
            < div  className = "container nav justify-content-center " >
        <nav id="menu">
         
                    <ul className =' '>
                    <img  src={Img} alt="Projeto Final" width="100" />

                        <li><a href="/">Home</a></li>
                        <li><a href="/Formulario">Formulário </a></li>
                        
                    </ul>


                
                    </nav>


            </div>
        </div>
       
    );
}

export default NavBar;

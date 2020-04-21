import React ,{ useState , useEffect }from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repositories , setRepositories ] = useState([]);
  
  useEffect(()=>{
    api.get("/repositories").then(response => {
      if(response.data.lenght > 0){
        setRepositories([...repositories,response.data])
      }
     
    });
    
  },[]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("/repositories",{
      title:`Repositorio ${Date.now()}`,
      url:" link 1",
      techs:["react native","node","react js"]
    });
    
    setRepositories([...repositories,response.data]);

  }

  async function handleRemoveRepository(id) {
    let response = await api.delete(`/repositories/${id}`);
    console.log(response);
    const newRepositories = repositories.filter( repository => repository.id !== id );
    setRepositories(newRepositories);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository,key) => (
          <li key={key}>
           {repository.title}  

            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

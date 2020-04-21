import React ,{ useState , useEffect }from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  
  const [repositories , setRepositories ] = useState([]);
  
  useEffect(()=>{
    api.get("/repositories").then(response => {
      if(response.data.length > 0){
        setRepositories(response.data)
      }
    });
  },[]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("/repositories",{
      title:`Repositorio ${Date.now()}`,
      url:"https://github.com/kadusouzaribeiro/testaccessibilityhelper",
      techs:["react native","node","react js"]
    });
    
    setRepositories([...repositories,response.data]);

  }

  async function handleRemoveRepository(id) {
    
    const response =  await api.delete(`/repositories/${id}`);
    if (response.status == "204") {
      setRepositories(repositories.filter( repo => repo.id !== id ))
    }else{
      alert('Erro ao excluir repositório');
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

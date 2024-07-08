import axios from "axios";
import api from "./Api"

export default function Remedio() {
    useEffect(() => {
        api
          .get("/users/romulo27")
          .then((response) => setUser(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);


      async function consulta() {
        try {
          const response = await axios.get('https://api.example.com/data');
          const data = response.data;
          console.log(data); // Exibe os dados no console
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      }
}
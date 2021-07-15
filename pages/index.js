import { useEffect, useState } from "react";
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import DisplayCard from "../src/components/DisplayCard";
import ProfileSidebar from "../src/components/ProfileSidebar";

const ICONS_SETUP = {
  recados: 5,
  fotos: 12,
  videos: 2,
  fas: 10,
  mensagens: 20,
  confiavel: 3,
  legal: 3,
  sexy: 2
};

const PESSOAS_FAVORITAS = [
  {title: 'juunegreiros', id: 'juunegreiros', image: 'https://github.com/juunegreiros.png' },
  {title: 'omariosouto', id: 'omariosouto', image: 'https://github.com/omariosouto.png' },
  {title: 'peas', id: 'peas', image: 'https://github.com/peas.png' },
  {title: 'rafaballerini', id: 'rafaballerini', image: 'https://github.com/rafaballerini.png' },
  {title: 'marcobrunodev', id: 'marcobrunodev', image: 'https://github.com/marcobrunodev.png' },
  {title: 'felipefialho', id: 'felipefialho', image: 'https://github.com/felipefialho.png' }
];

export default function Home() {
  const githubUser = 'JoMaAlves';
  const [followers, setFollowers] = useState([])
  const [communities, setCommunities] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  useEffect(() => {
    fetch("https://api.github.com/users/JoMaAlves/followers")
      .then((response) => {
        if(response.ok) {
          return response.json();
        }

        throw new Error('Aconteceu algum problema: ' + response.status)
      })
      .then((data) => {
        setFollowers(data.map( item => { 
          return {
            id: item.id,
            title: item.login,
            image: `https://github.com/${item.login}.png`
          };
        }))
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCreateComunity = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    setCommunities([
      ...communities,
      {
        id: new Date().toISOString(),
        title: formData.get('title'),
        image: formData.get('image'),
      }
    ]);
  }
  
  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet {...ICONS_SETUP}/>
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleCreateComunity} >
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <DisplayCard title="Pessoas da Comunidade" displayItems={PESSOAS_FAVORITAS}/>
          
          <DisplayCard title="Meus Seguidores" displayItems={followers}/>
          
          <DisplayCard title="Minhas comunidades" displayItems={communities}/>
        </div>
      </MainGrid>
    </>
  );
}

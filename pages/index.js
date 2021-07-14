import { useEffect, useState } from "react";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import DisplayCard from "../src/components/DisplayCard";
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

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

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img 
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr/>
      
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'JoMaAlves';
  const [followers, setFollowers] = useState([])
  const [communities, setCommunities] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  useEffect(() => {
    fetch("https://api.github.com/users/JoMaAlves/following")
      .then((response) => response.json())
      .then((data) => {
        data.map((item) => 
          setFollowers((prevItems) => [
            ...prevItems,
            {
              title: item.login,
              image: `https://github.com/${item.login}.png`,
              id: item.id
            },
          ])
        );
      });
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
          <DisplayCard title="Meus amigos" displayItems={followers}/>
          
          <DisplayCard title="Minhas comunidades" displayItems={communities}/>
        </div>
      </MainGrid>
    </>
  );
}

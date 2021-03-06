import React, { useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
  const [githubUser, setGithubUser] = useState('');
  const router = useRouter();

  const handleTyping = (event) => {
    setGithubUser(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({githubUser: githubUser})
    })
    .then(async (response) => {
      const responseData = await response.json()

      nookies.set(null, 'USER_TOKEN', responseData.token, {
        path: '/',
        maxAge: 86400 * 7
      })
      
      router.push('/')
    })
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={handleTyping}
            />
            <button
              type="submit"
              disabled={
                githubUser.length === 0 ? true : false
              }
            >
              { githubUser.length === 0 ? "Preencha o campo" : "Login" }
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="https://github.com/signup">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 
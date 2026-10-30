import { useState } from 'react'
import './App.css'

const alunosExemplo = [
  { id: '001', nome: 'Ana Silva', turma: 'Maternal II', status: 'Na escola' },
  { id: '002', nome: 'Pedro Santos', turma: 'Jardim I', status: 'Na escola' },
  { id: '003', nome: 'Mariana Costa', turma: 'Maternal I', status: 'Saiu' },
  { id: '004', nome: 'Lucas Oliveira', turma: 'Jardim II', status: 'Na escola' },
]

function App() {
  const [pesquisa, setPesquisa] = useState('')
  const [pagina, setPagina] = useState('Painel')
  const [mostrarLeitor, setMostrarLeitor] = useState(false)

  const alunosFiltrados = alunosExemplo.filter((aluno) =>
    `${aluno.nome} ${aluno.turma} ${aluno.id}`
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  )

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="marca">
          <div className="marca-icone">S</div>
          <div>
            <h1>SAIDA</h1>
            <span>by DeskTech</span>
          </div>
        </div>

        <p className="menu-titulo">MENU PRINCIPAL</p>

        {[
          ['Painel', '▦'],
          ['Alunos', '♙'],
          ['Registrar saída', '◷'],
          ['Histórico', '▤'],
          ['Relatórios', '▥'],
        ].map(([nome, icone]) => (
          <button
            key={nome}
            className={`menu-item ${pagina === nome ? 'ativo' : ''}`}
            onClick={() => {
              setPagina(nome)
              if (nome === 'Registrar saída') setMostrarLeitor(true)
            }}
          >
            <span className="menu-icone">{icone}</span>
            {nome}
          </button>
        ))}

        <div className="sidebar-rodape">
          <div className="status-ponto" />
          <div>
            <strong>SAIDA</strong>
            <span>Versão inicial 0.1</span>
          </div>
        </div>
      </aside>

      <main className="conteudo">
        <header className="topo">
          <div>
            <span className="sobretitulo">GESTÃO ESCOLAR</span>
            <h2>{pagina}</h2>
          </div>
          <div className="usuario">
            <div className="avatar">DT</div>
            <div className="usuario-texto">
              <strong>Administrador</strong>
              <span>DeskTech</span>
            </div>
          </div>
        </header>

        {pagina === 'Painel' && (
          <>
            <section className="boas-vindas">
              <div>
                <span className="etiqueta">CONTROLE DE SAÍDA ESCOLAR</span>
                <h3>Bem-vindo ao SAIDA!</h3>
                <p>
                  Acompanhe as saídas e mantenha os registros da escola
                  organizados em um só lugar.
                </p>
              </div>
              <div className="boas-vindas-icone">⌂</div>
            </section>

            <section className="indicadores">
              <article className="indicador">
                <div className="indicador-topo">
                  <span>Total de alunos</span>
                  <span className="indicador-icone azul">♙</span>
                </div>
                <strong>04</strong>
                <small>Alunos de demonstração</small>
              </article>

              <article className="indicador">
                <div className="indicador-topo">
                  <span>Na escola</span>
                  <span className="indicador-icone verde">✓</span>
                </div>
                <strong>03</strong>
                <small>Ainda não registraram saída</small>
              </article>

              <article className="indicador">
                <div className="indicador-topo">
                  <span>Saídas registradas</span>
                  <span className="indicador-icone laranja">◷</span>
                </div>
                <strong>01</strong>
                <small>Exemplo demonstrativo</small>
              </article>
            </section>

            <section className="acao-rapida">
              <div className="acao-texto">
                <div className="qr-icone">▦</div>
                <div>
                  <h3>Registrar saída de aluno</h3>
                  <p>
                    Leia o QR Code do cartão e confira a autorização
                    antes de confirmar a retirada.
                  </p>
                </div>
              </div>
              <button
                className="botao-principal"
                onClick={() => setMostrarLeitor(true)}
              >
                <span>▦</span> Iniciar leitura de QR Code
              </button>
            </section>

            <section className="secao-alunos">
              <div className="secao-cabecalho">
                <div>
                  <h3>Alunos</h3>
                  <p>Consulte os cadastros de demonstração.</p>
                </div>
                <label className="campo-pesquisa">
                  <span>⌕</span>
                  <input
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Pesquisar aluno..."
                  />
                </label>
              </div>

              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nº SÉRIE</th>
                      <th>NOME DO ALUNO</th>
                      <th>TURMA</th>
                      <th>SITUAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosFiltrados.map((aluno) => (
                      <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td className="nome-aluno">{aluno.nome}</td>
                        <td>{aluno.turma}</td>
                        <td>
                          <span
                            className={`status ${
                              aluno.status === 'Saiu' ? 'saiu' : 'na-escola'
                            }`}
                          >
                            {aluno.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {alunosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={4} className="sem-resultados">
                          Nenhum aluno encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <footer>
              SAIDA by DeskTech · Protótipo em desenvolvimento
            </footer>
          </>
        )}

        {pagina !== 'Painel' && (
          <section className="pagina-placeholder">
            <div className="placeholder-icone">▦</div>
            <h3>{pagina}</h3>
            <p>
              Esta área será desenvolvida na próxima etapa do SAIDA.
            </p>
            <button
              className="botao-secundario"
              onClick={() => setPagina('Painel')}
            >
              Voltar ao painel
            </button>
          </section>
        )}
      </main>

      {mostrarLeitor && (
        <div className="modal-fundo" onClick={() => setMostrarLeitor(false)}>
          <section
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fechar-modal"
              onClick={() => setMostrarLeitor(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <div className="modal-icone">▦</div>
            <h3>Leitura de QR Code</h3>
            <p>
              A tela de leitura será conectada à câmera do tablet na próxima
              etapa. Ainda não é possível ler cartões nesta versão.
            </p>
            <button
              className="botao-principal modal-botao"
              onClick={() => setMostrarLeitor(false)}
            >
              Entendi
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

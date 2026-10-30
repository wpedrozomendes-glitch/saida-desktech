import { useState } from 'react'
import './App.css'

type Aluno = {
  id: string
  nome: string
  turma: string
  status: string
}

type Turma = {
  id: number
  nome: string
  turno: string
}

function App() {
  const [pesquisa, setPesquisa] = useState('')
  const [pagina, setPagina] = useState('Painel')
  const [mostrarLeitor, setMostrarLeitor] = useState(false)
  const [turmas, setTurmas] = useState<Turma[]>([
    { id: 1, nome: 'Maternal I', turno: 'Matutino' },
    { id: 2, nome: 'Maternal II', turno: 'Vespertino' },
    { id: 3, nome: 'Jardim I', turno: 'Matutino' },
    { id: 4, nome: 'Jardim II', turno: 'Vespertino' },
    { id: 5, nome: '1º Ano D', turno: 'Matutino' },
  ])
  const [nomeTurma, setNomeTurma] = useState('')
  const [turnoTurma, setTurnoTurma] = useState('Matutino')
  const [mensagemTurma, setMensagemTurma] = useState('')
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [nomeAluno, setNomeAluno] = useState('')
  const [matriculaAluno, setMatriculaAluno] = useState('')
  const [turmaAluno, setTurmaAluno] = useState('')
  const [mensagemAluno, setMensagemAluno] = useState('')
  const [pesquisaAluno, setPesquisaAluno] = useState('')

const alunosFiltrados = alunos.filter((aluno) =>
  `${aluno.nome} ${aluno.id} ${aluno.turma}`
    .toLowerCase()
    .includes(pesquisaAluno.toLowerCase())
)


  function cadastrarTurma(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nome = nomeTurma.trim()

    if (!nome) {
      setMensagemTurma('Informe o nome da turma.')
      return
    }

    if (turmas.some((turma) => turma.nome.toLowerCase() === nome.toLowerCase())) {
      setMensagemTurma('Já existe uma turma com esse nome.')
      return
    }

    setTurmas((atuais) => [
      ...atuais,
      { id: Date.now(), nome, turno: turnoTurma },
    ])
    setNomeTurma('')
    setTurnoTurma('Matutino')
    setMensagemTurma('Turma cadastrada com sucesso!')
  }

  function excluirTurma(id: number) {
    const turma = turmas.find((item) => item.id === id)
    if (!turma) return

    const confirmar = window.confirm(`Deseja excluir a turma "${turma.nome}"?`)
    if (!confirmar) return

    setTurmas((atuais) => atuais.filter((item) => item.id !== id))
    setMensagemTurma('Turma excluída desta sessão.')
  }

  function cadastrarAluno(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  const nome = nomeAluno.trim()
  const matricula = matriculaAluno.trim()
  const turmaExiste = turmas.some(
    (turma) => turma.nome === turmaAluno
  )

  if (!nome || !matricula || !turmaAluno) {
    setMensagemAluno('Preencha todos os campos.')
    return
  }

  if (!turmaExiste) {
    setMensagemAluno('Selecione uma turma cadastrada.')
    return
  }

  if (
    alunos.some(
      (aluno) =>
        aluno.id.toLowerCase() === matricula.toLowerCase()
    )
  ) {
    setMensagemAluno('Esta matrícula já está cadastrada.')
    return
  }

  setAlunos((atuais) => [
    ...atuais,
    {
      id: matricula,
      nome,
      turma: turmaAluno,
      status: 'Na escola',
    },
  ])

  setNomeAluno('')
  setMatriculaAluno('')
  setTurmaAluno('')
  setMensagemAluno('Aluno cadastrado com sucesso!')
}

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
          ['Turmas', '▧'],
          ['Alunos', '♙'],
          ['Responsáveis', '♧'],
          ['Registrar saída', '◷'],
          ['Histórico', '▤'],
          ['Relatórios', '▥'],
        ].map(([nome, icone]) => (
          <button
            key={nome}
            className={`menu-item ${pagina === nome ? 'ativo' : ''}`}
            onClick={() => {
              setPagina(nome)
              setMensagemTurma('')
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
            <span>Versão inicial 0.2</span>
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

        
{pagina === 'Alunos' && (
  <>
    <section className="secao-alunos">
      <div className="secao-cabecalho">
        <div>
          <h3>Cadastro de alunos</h3>
          <p>Cadastre os alunos e vincule cada um a uma turma.</p>
        </div>
        <span className="status na-escola">
          {alunos.length} {alunos.length === 1 ? 'aluno' : 'alunos'}
        </span>
      </div>

      <form onSubmit={cadastrarAluno} className="form-turma">
        <label>
          Nome completo *
          <input
            value={nomeAluno}
            onChange={(e) => setNomeAluno(e.target.value)}
            placeholder="Nome do aluno"
            maxLength={120}
            required
          />
        </label>

        <label>
          Número de matrícula *
          <input
            value={matriculaAluno}
            onChange={(e) => setMatriculaAluno(e.target.value)}
            placeholder="Ex.: 0001"
            maxLength={30}
            required
          />
        </label>

        <label>
          Turma *
          <select
            value={turmaAluno}
            onChange={(e) => setTurmaAluno(e.target.value)}
            required
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.nome}>
                {turma.nome} — {turma.turno}
              </option>
            ))}
          </select>
        </label>

        <button
          className="botao-principal"
          type="submit"
          disabled={turmas.length === 0}
        >
          + Cadastrar aluno
        </button>
      </form>

      {turmas.length === 0 && (
        <p className="mensagem-turma">
          Cadastre uma turma antes de adicionar alunos.
        </p>
      )}

      {mensagemAluno && (
        <p className="mensagem-turma" role="status">
          {mensagemAluno}
        </p>
      )}

      <div className="secao-cabecalho">
        <div>
          <h3>Alunos cadastrados</h3>
          <p>Consulte os registros desta sessão.</p>
        </div>
        <label className="campo-pesquisa">
          <span>⌕</span>
          <input
            value={pesquisaAluno}
            onChange={(e) => setPesquisaAluno(e.target.value)}
            placeholder="Pesquisar aluno..."
          />
        </label>
      </div>

      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>MATRÍCULA</th>
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
                  <span className="status na-escola">
                    {aluno.status}
                  </span>
                </td>
              </tr>
            ))}

            {alunosFiltrados.length === 0 && (
              <tr>
                <td colSpan={4} className="sem-resultados">
                  {alunos.length === 0
                    ? 'Nenhum aluno cadastrado. Utilize o formulário acima.'
                    : 'Nenhum aluno encontrado.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>

    <footer>SAIDA by DeskTech · Cadastro de alunos em teste</footer>
  </>
)}


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
            <footer>SAIDA by DeskTech · Protótipo em desenvolvimento</footer>
          </>
        )}

        {pagina === 'Turmas' && (
          <>
            <section className="secao-alunos">
              <div className="secao-cabecalho">
                <div>
                  <h3>Cadastro de turmas</h3>
                  <p>Crie e organize as turmas da escola.</p>
                </div>
                <span className="status na-escola">
                  {turmas.length} {turmas.length === 1 ? 'turma' : 'turmas'}
                </span>
              </div>

              <form onSubmit={cadastrarTurma} className="form-turma">
                <label>
                  Nome da turma *
                  <input
                    value={nomeTurma}
                    onChange={(e) => setNomeTurma(e.target.value)}
                    placeholder="Ex.: 1º Ano D"
                    maxLength={60}
                    required
                  />
                </label>

                <label>
                  Turno
                  <select
                    value={turnoTurma}
                    onChange={(e) => setTurnoTurma(e.target.value)}
                  >
                    <option>Matutino</option>
                    <option>Vespertino</option>
                    <option>Integral</option>
                    <option>Noturno</option>
                  </select>
                </label>

                <button className="botao-principal" type="submit">
                  + Cadastrar turma
                </button>
              </form>

              {mensagemTurma && (
                <p className="mensagem-turma" role="status">
                  {mensagemTurma}
                </p>
              )}

              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>NOME DA TURMA</th>
                      <th>TURNO</th>
                      <th>AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turmas.map((turma) => (
                      <tr key={turma.id}>
                        <td className="nome-aluno">{turma.nome}</td>
                        <td>{turma.turno}</td>
                        <td>
                          <button
                            className="botao-excluir"
                            type="button"
                            onClick={() => excluirTurma(turma.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                    {turmas.length === 0 && (
                      <tr>
                        <td colSpan={3} className="sem-resultados">
                          Nenhuma turma cadastrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
            <footer>SAIDA by DeskTech · Cadastro de turmas em teste</footer>
          </>
        )}

        {pagina !== 'Painel' &&
  pagina !== 'Turmas' &&
  pagina !== 'Alunos' && (
          <section className="pagina-placeholder">
            <div className="placeholder-icone">▦</div>
            <h3>{pagina}</h3>
            <p>Esta área será desenvolvida na próxima etapa do SAIDA.</p>
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
          <section className="modal" onClick={(e) => e.stopPropagation()}>
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
              A leitura será conectada à câmera do tablet em uma próxima etapa.
              Ainda não é possível ler cartões nesta versão.
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
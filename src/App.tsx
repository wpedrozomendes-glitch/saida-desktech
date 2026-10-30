
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

type Responsavel = {
  id: number
  nome: string
  telefone: string
  alunoId: string
}

type PessoaAutorizada = {
  id: number
  nome: string
  telefone: string
  parentesco: string
  alunoId: string
  tipoAutorizacao: string
  situacao: string
}

type Autorizacao = {
  id: number
  alunoId: string
  nomePessoa: string
  telefone: string
  parentesco: string
  modalidade: 'Unica' | 'Temporaria'
  responsavelConfirmou: string
  funcionarioRegistro: string
  dataRegistro: string
  inicioValidade: string
  fimValidade: string
  situacao: 'Pendente' | 'Autorizada' | 'Revogada' | 'Utilizada'
}

function App() {
  const [pesquisa, setPesquisa] = useState('')
  const [pagina, setPagina] = useState('Painel')
  const [mostrarLeitor, setMostrarLeitor] = useState(false)

  // Turmas
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

  // Alunos
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

  // Responsáveis
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([])
  const [nomeResponsavel, setNomeResponsavel] = useState('')
  const [telefoneResponsavel, setTelefoneResponsavel] = useState('')
  const [alunoResponsavel, setAlunoResponsavel] = useState('')
  const [mensagemResponsavel, setMensagemResponsavel] = useState('')

  // Pessoas autorizadas
  const [pessoasAutorizadas, setPessoasAutorizadas] = useState<PessoaAutorizada[]>([])
  const [nomePessoaAutorizada, setNomePessoaAutorizada] = useState('')
  const [telefonePessoaAutorizada, setTelefonePessoaAutorizada] = useState('')
  const [parentescoPessoaAutorizada, setParentescoPessoaAutorizada] = useState('')
  const [alunoPessoaAutorizada, setAlunoPessoaAutorizada] = useState('')
  const [tipoAutorizacao, setTipoAutorizacao] = useState('Permanente')
  const [mensagemPessoaAutorizada, setMensagemPessoaAutorizada] = useState('')

  // Autorizações excepcionais
  const [autorizacoes, setAutorizacoes] = useState<Autorizacao[]>([])
  const [mensagemAutorizacao, setMensagemAutorizacao] = useState('')

  const [alunoAutorizacao, setAlunoAutorizacao] = useState('')
  const [nomePessoaAutorizacao, setNomePessoaAutorizacao] = useState('')
  const [telefoneAutorizacao, setTelefoneAutorizacao] = useState('')
  const [parentescoAutorizacao, setParentescoAutorizacao] = useState('')
  const [modalidadeAutorizacao, setModalidadeAutorizacao] =
    useState<'Unica' | 'Temporaria'>('Unica')
  const [responsavelConfirmou, setResponsavelConfirmou] = useState('')
  const [funcionarioRegistro, setFuncionarioRegistro] = useState('')
  const [inicioValidade, setInicioValidade] = useState('')
  const [fimValidade, setFimValidade] = useState('')

  // Cadastro de turma
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

    const confirmar = window.confirm(
      `Deseja excluir a turma "${turma.nome}"?`
    )

    if (!confirmar) return

    setTurmas((atuais) => atuais.filter((item) => item.id !== id))
    setMensagemTurma('Turma excluída desta sessão.')
  }

  // Cadastro de aluno
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
        (aluno) => aluno.id.toLowerCase() === matricula.toLowerCase()
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

  // Cadastro de responsável
  function cadastrarResponsavel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nome = nomeResponsavel.trim()
    const telefone = telefoneResponsavel.trim()

    const alunoExiste = alunos.some(
      (aluno) => aluno.id === alunoResponsavel
    )

    if (!nome || !telefone || !alunoResponsavel) {
      setMensagemResponsavel('Preencha todos os campos.')
      return
    }

    if (!alunoExiste) {
      setMensagemResponsavel('Selecione um aluno cadastrado.')
      return
    }

    setResponsaveis((atuais) => [
      ...atuais,
      {
        id: Date.now(),
        nome,
        telefone,
        alunoId: alunoResponsavel,
      },
    ])

    setNomeResponsavel('')
    setTelefoneResponsavel('')
    setAlunoResponsavel('')
    setMensagemResponsavel('Responsável cadastrado com sucesso!')
  }

  // Cadastro de pessoa autorizada
  function cadastrarPessoaAutorizada(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const nome = nomePessoaAutorizada.trim()
    const telefone = telefonePessoaAutorizada.trim()
    const parentesco = parentescoPessoaAutorizada.trim()

    const alunoExiste = alunos.some(
      (aluno) => aluno.id === alunoPessoaAutorizada
    )

    if (!nome || !telefone || !parentesco || !alunoPessoaAutorizada) {
      setMensagemPessoaAutorizada('Preencha todos os campos.')
      return
    }

    if (!alunoExiste) {
      setMensagemPessoaAutorizada('Selecione um aluno cadastrado.')
      return
    }

    setPessoasAutorizadas((atuais) => [
      ...atuais,
      {
        id: Date.now(),
        nome,
        telefone,
        parentesco,
        alunoId: alunoPessoaAutorizada,
        tipoAutorizacao,
        situacao: 'Aguardando validação',
      },
    ])

    setNomePessoaAutorizada('')
    setTelefonePessoaAutorizada('')
    setParentescoPessoaAutorizada('')
    setAlunoPessoaAutorizada('')
    setTipoAutorizacao('Permanente')

    setMensagemPessoaAutorizada(
      'Cadastro realizado. Aguardando validação da escola.'
    )
  }

  // Cadastro de autorização excepcional
  function cadastrarAutorizacao() {
    if (
      !alunoAutorizacao ||
      !nomePessoaAutorizacao.trim() ||
      !telefoneAutorizacao.trim() ||
      !responsavelConfirmou.trim() ||
      !funcionarioRegistro.trim()
    ) {
      setMensagemAutorizacao('Preencha todos os campos obrigatórios.')
      return
    }

    if (
      modalidadeAutorizacao === 'Temporaria' &&
      (!inicioValidade ||
        !fimValidade ||
        fimValidade < inicioValidade)
    ) {
      setMensagemAutorizacao('Informe um período de validade correto.')
      return
    }

    const novaAutorizacao: Autorizacao = {
      id: Date.now(),
      alunoId: alunoAutorizacao,
      nomePessoa: nomePessoaAutorizacao.trim(),
      telefone: telefoneAutorizacao.trim(),
      parentesco: parentescoAutorizacao.trim(),
      modalidade: modalidadeAutorizacao,
      responsavelConfirmou: responsavelConfirmou.trim(),
      funcionarioRegistro: funcionarioRegistro.trim(),
      dataRegistro: new Date().toISOString(),
      inicioValidade:
        modalidadeAutorizacao === 'Unica' ? '' : inicioValidade,
      fimValidade:
        modalidadeAutorizacao === 'Unica' ? '' : fimValidade,
      situacao: 'Pendente',
    }

    setAutorizacoes((atuais) => [...atuais, novaAutorizacao])

    setMensagemAutorizacao(
      'Autorização cadastrada e aguardando validação da escola.'
    )

    setAlunoAutorizacao('')
    setNomePessoaAutorizacao('')
    setTelefoneAutorizacao('')
    setParentescoAutorizacao('')
    setModalidadeAutorizacao('Unica')
    setResponsavelConfirmou('')
    setFuncionarioRegistro('')
    setInicioValidade('')
    setFimValidade('')
  }

  const paginasImplementadas = [
    'Painel',
    'Turmas',
    'Alunos',
    'Responsáveis',
    'Pessoas autorizadas',
    'Autorizações excepcionais',
  ]

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
          ['Pessoas autorizadas', '♙'],
          ['Autorizações excepcionais', '♧'],
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

        {/* PAINEL */}
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
                <strong>{alunos.length}</strong>
                <small>Alunos cadastrados</small>
              </article>

              <article className="indicador">
                <div className="indicador-topo">
                  <span>Na escola</span>
                  <span className="indicador-icone verde">✓</span>
                </div>
                <strong>
                  {alunos.filter((aluno) => aluno.status === 'Na escola').length}
                </strong>
                <small>Aguardando registro de saída</small>
              </article>

              <article className="indicador">
                <div className="indicador-topo">
                  <span>Saídas registradas</span>
                  <span className="indicador-icone laranja">◷</span>
                </div>
                <strong>
                  {alunos.filter((aluno) => aluno.status === 'Saiu').length}
                </strong>
                <small>Registros nesta sessão</small>
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
                  <p>Consulte os alunos cadastrados.</p>
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
                    {alunos
                      .filter((aluno) =>
                        `${aluno.nome} ${aluno.id} ${aluno.turma}`
                          .toLowerCase()
                          .includes(pesquisa.toLowerCase())
                      )
                      .map((aluno) => (
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

                    {alunos.length === 0 && (
                      <tr>
                        <td colSpan={4} className="sem-resultados">
                          Nenhum aluno cadastrado.
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

        {/* TURMAS */}
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

        {/* ALUNOS */}
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

        {/* RESPONSÁVEIS */}
        {pagina === 'Responsáveis' && (
          <>
            <section className="secao-alunos">
              <div className="secao-cabecalho">
                <div>
                  <h3>Cadastro de responsáveis</h3>
                  <p>
                    Cadastre os responsáveis e vincule cada pessoa a um aluno.
                  </p>
                </div>

                <span className="status na-escola">
                  {responsaveis.length}{' '}
                  {responsaveis.length === 1 ? 'responsável' : 'responsáveis'}
                </span>
              </div>

              {alunos.length === 0 && (
                <p className="mensagem-turma">
                  Cadastre um aluno antes de adicionar responsáveis.
                </p>
              )}

              <form onSubmit={cadastrarResponsavel} className="form-turma">
                <label>
                  Nome completo *
                  <input
                    value={nomeResponsavel}
                    onChange={(e) => setNomeResponsavel(e.target.value)}
                    placeholder="Nome do responsável"
                    maxLength={120}
                    required
                  />
                </label>

                <label>
                  Telefone *
                  <input
                    type="tel"
                    value={telefoneResponsavel}
                    onChange={(e) => setTelefoneResponsavel(e.target.value)}
                    placeholder="(67) 99999-9999"
                    maxLength={20}
                    required
                  />
                </label>

                <label>
                  Aluno vinculado *
                  <select
                    value={alunoResponsavel}
                    onChange={(e) => setAlunoResponsavel(e.target.value)}
                    required
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} — {aluno.turma}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="botao-principal"
                  type="submit"
                  disabled={alunos.length === 0}
                >
                  + Cadastrar responsável
                </button>
              </form>

              {mensagemResponsavel && (
                <p className="mensagem-turma" role="status">
                  {mensagemResponsavel}
                </p>
              )}

              <div className="secao-cabecalho">
                <div>
                  <h3>Responsáveis cadastrados</h3>
                  <p>Consulte os responsáveis vinculados aos alunos.</p>
                </div>
              </div>

              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>NOME</th>
                      <th>TELEFONE</th>
                      <th>ALUNO VINCULADO</th>
                      <th>AUTORIZAÇÃO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {responsaveis.map((responsavel) => {
                      const aluno = alunos.find(
                        (item) => item.id === responsavel.alunoId
                      )

                      return (
                        <tr key={responsavel.id}>
                          <td className="nome-aluno">{responsavel.nome}</td>
                          <td>{responsavel.telefone}</td>
                          <td>{aluno?.nome ?? 'Aluno não encontrado'}</td>
                          <td>
                            <span className="status na-escola">
                              Não definida
                            </span>
                          </td>
                        </tr>
                      )
                    })}

                    {responsaveis.length === 0 && (
                      <tr>
                        <td colSpan={4} className="sem-resultados">
                          Nenhum responsável cadastrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <footer>
              SAIDA by DeskTech · Cadastro de responsáveis em teste
            </footer>
          </>
        )}

        {/* PESSOAS AUTORIZADAS */}
        {pagina === 'Pessoas autorizadas' && (
          <>
            <section className="secao-alunos">
              <div className="secao-cabecalho">
                <div>
                  <h3>Cadastro de pessoas autorizadas</h3>
                  <p>
                    Cadastre pessoas que poderão ser autorizadas a retirar os alunos.
                  </p>
                </div>

                <span className="status na-escola">
                  {pessoasAutorizadas.length}{' '}
                  {pessoasAutorizadas.length === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>

              {alunos.length === 0 && (
                <p className="mensagem-turma">
                  Cadastre um aluno antes de adicionar pessoas autorizadas.
                </p>
              )}

              <form
                onSubmit={cadastrarPessoaAutorizada}
                className="form-turma"
              >
                <label>
                  Nome completo *
                  <input
                    value={nomePessoaAutorizada}
                    onChange={(e) => setNomePessoaAutorizada(e.target.value)}
                    placeholder="Nome da pessoa"
                    maxLength={120}
                    required
                  />
                </label>

                <label>
                  Telefone *
                  <input
                    type="tel"
                    value={telefonePessoaAutorizada}
                    onChange={(e) => setTelefonePessoaAutorizada(e.target.value)}
                    placeholder="(67) 99999-9999"
                    maxLength={20}
                    required
                  />
                </label>

                <label>
                  Parentesco ou vínculo *
                  <input
                    value={parentescoPessoaAutorizada}
                    onChange={(e) => setParentescoPessoaAutorizada(e.target.value)}
                    placeholder="Ex.: Avó, tio, babá"
                    maxLength={60}
                    required
                  />
                </label>

                <label>
                  Aluno vinculado *
                  <select
                    value={alunoPessoaAutorizada}
                    onChange={(e) => setAlunoPessoaAutorizada(e.target.value)}
                    required
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} — {aluno.turma}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Tipo de autorização *
                  <select
                    value={tipoAutorizacao}
                    onChange={(e) => setTipoAutorizacao(e.target.value)}
                  >
                    <option value="Permanente">Permanente</option>
                    <option value="Temporária">Temporária</option>
                  </select>
                </label>

                <button
                  className="botao-principal"
                  type="submit"
                  disabled={alunos.length === 0}
                >
                  + Cadastrar pessoa
                </button>
              </form>

              {mensagemPessoaAutorizada && (
                <p className="mensagem-turma" role="status">
                  {mensagemPessoaAutorizada}
                </p>
              )}

              <div className="secao-cabecalho">
                <div>
                  <h3>Pessoas cadastradas</h3>
                  <p>
                    A autorização precisa ser validada pela escola antes da retirada.
                  </p>
                </div>
              </div>

              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>NOME</th>
                      <th>TELEFONE</th>
                      <th>VÍNCULO</th>
                      <th>ALUNO</th>
                      <th>TIPO</th>
                      <th>SITUAÇÃO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pessoasAutorizadas.map((pessoa) => {
                      const aluno = alunos.find(
                        (item) => item.id === pessoa.alunoId
                      )

                      return (
                        <tr key={pessoa.id}>
                          <td className="nome-aluno">{pessoa.nome}</td>
                          <td>{pessoa.telefone}</td>
                          <td>{pessoa.parentesco}</td>
                          <td>{aluno?.nome ?? 'Aluno não encontrado'}</td>
                          <td>{pessoa.tipoAutorizacao}</td>
                          <td>
                            <span className="status na-escola">
                              {pessoa.situacao}
                            </span>
                          </td>
                        </tr>
                      )
                    })}

                    {pessoasAutorizadas.length === 0 && (
                      <tr>
                        <td colSpan={6} className="sem-resultados">
                          Nenhuma pessoa cadastrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <footer>
              SAIDA by DeskTech · Pessoas autorizadas em teste
            </footer>
          </>
        )}

        {/* AUTORIZAÇÕES EXCEPCIONAIS */}
        {pagina === 'Autorizações excepcionais' && (
          <>
            <section className="secao-alunos">
              <div className="secao-cabecalho">
                <div>
                  <h3>Autorizações excepcionais</h3>
                  <p>
                    Registre autorizações para pessoas que não fazem parte
                    da lista habitual de retirada.
                  </p>
                </div>
              </div>

              <form
                className="form-turma"
                onSubmit={(e) => {
                  e.preventDefault()
                  cadastrarAutorizacao()
                }}
              >
                <h3>Nova autorização</h3>

                <label>
                  Aluno *
                  <select
                    value={alunoAutorizacao}
                    onChange={(e) => setAlunoAutorizacao(e.target.value)}
                    required
                  >
                    <option value="">Selecione o aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} — {aluno.turma}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Nome da pessoa autorizada *
                  <input
                    value={nomePessoaAutorizacao}
                    onChange={(e) => setNomePessoaAutorizacao(e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </label>

                <label>
                  Telefone *
                  <input
                    type="tel"
                    value={telefoneAutorizacao}
                    onChange={(e) => setTelefoneAutorizacao(e.target.value)}
                    placeholder="Telefone para contato"
                    required
                  />
                </label>

                <label>
                  Parentesco ou relação com o aluno
                  <input
                    value={parentescoAutorizacao}
                    onChange={(e) => setParentescoAutorizacao(e.target.value)}
                    placeholder="Ex.: Tio, avó, vizinho"
                  />
                </label>

                <label>
                  Modalidade *
                  <select
                    value={modalidadeAutorizacao}
                    onChange={(e) =>
                      setModalidadeAutorizacao(
                        e.target.value as 'Unica' | 'Temporaria'
                      )
                    }
                  >
                    <option value="Unica">
                      Autorização para uma única retirada
                    </option>
                    <option value="Temporaria">
                      Autorização temporária
                    </option>
                  </select>
                </label>

                {modalidadeAutorizacao === 'Temporaria' && (
                  <>
                    <label>
                      Início da validade *
                      <input
                        type="datetime-local"
                        value={inicioValidade}
                        onChange={(e) => setInicioValidade(e.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Fim da validade *
                      <input
                        type="datetime-local"
                        value={fimValidade}
                        onChange={(e) => setFimValidade(e.target.value)}
                        required
                      />
                    </label>
                  </>
                )}

                <label>
                  Responsável que confirmou a autorização *
                  <input
                    value={responsavelConfirmou}
                    onChange={(e) => setResponsavelConfirmou(e.target.value)}
                    placeholder="Nome do responsável"
                    required
                  />
                </label>

                <label>
                  Funcionário que registrou *
                  <input
                    value={funcionarioRegistro}
                    onChange={(e) => setFuncionarioRegistro(e.target.value)}
                    placeholder="Nome do funcionário"
                    required
                  />
                </label>

                <button
                  className="botao-principal"
                  type="submit"
                  disabled={alunos.length === 0}
                >
                  Cadastrar autorização
                </button>
              </form>

              {alunos.length === 0 && (
                <p className="mensagem-turma">
                  Cadastre um aluno antes de registrar uma autorização.
                </p>
              )}

              {mensagemAutorizacao && (
                <p className="mensagem-turma" role="status">
                  {mensagemAutorizacao}
                </p>
              )}

              <div className="secao-cabecalho">
                <div>
                  <h3>Autorizações registradas</h3>
                  <p>
                    Toda autorização permanece pendente até a validação da escola.
                  </p>
                </div>
              </div>

              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>ALUNO</th>
                      <th>PESSOA AUTORIZADA</th>
                      <th>TELEFONE</th>
                      <th>MODALIDADE</th>
                      <th>SITUAÇÃO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {autorizacoes.map((autorizacao) => {
                      const aluno = alunos.find(
                        (item) => item.id === autorizacao.alunoId
                      )

                      return (
                        <tr key={autorizacao.id}>
                          <td>{aluno?.nome ?? 'Aluno não encontrado'}</td>
                          <td className="nome-aluno">
                            {autorizacao.nomePessoa}
                          </td>
                          <td>{autorizacao.telefone}</td>
                          <td>
                            {autorizacao.modalidade === 'Unica'
                              ? 'Uma retirada'
                              : 'Temporária'}
                          </td>
                          <td>
                            <span className="status na-escola">
                              {autorizacao.situacao}
                            </span>
                          </td>
                        </tr>
                      )
                    })}

                    {autorizacoes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="sem-resultados">
                          Nenhuma autorização registrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <footer>
              SAIDA by DeskTech · Autorizações excepcionais em teste
            </footer>
          </>
        )}

        {/* PÁGINAS AINDA NÃO DESENVOLVIDAS */}
        {!paginasImplementadas.includes(pagina) && (
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

      {/* MODAL DE LEITURA DO QR CODE */}
      {mostrarLeitor && (
        <div
          className="modal-fundo"
          onClick={() => setMostrarLeitor(false)}
        >
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

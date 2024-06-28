import "./HelpPage.css";

export default function HelpPage() {
  return (
    <div className="help-page-container">
      <div className="page-title">
        <h1>
          <span>Ajuda</span>
        </h1>
        <p>
          Tire suas dúvidas sobre o funcionamento do sistema e encontre informações úteis.
        </p>
      </div>
      <div className="help-container">
        <div className="help-section">
          <h2>• Como criar um evento?</h2>
          <p>
          <span>&gt;</span> Para criar um evento, clique no botão "+" na página principal (<em>Home</em>). Preencha os campos obrigatórios e clique em "Criar Olimpíada". Se atente às regras de preenchimento. OBS: Apenas professores podem criar eventos.
          </p>
          <h2>• Como visualizar um evento?</h2>
          <p>
          <span>&gt;</span>  Informações básicas sobre um evento podem ser visualizadas na página principal, <em>Home</em>, nos respectivos cards de cada evento. Para visualizar informações detalhadas, como esportes, clique no card do evento desejado.
          </p>
          <h2>• Como me inscrever em um evento?</h2>
          <p>
          <span>&gt;</span> Para se inscrever em um evento, dentro da página de visualização, basta escolher um esporte para participar e clicar em "Registrar/Gostar". Você será automaticamente inscrito no evento, caso não esteja ainda, e participará do respectivo esporte!
          </p>
          <h2>• Como alterar minhas configurações?</h2>
          <p>
          <span>&gt;</span>  Para alterar suas configurações, clique no botão "<em>Minha Conta</em>" na aba lateral. Escolha o campo desejado e clique no ícone de edição. Após editar, aperte no ícone "Confirmar".
          </p>
          <h2>• Como excluir minha conta?</h2>
          <p>
          <span>&gt;</span> Para excluir sua conta, clique no botão "<em>Minha Conta</em>" na página principal. Clique em "Apagar Conta" e confirme a exclusão. Suas informações serão permanentemente deletadas.
          </p>
        </div>
      </div>
    </div>
  );
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-black text-primary mb-6">
            Termos de Uso e Política de Privacidade
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Última atualização: 21 de novembro de 2025
          </p>

          <div className="prose prose-lg max-w-none text-justify">
            <p>
              Bem-vindo à Cresci e Perdi. Ao utilizar nossos serviços, você
              concorda com os seguintes termos e condições. Por favor, leia com
              atenção.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8">
              1. AUTORIZAÇÃO PARA USO DE DADOS PESSOAIS (LGPD)
            </h2>
            <p>
              Os meus dados poderão ser utilizados para cadastro, comunicação,
              prestação de serviços, marketing e demais atividades relacionadas
              à operação da franquia.
              <br />
              <br />
              <strong>Natureza dos Dados Coletados</strong>
              <br />
              Os dados coletados poderão incluir, mas não se limitam a: nome,
              endereço, contato (telefone e e-mail), dados de identificação e
              demais informações fornecidas voluntariamente.
              <br />
              <br />
              <strong>Direitos do Titular</strong>
              <br />
              Estou ciente de que poderei, a qualquer tempo, exercer meus
              direitos de acesso, correção, exclusão e portabilidade dos meus
              dados, conforme previsto na LGPD.
              <br />
              <br />
              <strong>Compartilhamento de Dados</strong>
              <br />
              Os meus dados poderão ser compartilhados com terceiros somente
              para os fins previstos, sempre garantindo a segurança e a
              confidencialidade exigidas pela legislação.
              <br />
              <br />
              <strong>Prazo de Armazenamento</strong>
              <br />
              Os dados serão armazenados pelo período necessário para cumprir as
              finalidades mencionadas ou enquanto houver interesse legítimo na
              sua manutenção, respeitando os prazos legais.
              <br />
              <br />
              <strong>Revogação</strong>
              <br />
              Esta autorização poderá ser revogada a qualquer tempo, mediante
              solicitação formal, sem prejuízo da legalidade do tratamento
              realizado anteriormente à revogação.
              <br />
              <br />
              <strong>Consentimento</strong>
              <br />
              Ao aceitar este termo, você consente com o tratamento dos seus
              dados pessoais nas condições aqui estabelecidas, em conformidade
              com a Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei nº
              13.709/2018.
            </p>
            <h2 className="text-2xl font-bold text-secondary mt-8">
              2. Consentimento para Contato
            </h2>
            <p>
              Ao marcar a caixa de seleção de consentimento de contato em nosso
              formulário, você autoriza expressamente a equipe da Cresci e
              Perdi a entrar em contato através dos dados fornecidos (telefone,
              WhatsApp ou e-mail) para dar andamento à sua solicitação de
              interesse na franquia. Este contato tem como único objetivo
              fornecer informações, esclarecer dúvidas e orientar sobre o
              processo de se tornar um franqueado.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo presente neste site, incluindo, mas não se
              limitando a, textos, gráficos, logos, ícones, imagens e a
              compilação de todo o conteúdo, é de propriedade exclusiva da
              Cresci e Perdi e protegido pelas leis de direitos autorais. O uso
              não autorizado de qualquer material deste site pode violar a
              legislação de direitos autorais e outras leis.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8">
              4. Limitação de Responsabilidade
            </h2>
            <p>
              O site é fornecido "no estado em que se encontra". A Cresci e
              Perdi não se responsabiliza por quaisquer danos diretos ou
              indiretos decorrentes do uso ou da incapacidade de usar este site.
              Isso inclui, mas não se limita a, erros, omissões, interrupções ou
              atrasos na operação.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8">
              5. Alterações nos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento, sem aviso prévio. A data da última atualização estará
              sempre visível no topo deste documento, e o uso contínuo do site
              após tais alterações constituirá seu consentimento com as novas
              condições.
            </p>

            <h2 className="text-2xl font-bold text-secondary mt-8">
              6. Contato
            </h2>
            <p>
              Se tiver alguma dúvida sobre estes termos, entre em contato
              conosco através do e-mail:{" "}
              <a
                href="mailto:contato@crescieperdi.com.br"
                className="text-primary hover:underline"
              >
                equipecominicacao@crescieperdi.com.br
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

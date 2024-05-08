Inicialmente foram identificadas como principais fontes de informação a análise dos principais stakeholders e o conhecimento do domínio por parte do grupo de desenvolvedores, visto que a equipe já participou de eventos esportivos no formato proposto pelo sistema. Foi considerada, também, a proposta do projeto de que “o objetivo principal é auxiliar professores e orientadores a organizar um ‘interclasses olímpico’ dentro de seus colégios, bem como fornecer uma plataforma intuitiva para os alunos e funcionários acompanharem os resultados das competições.”.

Como principais stakeholders envolvidos no processo, houve um destaque para os stakeholders de professores coordenadores de Educação Física, que são os principais usuários envolvidos na criação de eventos olímpicos, e alunos de colégios, que são os participantes dos eventos. Apesar dos stakeholders da diretoria da escola desempenharem um importante papel na decisão final de aceitação do software, foi considerado que os usuários finais iriam influenciar mais nas características do produto.

Para a elicitação de requisitos, foram escolhidas as técnicas de benchmarking e de brainstorming. Para se ter uma noção melhor de como encontrar soluções, foi feita uma análise dos principais softwares envolvidos no contexto de organização/planejamento e de eventos esportivos por meio de uma reunião com o grupo.

Primeiramente, uma análise do Google Agenda (Google Calendar) foi feita para identificar como a organização pode ser feita. Percebeu-se que essa plataforma permite ao usuário visualizar todos os seus eventos no calendário, considerando tanto uma lista de atividades quanto uma visualização em um determinado período de tempo. Além disso, é possível criar novas atividades, adicionando informações como título, data/hora, local, convidados, descrições.

Informações em um evento novo:

![Calendar](/assets/images/google_calendar.png)

Depois, para compreender melhor soluções que existem no contexto esportivo, foi feita uma análise do Flashscore, que é uma plataforma de visualização de resultados de esportes.. Percebeu-se que essa plataforma permite uma visualização de todos os esportes diretamente para o usuário. Além disso, é possível clicar sobre um determinado resultado para ver mais informações, como estatísticas da partida e odds anteriores ao jogo.

Esportes disponíveis:

![Esportes](/assets/images/esportes.png)

Odds:

![Odds](/assets/images/odds.png)

Estatísticas:

![Estatisticas](/assets/images/estatisticas.png)

Com isso, o grupo conseguiu ter uma visão ainda maior sobre como o software pode ser pensado. A fim de levantar todas as possíveis ideias e considerando também o conhecimento de cada integrante sobre o contexto em que o software se insere, a técnica de brainstorming foi utilizada para pensar em ideias para o sistema. 

Em um tempo especificado de 30 minutos, cada membro da equipe pensaria e escreveria todas as funcionalidades que conseguisse pensar sobre o sistema. O objetivo era gerar o máximo de ideias possíveis individualmente para depois discuti-las e combiná-las conjuntamente. Com isso definido, a técnica foi executada e as ideias foram levantadas por cada um. As ideias pensadas foram:

1. Design acessível e de fácil entendimento.
2. Sistema rápido que não fica demorando para carregar.
3. Mostrar um exemplo de evento para o usuário ter uma ideia de como organizar o seu próprio.
4. Cadastros de escolas, professores e alunos.
5. Permitir a criação de olimpíadas.
6. Agendamento de eventos e treinos.
7. Criação de novos esportes (com criação das descrições e regras).
8. Criação de enquetes para consultar adesão aos eventos.
9. Criação de enquetes para palpites.
10. Gerenciamento de recursos (quadras, salas, objetos, juízes).
11. Personalização de perfil (medidas, interesses, fotos, etc).
12. Criação de questionários para avaliação física dos alunos.
13. Sistema de feedback para cada evento.
14. Notificações e confirmações de eventos.
15. Possibilidade de enviar convites para alunos, que podem aceitar ou não participar de alguma olimpíada ou esporte específico.
16. Chat ao vivo entre alunos.
17. Fórum da comunidade para discutir jogos e estratégias.
18. Sistema de pontuação automática para rankear os times.
19. Sistema de matching automático para os próximos jogos.
20. Sugestões de horários baseadas nas agendas da escola, dos professores e dos competidores + calendário integrado dos eventos.
21. Reagendamentos automáticos.
22. Atualizações instantâneas dos resultados.
23. Estatísticas e análises de desempenho de times e alunos.
24. Acompanhamento de participação dos alunos.
25. Recursos de aprendizagem para cada esporte (descrição, regras).
26. Suporte para vários idiomas.
27. Histórico de partidas.

Depois disso, houve uma discussão para entender melhor as ideias. O entendimento e a consolidação das ideias permitiu identificar as seguintes ideias principais:

1. Design acessível e de fácil entendimento
2. Mostrar um exemplo de evento para o usuário ter uma ideia de como organizar o seu próprio
3. Permitir a criação de olimpíadas
4. Permitir o cadastro de professores e alunos
5. Permitir o gerenciamento de materiais e espaço disponível da escola
6. Permitir a criação de esportes novos com definição de regras específicas
7. Notificações para os alunos participantes sobre os eventos que estão participando
8. Possibilidade de enviar convites para alunos, que podem aceitar ou não participar de alguma olimpíada ou esporte específico
9. Disponibilização de resultados sobre as partidas depois de elas acontecerem
10. Personalização de perfis, com funcionalidades distintas para professores e alunos
11. Possibilidade de criar uma nova organização e vincular usuários a ela
12. Possibilidade de criar eventos esportivos abertos a todos os usuários da plataforma

Essas ideias foram validadas pelos membros e considerou-se que ideias suficientes haviam sido levantadas.

Depois, para entender com ainda mais clareza como o usuário interage com o software, uma persona foi definida conjuntamente pela equipe. Eduardo foi definido por ser um dos stakeholders identificados no processo (professor coordenador de Educação Física) e por representar um tipo de usuário com grande interação com o software. Eduardo é um professor que tem o desejo de inovar e realizar atividades esportivas novas com os alunos mas, por não ter muito tempo para planejar essas atividades, não consegue fazer isso.


Mapa da Persona:

![Mapa da Persona](/assets/images/mapa_da_persona.png)


Finalmente, para pensar especificamente em como essa persona interage com o sistema, uma jornada do usuário foi pensada baseada nas ideias levantadas pelo brainstorming. Com os pontos levantados, foi possível definir como a interação do usuário com o sistema acontece, levando em consideração sempre as soluções possíveis para o problema da persona: a falta de tempo e de conhecimento em como organizar um evento esportivo.

Jornada do Usuário:

![Mapa da Jornada de Usuario](/assets/images/mapa_da_jornada_de_usuario.png)



Analisando essa jornada, vimos que Eduardo claramente precisa de uma conta para utilizar o sistema. Com essa informação, levamos em conta os pensamentos, pontos críticos e oportunidades de melhoria, e extraímos o primeiro épico necessário, o do Gerenciamento de Usuários. Após o cadastro e vinculação de escolas no sistema, nossa persona também cadastra dados relevantes relacionados aos materiais da escola. Novamente, analisando todas informações relevantes dessa ação, levantamos o segundo épico, o do Gerenciamento de Materiais/Recursos. Finalmente, a funcionalidade mais marcante e importante do sistema, também mencionada anteriormente no planejamento, que é a criação do evento de olimpíadas, foi identificada na jornada e levantada para nosso terceiro épico, o da Criação de uma Olimpíada.

O detalhamento dos épicos e das histórias referentes a eles, juntamente com os cards, está disponível nas issues do GitHub.

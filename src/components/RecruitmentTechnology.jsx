import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaCheck, FaChartLine, FaUsers } from 'react-icons/fa'

const stages = [
  { name: 'Inscrito', color: '#83958b', candidates: [{ initials: 'AC', name: 'Ana Costa', role: 'Assistente de logística', detail: 'Currículo recebido' }] },
  { name: 'Triagem', color: '#c9a24b', candidates: [{ initials: 'BL', name: 'Bruno Lima', role: 'Assistente de logística', detail: 'Perfil em análise' }] },
  { name: 'Entrevista agendada', color: '#528879', candidates: [{ initials: 'CS', name: 'Clara Santos', role: 'Assistente de logística', detail: 'Quinta · 10h00' }] },
  { name: 'Contratado', color: '#295a41', candidates: [{ initials: 'DM', name: 'Diego Martins', role: 'Assistente de logística', detail: 'Processo concluído' }] },
]

export default function RecruitmentTechnology() {
  return (
    <section id="gestao-recrutamento" aria-labelledby="gestao-recrutamento-titulo" className="relative overflow-hidden bg-[#142C23] px-5 py-20 text-[#F5F1E8] sm:px-8 lg:py-28">
      <div aria-hidden="true" className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#C9A24B]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#E8CC8A]">
          <span className="h-px w-10 bg-[#C9A24B]" />
          Pessoas, processos e tecnologia
        </div>

        <div className="grid items-center gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-14">
          <div>
            <h2 id="gestao-recrutamento-titulo" className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              O talento certo.<br />
              <span className="text-[#E8CC8A]">Um processo bem cuidado.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#D0DBD4] sm:text-lg">
              A GDJ conecta as necessidades da sua empresa a profissionais alinhados ao perfil da vaga.
              Nossa equipe conduz a seleção com o apoio de um CRM próprio para organizar candidatos,
              entrevistas e cada etapa da contratação.
            </p>
            <div className="mt-8 space-y-5">
              {[
                ['01', 'Entendemos a sua necessidade', 'Alinhamos o perfil da vaga e os requisitos com a sua empresa.'],
                ['02', 'Organizamos a seleção', 'Reunimos candidaturas, analisamos perfis e acompanhamos as entrevistas.'],
                ['03', 'Acompanhamos cada etapa', 'Mantemos o histórico e o andamento do processo organizados até a contratação.'],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <span className="pt-1 text-xs font-semibold tracking-wider text-[#C9A24B]">{number}</span>
                  <div>
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-[#B9C9BF]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/5511966810215?text=Ol%C3%A1!%20Quero%20conhecer%20o%20processo%20de%20recrutamento%20da%20GDJ."
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#C9A24B] px-6 py-4 text-sm font-bold text-[#142C23] transition-colors hover:bg-[#E8CC8A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8CC8A]">
              Vamos conversar sobre sua equipe <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          <figure className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-[#C9A24B]/30 bg-[#F4F6F3] text-[#142C23] shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E9E3] bg-white px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#142C23] text-lg font-semibold text-[#E8CC8A]">G</span>
                  <div>
                    <p className="text-sm font-bold tracking-wide">GDJ VERTEX</p>
                    <p className="text-[11px] text-[#718176]">CRM Executivo · Gestão de recrutamento</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#F4ECCF] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#736026]">Demonstração</span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[#E3E9E3] bg-white px-4 py-3 text-[11px] text-[#718176] sm:px-6">
                <span className="inline-flex items-center gap-1.5"><FaBriefcase aria-hidden="true" /> Vagas</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-[#142C23]"><FaUsers aria-hidden="true" /> Candidatos</span>
                <span className="inline-flex items-center gap-1.5"><FaCalendarAlt aria-hidden="true" /> Calendário</span>
                <span className="inline-flex items-center gap-1.5"><FaChartLine aria-hidden="true" /> Dashboard</span>
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718176]">Processo seletivo</p>
                    <p className="mt-1 text-lg font-bold">Candidatos por etapa</p>
                  </div>
                  <span className="rounded-lg border border-[#DCE5DD] bg-white px-3 py-2 text-[10px] text-[#637469]">Vaga · Assistente de logística</span>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
                  {stages.map((stage) => (
                    <div key={stage.name} className="min-w-0 rounded-xl border border-[#E0E7E0] bg-[#EAF0EA] p-2.5">
                      <div className="mb-3 flex min-h-8 items-center gap-1.5">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: stage.color }} />
                        <p className="text-[10px] font-bold leading-tight">{stage.name}</p>
                      </div>
                      {stage.candidates.map((candidate) => (
                        <div key={candidate.initials} className="rounded-lg border border-[#E3E9E3] bg-white p-3 shadow-sm">
                          <span aria-hidden="true" className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF3F0] text-[10px] font-bold text-[#42624D]">{candidate.initials}</span>
                          <p className="text-xs font-semibold">{candidate.name}</p>
                          <p className="mt-1 text-[10px] leading-relaxed text-[#718176]">{candidate.role}</p>
                          <div className="mt-3 border-t border-[#EDF1EB] pt-2 text-[9px] leading-relaxed text-[#637469]">{candidate.detail}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DFE6DB] bg-white p-3">
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4ECCF] text-[#8E742E]"><FaCalendarAlt /></span>
                  <div>
                    <p className="text-[11px] font-semibold">Entrevista organizada, próximo passo definido.</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#718176]">Data, entrevistador e observações reunidos no cadastro do candidato.</p>
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-4 text-xs leading-relaxed text-[#A8BCAD]">
              Ilustração baseada nas funções do CRM da GDJ. Nomes e informações demonstrativos.
              As etapas intermediárias foram resumidas.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 grid gap-7 border-t border-white/15 pt-8 md:grid-cols-3">
          {[
            ['Recrutamento & seleção', 'Perfil da vaga, triagem e entrevistas com acompanhamento da nossa equipe.'],
            ['Banco de talentos', 'Currículos e informações organizados para apoiar a busca por profissionais.'],
            ['Departamento pessoal', 'Suporte às rotinas de DP para sua empresa trabalhar com mais organização.'],
          ].map(([title, description]) => (
            <div key={title}>
              <div className="flex items-center gap-2 text-sm font-semibold"><FaCheck aria-hidden="true" className="text-[#C9A24B]" /><h3>{title}</h3></div>
              <p className="mt-2 text-sm leading-relaxed text-[#B9C9BF]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

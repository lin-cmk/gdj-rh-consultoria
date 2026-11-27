export const partnerFields = [
  {
    "title": "Dados Empresariais",
    "fields": [
      {
        "key": "campo_1",
        "label": "Razão social",
        "type": "text",
        "required": true
      },
      {
        "key": "campo_2",
        "label": "Nome fantasia",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_3",
        "label": "CNPJ",
        "type": "text",
        "required": true
      },
      {
        "key": "campo_4",
        "label": "Endereço completo / CEP",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_5",
        "label": "Cidade / UF",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_6",
        "label": "Site",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_7",
        "label": "E-mail corporativo",
        "type": "email",
        "required": true
      },
      {
        "key": "campo_8",
        "label": "Telefone / WhatsApp",
        "type": "tel",
        "required": false
      }
    ]
  },
  {
    "title": "Representante Legal",
    "fields": [
      {
        "key": "campo_9",
        "label": "Nome completo",
        "type": "text",
        "required": true
      },
      {
        "key": "campo_10",
        "label": "Cargo",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_11",
        "label": "E-mail",
        "type": "email",
        "required": false
      },
      {
        "key": "campo_12",
        "label": "Telefone",
        "type": "tel",
        "required": false
      }
    ]
  },
  {
    "title": "Condições Comerciais",
    "fields": [
      {
        "key": "campo_13",
        "label": "Taxa cobrada do cliente",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_14",
        "label": "Base de cálculo",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_15",
        "label": "Alíquota efetiva de tributos",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_16",
        "label": "Repasse à GDJ",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_17",
        "label": "Seguro / outras deduções",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_18",
        "label": "Prazo e condição de pagamento",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_19",
        "label": "Garantia",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_20",
        "label": "Regras de reposição",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_21",
        "label": "Emissão de nota fiscal",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "title": "Demanda Inicial",
    "fields": [
      {
        "key": "campo_22",
        "label": "Cargo",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_23",
        "label": "Quantidade de vagas",
        "type": "number",
        "required": false
      },
      {
        "key": "campo_24",
        "label": "Local de trabalho",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_25",
        "label": "Salário e benefícios",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_26",
        "label": "Jornada / escala",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_27",
        "label": "Requisitos",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_28",
        "label": "Etapas e prazo de seleção",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_29",
        "label": "Responsável operacional",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "title": "Validação",
    "fields": [
      {
        "key": "campo_30",
        "label": "Observações",
        "type": "text",
        "required": false
      },
      {
        "key": "campo_31",
        "label": "Responsável pelo preenchimento",
        "type": "text",
        "required": true
      },
      {
        "key": "campo_32",
        "label": "Data",
        "type": "date",
        "required": true
      }
    ]
  }
]

const [company, representative, commercial, demand, confirmation] = partnerFields

company.fields.find(field => field.key === 'campo_8').required = true
representative.fields.filter(field => ['campo_10', 'campo_11'].includes(field.key)).forEach(field => {
  field.required = true
})
representative.title = 'Representante legal e signatário'
commercial.fields = commercial.fields.filter(field => !['campo_15', 'campo_17'].includes(field.key))
confirmation.title = 'Confirmação e proposta'
const demandFields = demand.fields
demandFields.find(field => field.key === 'campo_22').required = true
demandFields.find(field => field.key === 'campo_23').required = true
demandFields.find(field => field.key === 'campo_27').label = 'Requisitos técnicos e comportamentais obrigatórios'
demandFields.push(
  { key: 'requisitos_desejaveis', label: 'Requisitos desejáveis', type: 'text' },
  { key: 'modelo_trabalho', label: 'Modelo de trabalho', options: ['Presencial', 'Híbrido', 'Remoto'] },
)
export { demandFields }
export const maxJobProfiles = 20
export const proposalConsent = 'Confirmo o envio dos dados para análise e preparação da proposta de parceria. O acordo será formalizado com a assinatura do documento.'
